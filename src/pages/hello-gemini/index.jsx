import { useState } from "react";

export default function HelloGemini() {
  const [response, setResponse] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResponse("");

    const prompt = event.target[0].value;
    const resp = await fetch("/api/gemini/hello", {
      method: "POST",
      body: JSON.stringify({
        prompt: prompt,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await resp.json();
    console.log(data); // Handle the response, e.g., show a success message

    setResponse(data.text);
    event.target.reset();
  };

  return (
    <div>
      <h1>Hello Gemini</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="prompt">Prompt : </label>
        <input type="text" id="prompt" name="prompt" required />

        <button type="submit" className="btn btn-primary" id="sendButton">
          Send
        </button>
      </form>

      {response && response !== "" && (
        <div className="alert alert-success" role="alert">
          {response}
        </div>
      )}
    </div>
  );
}
