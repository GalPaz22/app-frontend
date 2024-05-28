 "use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const API_URL = "https://app-backend-urlo.onrender.com"; // Adjust this URL to your backend

export default function Home() {
  const [question, setQuestion] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [authenticated, setAuthenticated] = useState(null); // null indicates loading state
  const [apiKey, setApiKey] = useState("");

  const router = useRouter();
  const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
  });


  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const userId = Cookies.get("userId" );
      
      if (!userId) {
        setAuthenticated(false);
        return;
      }

      const res = await axiosInstance.get("/check-auth", {
        headers: {
          Authorization: `Bearer ${userId }`,
        },
      });



   


      setAuthenticated(res.data.authenticated);
    } catch (error) {
      setAuthenticated(false);
    }
  };

  useEffect(() => {
    if (authenticated === false) {
      router.push("/login"); // Redirect to login page if not authenticated
    }
  }, [authenticated, router]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question || !file || !apiKey) {
      alert(
        "Please enter a question, upload a PDF file, and provide an API key."
      );
      return;
    }

    setLoading(true);

    try {
      const userId = Cookies.get("userId");
      const formData = new FormData();
      formData.append("question", question);
      formData.append("file", file);
      formData.append("sessionId", sessionId);
      formData.append("apiKey", apiKey); // Append the apiKey to the form data

      const res = await axios.post(`${API_URL}/generate-response`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userId}`,
        },
      });

      const newSessionId = res.data.sessionId;
      const answer = res.data.answer;

      if (!sessionId) {
        setSessionId(newSessionId);
      }

      setConversation((prevConversation) => [
        ...prevConversation,
        { role: "user", text: question },
        { role: "assistant", text: answer },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setConversation((prevConversation) => [
        ...prevConversation,
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

  if (authenticated === null) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-400 to-blue-500 flex justify-center items-center">
      <div className="container mx-auto p-4 rounded-md bg-white shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Ask Your Doc</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="file-upload"
              className="block text-gray-700 font-bold"
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
            {fileName && <span className="text-gray-500 ml-2">{fileName}</span>}
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={question}
              onChange={handleQuestionChange}
              placeholder="Enter your question"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={apiKey}
              onChange={handleApiKeyChange}
              placeholder="Enter your API key"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Ask
          </button>
        </form>
        {loading && <div className="mt-4 text-gray-700">Loading...</div>}
        <div id="response-container" className="mt-4">
          {conversation.map((entry, index) => (
            <div
              key={index}
              className={`p-2 border rounded-md mb-2 ${
                entry.role === "user" ? "bg-gray-200" : "bg-gray-100"
              }`}
            >
              <strong>{entry.role === "user" ? "You" : "Assistant"}:</strong>{" "}
              {entry.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}