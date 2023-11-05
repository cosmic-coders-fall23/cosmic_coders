"use client";
import { Card } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import {Spinner} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import AuthService from "@/services/authservice";
import {useContext, useState} from "react";
import { UserContext } from '@/components/usercontext';
import { useRouter } from 'next/navigation'

type FormData = {
    email: string;
    password: string;
}

function LoginPage() {
    const [loading, setLoading] = useState(false);
    const {setUser} = useContext(UserContext);
    const router = useRouter();

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = handleSubmit((data) => {
        setLoading(true);
        AuthService.login(data.email, data.password)
            .then(response => {
                if (response.status === 200) {
                    const userData = {
                        username: response.data.username,
                        email: response.data.email,
                        score: response.data.score,
                    };

                    // Update the user context and local storage
                    setUser(userData);
                    localStorage.setItem("user", JSON.stringify(userData));
                    router.push("/")
                }
            }).catch(error => {
                setLoading(false);
                console.log(error)
            })
    });

    return (
        <div className="h-screen flex items-center justify-center p-5">
            <Card className="w-96 p-8">
                {loading && (<Spinner size="lg" className="absolute top-1/2 right-1/2 z-10" />)}
                <div className={loading ? "h-full blur-md" : ""}>
                    <h1 className="text-4xl text-center font-extrabold mb-4">Log In</h1>
                    <form onSubmit={onSubmit} className="flex w-full flex-wrap gap-4">
                        <Input
                            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                            type="email"
                            label="Email"
                            placeholder="Enter your email"
                        />
                        <Input
                            {...register("password", {
                                required: true,
                            })}
                            type="password"
                            label="Password"
                            placeholder="Enter your password"
                        />
                        <Button type="submit" className="w-full bg-blue-700">
                            Log In
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    )
}

export default LoginPage;