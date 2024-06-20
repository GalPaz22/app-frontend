'use client';
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Navbar from "../Navbar";

const API_URL = "https://app-backend-urlo.onrender.com"; // Adjust this URL to your backend

export default function Chat() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [generation, setGeneration] = useState("");
  const [conversation, setConversation] = useState([]);
  const [authenticated, setAuthenticated] = useState(null);
  const router = useRouter();
  const chatContainerRef = useRef(null);

  const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
  });

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    if (authenticated === false) {
      router.push("/login"); // Redirect to login page if not authenticated
    }
  }, [authenticated, router]);

  useEffect(() => {
    // Scroll to the bottom of the chat container when conversation updates
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

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

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) {
      alert("Please enter a message.");
      return;
    }

    setLoading(true);

    try {
      const userId = Cookies.get("userId");
      const response = await fetch(`${API_URL}/chat-response`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userId}`,
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let newGeneration = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;

        const lines = buffer.split("\n");
        buffer = lines.pop(); // Keep the last incomplete line in the buffer

        lines.forEach((line) => {
          if (line.startsWith("data: ")) {
            const jsonData = line
              .replace("data: ", "")
              .replace("[DONE]", "")
              .trim();
            if (jsonData !== "[DONE]") {
              try {
                const content = JSON.parse(jsonData);
                newGeneration += content;
                setGeneration(newGeneration);
              } catch (e) {
                console.error("Error parsing JSON:", e);
              }
            }
          }
        });
      }

      setConversation((prevConversation) => [
        ...prevConversation,
        { role: "user", text: message },
        { role: "assistant", text: newGeneration },
      ]);
      setGeneration(""); // Reset generation after the full message is received
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
      setMessage("");
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
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-red-400 to-blue-500 flex justify-center items-center">
        <div className="container mx-auto p-4 rounded-md bg-white shadow-lg flex flex-col justify-between h-4/5">
          <div className="flex-grow overflow-y-auto mb-4" ref={chatContainerRef} style={{ maxHeight: "calc(100vh - 200px)" }}>
            <div className="flex justify-between"> 
              <h1 className="text-3xl font-bold mb-4">ChatGPT-4o</h1>
            </div>
            <div id="response-container" className="overflow-y-auto whitespace-wrap">
              {conversation.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-2`}
                >
                  <div className={`p-2 rounded-md ${msg.role === "user" ? "bg-gray-200" : "bg-gray-100"} max-w-3/4`}>
                    <strong className="block mb-1 text-sm text-gray-600">
                      {msg.role === "user" ? "You" : "Assistant"}:
                    </strong>
                    <div className={`${msg.text.startsWith("```") ? "bg-black text-white p-2 rounded" : ""}`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-end mb-2">
                  <div className="p-2 rounded-md bg-gray-100 max-w-3/4">
                    <strong className="block mb-1 text-sm text-gray-600">Assistant:</strong>
                    <div className="bg-black text-white p-2 rounded">
                      {generation}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="w-full flex">
            <input
              type="text"
              value={message}
              onChange={handleMessageChange}
              placeholder="Enter your message"
              className="border border-gray-300 rounded-md p-2 flex-grow"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ml-2"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
