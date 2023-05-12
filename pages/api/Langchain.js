import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

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
    const loader = new TextLoader("src/finaltext.txt");
    // const loader = new PDFLoader("./check.pdf");
    const docs = await loader.load();
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 1,
    });
    const chunckDocs = await splitter.splitDocuments(docs);

    const vectorStore = await MemoryVectorStore.fromDocuments(
      chunckDocs,
      new OpenAIEmbeddings({
        openAIApiKey: "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",
      })
    );

    const resultOne = await vectorStore.similaritySearch(inputData, 2);

    return {
      props: {
        resultOne,
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
