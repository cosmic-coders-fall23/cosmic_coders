"use client";
import { Card } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useForm } from "react-hook-form";

type FormData = {
    email: string;
    username: string;
    password: string;
}

function SignUpPage() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    fetch("/api/signup", {
        method: 'POST',
        body: JSON.stringify(data)
    }).then(response => {
        console.log(response);
    })
  });

  return (
    <div className="h-screen flex items-center justify-center p-5">
      <Card className="w-96 p-8">
        <h1 className="text-4xl text-center font-extrabold mb-4">Sign Up</h1>
        <form onSubmit={onSubmit} className="flex w-full flex-wrap gap-4">
          <Input
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            type="email"
            label="Email"
            placeholder="Enter your email"
          />
          <Input
            {...register("username", {
              required: true,
              minLength: 3,
              maxLength: 10,
            })}
            label="Username"
            placeholder="Enter your username"
          />
          <Input
            {...register("password", {
              required: true,
              minLength: 8,
              maxLength: 24,
            })}
            type="password"
            label="Password"
            placeholder="Enter your password"
          />
          <Button type="submit" className="w-full bg-blue-700">
            Sign Up
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default SignUpPage;
