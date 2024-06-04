import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Navbar from "../Navbar";

const API_URL = "https://app-backend-urlo.onrender.com"; // Adjust this URL to your backend

export default function Chat() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [authenticated, setAuthenticated] = useState(null); 
  const [generation, setGeneration] = useState<string>(''); // null indicates loading state
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
    if (authenticated === false) {
      router.push("/login"); // Redirect to login page if not authenticated
    }
  }, [authenticated, router]);

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
      const response = await axios.post(`${API_URL}/chat-response`, { message }, {
        responseType: 'stream', // Specify that the response should be treated as a stream
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      });

      response.data.on('data', (chunk) => {
        // Convert the chunk to a string and append it to the current generation
        setGeneration(currentGeneration => currentGeneration + chunk.toString());
      });

      response.data.on('end', () => {
        // Handle stream end if needed
      });

      response.data.on('error', (error) => {
        console.error('Stream error:', error);
        // Handle stream error if needed
      });

      setConversation((prevConversation) => [
        ...prevConversation,
        { role: "user", text: message },
        { role: "assistant", text: generation },
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
      setMessage("");
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
        <div className="container mx-auto p-4 rounded-md bg-white shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Chat with Your Doc</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mb-4"
          >
            Logout
          </button>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                value={message}
                onChange={handleMessageChange}
                placeholder="Enter your message"
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Send
            </button>
          </form>
          {loading && <div className="mt-4 text-gray-700">Loading...</div>}
          <div id="response-container" className="mt-4 overflow-y-auto">
            {conversation
              .slice()
              .reverse()
              .map((entry, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    className={`p-2 border rounded-md ${
                      entry.role === "user" ? "bg-gray-200" : "bg-gray-100"
                    }`}
                    style={{
                      direction: "rtl",
                      textAlign: "right",
                      maxWidth: "70%",
                    }} // Apply RTL direction and limit width
                  >
                    <strong>
                      {entry.role === "user" ? "You" : "Assistant"}:
                    </strong>{" "}
                    {entry.text}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
