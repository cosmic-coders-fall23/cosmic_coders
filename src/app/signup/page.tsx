"use client";
import { Card } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import {Spinner} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import AuthService from "@/services/authservice";
import {useState} from "react";

type FormData = {
  email: string;
  username: string;
  password: string;
}

function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    setLoading(true);
    AuthService.signup(data.username, data.email, data.password)
      .then(response => {
        if(response.status === 200) {
          setSuccess(true);
          setLoading(false);
        }
      }).catch(error => {
        setSuccess(false);
        setLoading(false);
        console.log(error);
      })
  });

  return (
      <div className="h-screen flex items-center justify-center p-5">
        <div className="flex flex-col">
          {success && (
            <Card className="w-96 p-4">
              <h2 className="text-xl text-center font-bold mb-2">Thanks for signing up!</h2>
              <p>A verification email has been sent to your inbox.</p>
            </Card>
          )}
          <Card className="w-96 p-8">
            {loading && (<Spinner size="lg" className="absolute top-1/2 right-1/2 z-10" />)}
            <div className={loading ? "h-full blur-md" : ""}>
              <h1 className="text-4xl text-center font-extrabold mb-4">Sign Up</h1>
              <form onSubmit={onSubmit} className="flex w-full flex-wrap gap-4">
                <Input
                  {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                  disabled={loading || success}
                />
                <Input
                  {...register("username", {
                    required: true,
                    minLength: 3,
                    maxLength: 10,
                  })}
                  label="Username"
                  placeholder="Enter your username"
                  disabled={loading || success}
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
                  disabled={loading || success}
                />
                <Button type="submit" className="w-full bg-blue-700">
                  Sign Up
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </div>
  );
}

export default SignUpPage;