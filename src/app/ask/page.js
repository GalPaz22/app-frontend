"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid"; // Import UUID function

const API_URL = "https://app-backend-urlo.onrender.com"; // Adjust this URL to your backend

export default function Home() {
  const [question, setQuestion] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);
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
      const userId = Cookies.get("userId");

      if (!userId) {
        setAuthenticated(false);
        return;
      }

      const res = await axiosInstance.get("/check-auth", {
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      });

      setAuthenticated(res.data.authenticated);
    } catch (error) {
      setAuthenticated(false);
    }
  };

  useEffect(() => {
    const sessionId = Cookies.get("sessionId");
    if (!sessionId) {
      const newSessionId = uuidv4();
      Cookies.set("sessionId", newSessionId, { expires: 1 / 24 });
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


  const handleFileUpload = async () => {
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

      const res = await axios.post(
        `${API_URL}/embed-pdf`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

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
      const response = await axios.post(`${API_URL}/clean-namespace`, {
        sessionId,
      });
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

  const handleLogout = async () => {
    Cookies.remove("userId");
    setAuthenticated(false);
    try {
      await axiosInstance.post("/logout", {});
      router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };



  return (
    <>
     
      <div className="min-h-screen bg-gradient-to-br from-red-400 to-blue-500 flex justify-center items-center">
        <div className="container mx-auto p-4 rounded-md bg-white shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Ask Your Doc</h1>
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
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                value={question}
                onChange={handleQuestionChange}
                placeholder="Enter your question"
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
            {conversation
              .slice()
              .reverse()
              .map((entry, index) => (
                <div
                  key={index}
                  className={`p-2 border rounded-md mb-2 ${
                    entry.role === "user" ? "bg-gray-200" : "bg-gray-100"
                  }`}
                >
                  <strong>
                    {entry.role === "user" ? "You" : "Assistant"}:
                  </strong>{" "}
                  {entry.text}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
