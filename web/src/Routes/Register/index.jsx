import React, { useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Typography from "../../components/Typography";
import { useNavigation } from "../../context/Navigation";
import { register } from "../../services/auth";

const Register = () => {
  const { navigate } = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState({
    value: "",
    error: "",
  });
  const [error, setError] = useState("");
  const handleErrors = () => {
    if (passwordConfirm.value !== password) {
      setPasswordConfirm((prev) => ({
        ...prev,
        error: "not match password",
      }));
      throw password;
    }
  };

  const handleRegister = async () => {
    handleErrors();

    try {
      await register({ username, password });
      navigate("/login");
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <Card className="card">
      <div className="container">
        <h1>Register</h1>
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
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          label="Confirm Password"
          value={passwordConfirm.value}
          onChange={(value) =>
            setPasswordConfirm((prev) => ({
              error: "",
              value,
            }))
          }
          error={passwordConfirm.error}
        />

        <Typography variant="error">{error}</Typography>
        <Button
          style={{ width: "50%" }}
          variant="primary"
          onClick={handleRegister}
        >
          Register
        </Button>
        <Button
          style={{ width: "50%" }}
          variant="secondary"
          onClick={() => navigate("login")}
        >
          Login
        </Button>
      </div>
    </Card>
  );
};

export default Register;
