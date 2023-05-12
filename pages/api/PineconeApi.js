// import { OpenAIEmbeddings } from "langchain/embeddings/openai";
// import { PineconeClient } from "@pinecone-database/pinecone";

// export default async function handler(req, res) {
//   let inputData = req.body.inputData;
//   try {
//     let response = await getServerSideProps({ query: { inputData } });
//     res.status(200).json({ name: "success", response });
//   } catch (err) {
//     res.status(201).json({ name: "error" });
//   }
// }

// export async function getServerSideProps(context) {
//   let inputData = context.query.inputData;
//   try {
//     let embed = new OpenAIEmbeddings({
//       openAIApiKey: "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",
//     });
//     let embedding = await embed.embedQuery(inputData);

//     const pinecone = new PineconeClient();
//     await pinecone.init({
//       apiKey: "29501f44-8a91-42dd-b702-96560cdc1d23",
//       environment: "us-west1-gcp-free",
//     });
//     const index = pinecone.Index("first-index");

//     const queryRequest = {
//       vector: embedding,
//       topK: 2,
//       includeValues: false,
//       includeMetadata: true,
//       namespace: "sipto document",
//     };
//     let response = await index.query({ queryRequest });

//     return {
//       props: {
//         result: response,
//         name: "success1",
//       },
//     };
//   } catch (err) {
//     return {
//       props: {
//         err,
//         name: "error1",
//       },
//     };
//   }
// }

import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeClient } from "@pinecone-database/pinecone";
import { OpenAIApi, Configuration } from "openai";

export default async function handler(req, res) {
  let inputData = req.body.inputData;
  try {
    let response = await getServerSideProps({ query: { inputData } });
    res.status(200).json({ name: "success", response });
  } catch (err) {
    res.status(201).json({ name: "error" });
  }
}

export async function getServerSideProps(context) {
  let inputData = context.query.inputData;
  try {
    let embed = new OpenAIEmbeddings({
      openAIApiKey: "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",
      // openAIApiKey: "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",
    });
    let embedding = await embed.embedQuery(inputData);

    const pinecone = new PineconeClient();
    await pinecone.init({
      apiKey: "29501f44-8a91-42dd-b702-96560cdc1d23",
      environment: "us-west1-gcp-free",
    });
    const index = pinecone.Index("first-index");

    const queryRequest = {
      vector: embedding,
      topK: 2,
      includeValues: false,
      includeMetadata: true,
      namespace: "test sipto",
    };
    let response = await index.query({ queryRequest });
    let embedded_data = "";
    for (let i = 0; i < response.matches.length; i++) {
      embedded_data = embedded_data + response.matches[i].metadata.text;
    }
    try {
      const configuration = new Configuration({
        apiKey: "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",
        // apiKey: "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",
      });
      const openai = new OpenAIApi(configuration);

      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a helpful assistant for a savings and investment app- Sipto. Based on the embedded data, answer the queston or statment user has input, so the user can navigate and get the tasks done - Embedded data : ${embedded_data}. In your response attach any one of the link relevant to user input - Invest : http://localhost:3000/Dashboard/appLink/, Assets: http://localhost:3000/Assests/appLink/, Withdraw: http://localhost:3000/Withdraw/appLink/, Portfolio : http://localhost:3000/Dashboard/appLink/, Dashboard: http://localhost:3000/Dashboard/appLink/, Fund: http://localhost:3000/Wallet/appLink/, KYC: http://localhost:3000/WebSdk/appLink/.`,
            // content: `You are a helpful assistant for a savings and investment app- Sipto. Based on the embedded data, answer the queston or statment user has input, so the user can navigate and get the tasks done - Embedded data : ${embedded_data}.In your response attach any one of the link relevant to user input - Invest : sipto.io/invest, Assets: sipto.io/assets, Withdraw: sipto.io/withdraw, Portfolio : sipto.io/portfolio, KYC: http://localhost:3000/WebSdk/appLink/.`,
          },
          { role: "user", content: inputData },
        ],
      });
      return {
        props: {
          result: completion.data,
          name: "success2",
        },
      };
    } catch (err) {
      return {
        props: {
          err,
          name: "error2",
        },
      };
    }

    return {
      props: {
        result: response,
        name: "success1",
        embedded_data,
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
