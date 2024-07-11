"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

const API_URL = "https://app-backend-urlo.onrender.com"; // Adjust this URL to your backend

export default function Home() {
  const [question, setQuestion] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [apiKey, setApiKey] = useState("");
  const [showUploadLimitMessage, setShowUploadLimitMessage] = useState(false);

  useEffect(() => {
    // Generate and set the session ID and counter when the component mounts
    let sessionId = Cookies.get("sessionId");
    if (!sessionId) {
      sessionId = uuidv4();
      Cookies.set("sessionId", sessionId, { expires: 1 / 24 }); // Expires in 1 hour
      Cookies.set("uploadCount", 0, { expires: 1 / 24 }); // Initialize upload count
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
  };

  const handleFileUpload = async () => {
    const uploadCount = parseInt(Cookies.get("uploadCount"), 10);

    if (uploadCount >= 3) {
      setShowUploadLimitMessage(true);
      return;
    }

    if (!file) {
      alert("Please upload a PDF file.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const sessionId = Cookies.get("sessionId");
      formData.append("sessionId", sessionId);

      await axios.post(`${API_URL}/embed-pdf`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Increment the upload count
      Cookies.set("uploadCount", uploadCount + 1, { expires: 1 / 24 });

      alert("File uploaded and embedded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading the file.");
    } finally {
      setLoading(false);
    }
  };

  const handleCleanNamespace = async () => {
    try {
      setLoading(true);

      const sessionId = Cookies.get("sessionId");
      await axios.post(`${API_URL}/clean-namespace`, { sessionId });

      alert("Namespace cleaned successfully!");
      setConversation([]);
    } catch (error) {
      console.error("Error cleaning namespace:", error);
      alert("An error occurred while cleaning the namespace.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question) {
      alert("Please enter a question, upload a PDF file, and provide an API key.");
      return;
    }

    setLoading(true);

    try {
      const sessionId = Cookies.get("sessionId");
      const res = await axios.post(`${API_URL}/generate-response`, {
        question,
        sessionId,
        apiKey,
      });

      const answer = res.data.answer;

      setConversation((prevConversation) => [
        ...prevConversation,
        { role: "user", text: question },
        { role: "assistant", text: answer },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setConversation((prevConversation) => [
        {
          role: "system",
          text: "An error occurred while fetching the response.",
        },
      ]);
    } finally {
      setLoading(false);
      setQuestion("");
    }
  };

  const closeUploadLimitMessage = () => {
    setShowUploadLimitMessage(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center  dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto p-4 rounded-md bg-white dark:bg-gray-800 shadow-lg">
        <h1 className="text-3xl font-bold mb-4">100% Free ChatPDF - No Sign Up</h1>
        <div className="mb-4">
          <label
            htmlFor="file-upload"
            className="block text-gray-700 dark:text-gray-300 font-bold"
          >
            Upload a PDF file:
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="file-upload"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer inline-flex items-center"
          >
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Choose File
          </label>
          {fileName && <span className="text-gray-500 dark:text-gray-300 ml-2">{fileName}</span>}
        </div>
        <button
          onClick={handleFileUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-4"
        >
          Upload and Embed
        </button>
        <button
          onClick={handleCleanNamespace}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 ml-2"
        >
          Clean
        </button>
        <span className="mr-1 ml-6 font-bold">Docs uploaded</span><span className="ml-2">{ Cookies.get("uploadCount") ? parseInt(Cookies.get("uploadCount"), 10) : 0}/3</span>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={question}
              onChange={handleQuestionChange}
              placeholder="Enter your question"
              className="border border-gray-300 dark:border-gray-700 rounded-md p-2 w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Ask
          </button>
        </form>
        {loading && <div className="mt-4 text-gray-700 dark:text-gray-300">Loading...</div>}
        <div id="response-container" className="mt-4">
          {conversation
            .slice()
            .reverse()
            .map((entry, index) => (
              <div
                key={index}
                className={`p-2 border rounded-md mb-2 ${
                  entry.role === "user" ? "bg-gray-200 dark:bg-gray-700" : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                <strong>{entry.role === "user" ? "You" : "Assistant"}:</strong>{" "}
                {entry.text}
              </div>
            ))}
        </div>
        {showUploadLimitMessage && (
          <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-md shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-bold text-lg">You reached your limit</h2>
                <p>Have an unlimited account, both in docs and messages, from as little as $5 a month - the price of a cup of coffee (at Starbucks).</p>
              </div>
              <button onClick={closeUploadLimitMessage} className="ml-4 text-white font-bold">
                X
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
}
