import { config } from "dotenv";
config()

import connectDB from "./connectDB";
import setupServer from "./setupServer";

const main = async () => {
  await connectDB()
  setupServer()
}

main()
