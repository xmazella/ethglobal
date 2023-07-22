import { Request, Response } from 'express';
import { ethers } from 'ethers';
import { LensClient, development } from "@lens-protocol/client";
import axios from 'axios'; 
import { v4 as uuidv4 } from 'uuid';


require('dotenv').config();

const lensClient = new LensClient({
    environment: development
});

export async function postOnLens(req: Request, res: Response) {
  if (req.method === "POST") {

    // Make sure content is provided
    if (!req.body || !req.body.content) {
        return res.status(400).json({ error: "No content provided in request body." });
    }

    const provider = new ethers.providers.JsonRpcProvider(process.env.MUMBAI_RPC_URL || '');
    const privateKey = process.env.PRIVATE_KEY;
    const wallet = new ethers.Wallet(privateKey || '', provider);

    //lens auth (no use of jwt, it's an hackathon)
    const address = wallet.address;

    const challenge = await lensClient.authentication.generateChallenge(address);
    const signature = await wallet.signMessage(challenge);
  
    await lensClient.authentication.authenticate(address, signature);

    //lens post
    const profileId = "0x76c7";


    // cURL request converted to HTTP POST request using axios

    const body = {
        "name": req.body.content.slice(0, 20),
        "content": req.body.content,
        "metadata_id": `${uuidv4()}`,
        "version": "1.0.0",
        "appId": "asap"
    }

    try {
        const response = await axios.post('https://api.jsonbin.io/v3/b', {
            ...body
        }, {
            headers: {
                'Content-Type': 'application/json',
            'X-Master-key': process.env.JSONBIN_PRIVATE_KEY!, // Replace <YOUR_API_KEY> with your actual API key
            'X-Bin-Private': 'false',
        },
        });

        //todo post on arweave/ipfs
        const contentURI =  `https://api.jsonbin.io/v3/b/${response.data.metadata.id}?meta=false`;

        const collectModule = {
            simpleCollectModule: {
            followerOnly: false,
            }
        };

        const createPostTypedDataResult = await lensClient.publication.createPostTypedData({
            profileId,
            contentURI,
            collectModule,
        }
        );

        const createPostTypedDataValue = createPostTypedDataResult.unwrap();

        const signedTypedData = await wallet._signTypedData(
            createPostTypedDataValue.typedData.domain,
            createPostTypedDataValue.typedData.types,
            createPostTypedDataValue.typedData.value,
        );

        console.log(`Broadcasting signed createDataAvailabilityPostTypedData...`);

        const broadcastResult = await lensClient.transaction.broadcast({
        id: createPostTypedDataValue.id,
        signature: signedTypedData,
        });

        const broadcastValue = broadcastResult.unwrap();

        console.log(`post was created: `, broadcastValue);

        res.status(200).json({ data: "done" })

        console.log('Response from API:', response.data);
    } catch (error) {
        console.error('Error making the request:', error);
        res.status(500).json({ error: "An error occurred while making the request." });
    }


  }
}
