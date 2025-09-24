import React, { useState } from "react";
import './Sidebar.css'
import { assets } from '../../assets/assets';

const Sidebar = ({ recentPrompts }) => {
    const [extended, setExtended] = useState(false);

    return (
        <div className="sidebar">
            <div className="top">
                <img 
                  onClick={() => setExtended(prev => !prev)} 
                  className="menu" 
                  src={assets.menu_icon} 
                  alt="menu" 
                />
                <div className="new-chat">
                    <img src={assets.plus_icon} alt="+" />
                    {extended ? <p>New Chat</p> : null}
                </div>

                
                {extended && (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {recentPrompts.length === 0 ? (
                          <p style={{ color: "gray", fontSize: "14px" }}>No recent chats</p>
                        ) : (
                          recentPrompts.map((prompt, i) => (
                            <div key={i} className="recent-entry">
                                <img src={assets.message_icon} alt="msg" />
                                <p>{prompt.slice(0, 20)}...</p>
                            </div>
                          ))
                        )}
                    </div>
                )}
            </div>

            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {extended ? <p>Setting</p> : null}
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
