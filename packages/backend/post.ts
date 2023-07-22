import { Request, Response } from 'express';
import { ethers } from 'ethers';
import { LensClient, development } from "@lens-protocol/client";

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

    //todo post on arweave/ipfs
    const contentURI =  "https://zruc54x6ffktxp4gmfvqrfuxtrbws2lvulg7zycohwbhpootj4xa.arweave.net/zGgu8v4pVTu_hmFrCJaXnENpaXWizfzgTj2Cd7nTTy4";    ;

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
  }
}
