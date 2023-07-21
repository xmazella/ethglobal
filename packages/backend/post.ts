import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { ethers } from 'ethers';
import { LensClient, development } from "@lens-protocol/client";


require('dotenv').config();

const lensClient = new LensClient({
    environment: development
  });

async function postOnLens(req: Request, res: Response) {
  if (req.method === "POST") {


    const newName = `post-content-${uuidv4()}.json`;

    const provider = new ethers.providers.JsonRpcProvider(process.env.MUMBAI_RPC_URL || '');

    const privateKey = process.env.PRIVATE_KEY;
    const wallet = new ethers.Wallet(privateKey || '', provider);

    //lens auth (no use of jwt, it's an hackathon)
    const address = wallet.address;

    const challenge = await lensClient.authentication.generateChallenge(address);
    const signature = await wallet.signMessage(challenge);
  
    await lensClient.authentication.authenticate(address, signature);
    
    const accessTokenResult = await lensClient.authentication.getAccessToken();
    const accessToken = accessTokenResult.unwrap();

    //lens post

    const profileId = "";
    const contentURI = "";

    const createPostTypedDataResult = await lensClient.publication.createPostTypedData({
        profileId,
        contentURI,
        collectModule:{},
      }
    );

    res.status(200).json({ data: "done" })
  }
}