'use client';

import { Card } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  username: string;
  password: string;
};

function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await fetch("/api/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok && result.message === "User created successfully.") {
        alert("Signup successful!");
      } else {
        alert(result.message || "Signup failed.");
      }
    } catch (error) {
      console.error("There was an error signing up:", error);
      alert("There was an error signing up. Please try again.");
    }
  });

  const backgroundImageUrl =
    "https://preview.redd.it/lqw1dpdwv7hb1.jpg?width=640&crop=smart&auto=webp&s=7c386c659f48ead0ed7ddd6d7f6e4f192bc0d728";

  return (
    <div
      className="h-screen flex items-center justify-center p-5"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
      }}
    >
      <Card className="w-96 p-8">
        <h1 className="text-4xl text-center font-extrabold text-white mb-4">Sign Up</h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <Input
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            type="email"
            label="Email"
            placeholder="✉️ Enter your email"
            className="cool-input"
          />
          {errors.email && <span className="text-red-500 text-sm block">Please enter a valid email.</span>}

          <Input
            {...register("username", {
              required: true,
              minLength: 3,
              maxLength: 10,
            })}
            label="Username"
            placeholder="👤 Enter your username"
            className="cool-input"
          />
          {errors.username && <span className="text-red-500 text-sm block">Username must be between 3 to 10 characters.</span>}

          <Input
            {...register("password", {
              required: true,
              minLength: 8,
              maxLength: 24,
            })}
            type="password"
            label="Password"
            placeholder="🔒 Enter your password"
            className="cool-input"
          />
          {errors.password && <span className="text-red-500 text-sm block">Password must be between 8 to 24 characters.</span>}

          <Button type="submit" className="bg-space-theme text-white hover:bg-space-theme-dark">
            Sign Up
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default SignUpPage;
