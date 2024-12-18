import React, { useEffect, useState } from "react";
import "./CommunityPage.css"; // Import CSS for CommunityPage

const CommunityPage = () => {
    const [letters, setLetters] = useState([]);

    useEffect(() => {
        // Fetch data from randomuser.me API
        const fetchLetters = async () => {
            const response = await fetch("https://randomuser.me/api/?results=40");
            const data = await response.json();

            const generatedLetters = data.results.map((user, index) => ({
                id: index + 1,
                userName: `${user.name.first} ${user.name.last}`,
                snippet: `Stay positive and keep striving! - ${user.name.first}`,
                profilePic: user.picture.thumbnail,
            }));

            setLetters(generatedLetters);
        };

        fetchLetters();
    }, []);

    // Function to split text and wrap each letter with a span
    const coloredHeaderText = (text) => {
        const colors = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"]; // Blue, Red, Yellow, Green
        return text.split("").map((char, index) => (
            <span key={index} style={{ color: colors[index % colors.length] }}>
                {char}
            </span>
        ));
    };

    return (
        <div className="community-container">
            <h2 className="community-header">
                {coloredHeaderText("Community Letters")}
            </h2>
            <div className="community-letters-list">
                {letters.map((letter) => (
                    <div key={letter.id} className="community-letter-card">
                        <div className="community-profile-pic">
                            <img src={letter.profilePic} alt={letter.userName} />
                        </div>
                        <div className="community-letter-content">
                            <h4 className="community-user-name">{letter.userName}</h4>
                            <p className="community-letter-snippet">{letter.snippet}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommunityPage;
