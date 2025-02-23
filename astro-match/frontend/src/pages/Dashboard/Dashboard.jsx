// frontend/src/pages/Dashboard/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.scss";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/user/matches", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Gələn cavab:", response.data); // Gələn cavabı konsolda yoxla

        if (response.data.user) {
          setUser(response.data.user);
          setMatches(response.data.matches || []);
        } else {
          console.error("İstifadəçi məlumatları tapılmadı!");
          navigate("/login");
        }
      } catch (err) {
        console.error("User data fetch error:", err);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleSendMessage = (matchId) => {
    navigate(`/chat/${matchId}`);
  };

  return (
    <div className="dashboard">
      {user ? (
        <>
          <h1>Salam, {user.name}</h1>
          <p>Bürcünüz: {user.zodiacSign}</p>
          <p>Yaşınız: {user.age}</p>
          <h2>Uyğunlaşmalar</h2>
          {matches.length > 0 ? (
            <ul>
              {matches.map((match) => (
                <li key={match._id}>
                  <p>{match.name} - {match.zodiacSign}</p>
                  <button onClick={() => handleSendMessage(match._id)}>
                    Mesaj Göndər
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Uyğunlaşma tapılmadı.</p>
          )}
        </>
      ) : (
        <p>Yüklənir...</p>
      )}
    </div>
  );
};

export default Dashboard;
