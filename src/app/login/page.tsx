'use client';
import { useState } from 'react';
import { Card, Input, Button } from "@nextui-org/react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (response.ok) {
        // Handle successful login, e.g., redirecting the user
        alert(result.message);
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Error during login. Please try again.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center p-5">
      <Card className="w-96 p-8">
        <h1 className="text-4xl text-center font-extrabold mb-4">Log In</h1>
        {errorMessage && <span className="text-red-500 text-sm block">{errorMessage}</span>}
        <div className="flex w-full flex-wrap gap-4">
          <Input 
            type="email" 
            label="Email" 
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
            type="password" 
            label="Password" 
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="w-full bg-blue-700" onClick={handleLogin}>Log In</Button>
        </div>
      </Card>
    </div>
  );
}

export default LoginPage;
