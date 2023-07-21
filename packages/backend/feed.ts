import { Request, Response } from 'express';
import { ethers } from 'ethers';
import { LensClient, development } from "@lens-protocol/client";

require('dotenv').config();

const lensClient = new LensClient({
    environment: development
  });

export async function getFeed(req: Request, res: Response) {
    if (req.method === "GET") {
      const provider = new ethers.providers.JsonRpcProvider(process.env.MUMBAI_RPC_URL || '');
  
      const privateKey = process.env.PRIVATE_KEY;
      const wallet = new ethers.Wallet(privateKey || '', provider);
  
      //lens auth (no use of jwt, it's an hackathon)
      const address = wallet.address;
  
      const challenge = await lensClient.authentication.generateChallenge(address);
      const signature = await wallet.signMessage(challenge);
      
      await lensClient.authentication.authenticate(address, signature);
  
      //feed
      const feed = await lensClient.feed.fetch({
          profileId: '0x8b39'
      });
      
      res.status(200).json({ data: feed })
    }
  }