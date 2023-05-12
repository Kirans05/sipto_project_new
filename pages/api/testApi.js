import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeClient } from "@pinecone-database/pinecone";
import axios from "axios";

export default async function handler(req, res) {
  try {
    let response = await getServerSideProps({ query: { inputData:"k" } });
    res.status(200).json({ name: "success", response });
  } catch (err) {
    res.status(201).json({ name: "error", err });
  }
}

export async function getServerSideProps(context) {
    let options = {
        url:"http://localhost:4000/open",
        method:"GET",
        headers:{
            'content-type':'application/json'
        }
    }
  try {
    let response = await axios(options)
    return {
      props: {
        result: response.data,
        name: "success1",
      },
    };
  } catch (err) {
    return {
      props: {
        err,
        name: "error1",
      },
    };
  }
}
