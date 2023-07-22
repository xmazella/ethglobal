import { Request, Response } from "express";
import { ethers } from "ethers";
import { LensClient, development } from "@lens-protocol/client";

require("dotenv").config();

const lensClient = new LensClient({
  environment: development,
});

async function authenticate() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.MUMBAI_RPC_URL || ""
  );
  const privateKey = process.env.PRIVATE_KEY;
  const wallet = new ethers.Wallet(privateKey || "", provider);
  const address = wallet.address;

  const challenge = await lensClient.authentication.generateChallenge(address);
  const signature = await wallet.signMessage(challenge);
  await lensClient.authentication.authenticate(address, signature);
}
const authenticating = authenticate();

export async function getFeed(req: Request, res: Response) {
  await authenticating;
  const data = await lensClient.feed.fetch({
    profileId: "0x76c7",
  });

  res.status(200).json({ data: data });
}
