import React, { useState, useRef, useEffect } from "react";
import './Main.css'
import { assets } from "../../assets/assets";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";


const Main = ({ messages, onSend, loading }) => {
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, loading]);

    const handleSubmit = () => {
        if (input.trim() === "") return;
        onSend(input);
        setInput("");
    };

    return (
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="user" />
            </div>

            <div className="main-container">
                {messages.length === 0 && (
                    <div className="greet">
                        <p><span>Hello devs..</span></p>
                        <p>How can I help you today?</p>
                    </div>
                )}

                <div className="response-box">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`message ${msg.role === "user" ? "user-msg" : "ai-msg"}`}
                        >
                            {msg.role === "user" ? (
                                <h5>{msg.text}</h5>
                            ) : (
                                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                    {msg.text}
                                </ReactMarkdown>
                            )}
                        </div>
                    ))}

                    {loading && (
                        <div className="message ai-msg typing">
                            <span></span><span></span><span></span>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input box */}
                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Enter a prompt here"
                            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                        />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            <img
                                src={assets.send_icon}
                                alt="send"
                                onClick={handleSubmit}
                            />
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about people,
                        so double-check its response. Your privacy and Gemini App.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main;
