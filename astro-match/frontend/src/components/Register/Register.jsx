import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.scss";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Şifrələrin uyğunluğunu yoxlayırıq
    if (formData.password !== formData.confirmPassword) {
      setError("Şifrələr uyğun gəlmir!");
      return;
    }

    const dataToSend = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      birthDate: formData.birthDate,
    };

    try {
      // Backend-ə POST sorğusu göndəririk
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (response.ok) {
        // Tokeni localStorage-də saxlayırıq
        localStorage.setItem("token", result.token);
        // Dashboard-a yönləndiririk
        navigate("/dashboard");
      } else {
        // Əgər səhv varsa, istifadəçiyə göstəririk
        setError(result.message || "Qeydiyyat zamanı xəta baş verdi.");
      }
    } catch (err) {
      // Server səhvi varsa, bunu bildiririk
      setError("Serverlə əlaqə qurularkən xəta baş verdi.");
    }
  };

  return (
    <div className="register-container">
      <h2>Qeydiyyat</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="form-group">
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <input
              className="input"
              type="text"
              name="username"
              placeholder="İstifadəçi adı"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="E-poçt"
              onChange={handleChange}
              required
            />
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Şifrə"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Şifrəni təkrar daxil edin"
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="birthDate"
              onChange={handleChange}
              required
            />
            <button type="submit">Qeydiyyat</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
