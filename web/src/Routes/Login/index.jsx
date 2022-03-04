import React from "react";
import { useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Typography from "../../components/Typography";
import { useNavigation } from "../../context/Navigation";
import { login } from "../../services/auth";
import { decodeToken } from "../../helpers/decodeToken";
import { useEffect } from "react";
const Login = () => {
  const { navigate } = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const { token } = await login({ username, password });
      if (token) {
        const [encodedUser] = token.split(".");
        localStorage.setItem("token", token);
        const user = decodeToken()(encodedUser);
        localStorage.setItem("user", user);
      }
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <Card className="card">
      <div className="container">
        <h1>Login</h1>
        <Input
          id="username"
          type="text"
          placeholder="Username"
          label="Username"
          value={username}
          onChange={setUsername}
        />
        <Input
          id="password"
          type="password"
          placeholder="Password"
          label="Password"
          value={password}
          onChange={setPassword}
        />
        <Typography variant="error">{error}</Typography>
        <Button
          style={{ width: "50%" }}
          variant="primary"
          onClick={handleLogin}
        >
          Login
        </Button>
        <Button
          style={{ width: "50%" }}
          variant="secondary"
          onClick={() => navigate("register")}
        >
          Register
        </Button>
      </div>
    </Card>
  );
};

export default Login;
