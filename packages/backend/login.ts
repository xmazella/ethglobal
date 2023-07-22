import { Request, Response } from "express";
import {
  SismoConnect,
  AuthType,
  SismoConnectVerifiedResult,
  ClaimType,
  SismoConnectConfig,
  SignatureRequest,
  AuthRequest,
  ClaimRequest,
  SismoConnectResponse
} from "@sismo-core/sismo-connect-server";

const config: SismoConnectConfig = {
  appId: "0xafabec94b12842146d5f06acaac25ccd",
};

export async function login(req: Request, res: Response) {

  // reusing the exact same config as the front end's
  const sismoConnect = SismoConnect({ config });

  const sismoConnectResponse = req.body as SismoConnectResponse | null
  
  if (sismoConnectResponse === null) {
    res.status(400).json("Bad sismo response")
  } else {

    const result: SismoConnectVerifiedResult = await sismoConnect.verify(
      sismoConnectResponse, // copied from the previous step or received from API call
      {
        auths: [
          { authType: AuthType.VAULT }, 
        ],
        claims: [
          { groupId: "0x75e135ba6f62b00a7ae194920ff8a665" }, // basique
          { groupId: "0x078b5d9514580634859c634c9f9dff4f", isOptional: true }, // xmtp
          { groupId: "0xf4777295c7afbdf16e6bd43c93ddcdb5", isOptional: true }, // post on lens
        ],
        signature: { message: "Connect using sismo", isSelectableByUser: true} ,
      }
    );

    let permissions = {
      xmtp: result.claims.some(claim => claim.groupId === "0x078b5d9514580634859c634c9f9dff4f") ? true : false,
      postOnlens: result.claims.some(claim => claim.groupId === "0xf4777295c7afbdf16e6bd43c93ddcdb5") ? true : false,
    }

    if (result.claims.some(claim => claim.groupId === "0x75e135ba6f62b00a7ae194920ff8a665") === false) {
      res.status(403).json({"error": "You don't have enough permissions"});
    }
    res.status(200).json({ permissions: permissions });
  }
}
