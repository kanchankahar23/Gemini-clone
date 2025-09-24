import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyB9FR7Nk7EIRemrs2J44Jr9FbChRCxy1to";

const genAI = new GoogleGenerativeAI(API_KEY);

async function testing(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);

    const response = await result.response;
    const text = response.text();
    console.log(text);
    return text;
  } catch (err) {
    console.error("Error while fetching:", err);
    return "Error occurred while fetching response!";
  }
}

export default testing;
