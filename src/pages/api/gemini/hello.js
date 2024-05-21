import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;

      console.log("Data : ", data);

      const prompt = data.prompt;

      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      console.log("Prompt : ", prompt);

      const APIKEY = "AIzaSyDoWypbDHcJ2ZLgsQY3pwB-jyabiaRMkRE";

      const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      };

      const genAI = new GoogleGenerativeAI(APIKEY);

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-latest",
      });

      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      const result = await chatSession.sendMessage(prompt);

      const response = result.response.text();

      console.log("Response : ", response);

      // Process a POST request
      res.status(200).json({ text: response });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // Handle any other HTTP method
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
