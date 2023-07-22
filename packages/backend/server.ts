// app.ts (or server.ts)

import express, { Express, Request, Response } from "express"
import {
  SismoConnect,
  AuthType,
  SismoConnectVerifiedResult,
  ClaimType,
  SismoConnectConfig,
  SignatureRequest,
  AuthRequest,
  ClaimRequest,
  SismoConnectResponse,
} from "@sismo-core/sismo-connect-server"
import { getFeed } from "./feed"
import cors from "cors"
import { postOnLens } from "./post"
import invariant from "tiny-invariant"
import morgan from "morgan"
import { Server } from "socket.io"
import http from "http"

const app: Express = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})

app.use(cors())
app.use(morgan("dev"))

const config: SismoConnectConfig = {
  // you will need to register an appId in the Factory
  appId: "0x8f347ca31790557391cec39b06f02dc2",
}

// create a new Sismo Connect instance with the server configuration
const sismoConnect = SismoConnect({ config })

async function verifySismoProof(sismoConnectResponse: SismoConnectResponse) {
  const result: SismoConnectVerifiedResult = await sismoConnect.verify(
    sismoConnectResponse // copied from the previous step or received from API call
    // {
    //   auths,
    //   claims,
    //   signature,
    // }
  )
}

// Parse JSON bodies (middleware to handle incoming JSON data)
app.use(express.json())

// POST route for /connect
app.post("/connect", (req: Request, res: Response) => {
  handlePostRequest(req, res)
})

app.post("/post", (req: Request, res: Response) => {
  handlePostRequest(req, res)
})

app.post("/collect", (req: Request, res: Response) => {
  handlePostRequest(req, res)
})

app.post("/mirror", (req: Request, res: Response) => {
  handlePostRequest(req, res)
})

app.post("/comment", (req: Request, res: Response) => {
  handlePostRequest(req, res)
})

app.post("/quote", (req: Request, res: Response) => {
  handlePostRequest(req, res)
})

app.get("/feed", getFeed)
app.post("/postOnLens", postOnLens)

function handlePostRequest(req: Request, res: Response) {
  // Check if the JSON object has the 'sismo_proof' property
  if (req.body && req.body.sismo_proof) {
    // Respond with a 200 status code if 'sismo_proof' property is present
    res.sendStatus(200)
  } else {
    // Respond with a 400 status code if 'sismo_proof' property is missing
    res
      .status(400)
      .send(
        "Bad Request: 'sismo_proof' property is missing from the JSON object."
      )
  }
}

io.on("connection", socket => {
  console.log("a user connected")
})

setInterval(() => io.emit("message-received"), 1000)

// Check if .env is set
const error = (varName: string) =>
  `No ${varName} found in env. Make sure you have a '.env' file set with PRIVATE KEY inside.`
for (const envVar of ["PRIVATE_KEY", "MUMBAI_RPC_URL", "ETHERSCAN_API_KEY"]) {
  invariant(process.env[envVar], error(envVar))
}

// Start the server
const port: number = 3000 // You can change this to any port number you want
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
