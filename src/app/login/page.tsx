'use client';
import { FC, useState, useEffect } from 'react';
import { Card, Input, Button } from "@nextui-org/react";
import { signIn, getProviders, getCsrfToken } from 'next-auth/react';

const LoginPage: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [providers, setProviders] = useState<Record<string, any>>({});
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const token = await getCsrfToken();
      const providerList = await getProviders();
      setCsrfToken(token);
      setProviders(providerList);
    };

    fetchData();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center p-5">
      <Card className="w-96 p-8">
        <h1 className="text-4xl text-center font-extrabold mb-4">Log In</h1>
        {errorMessage && <span className="text-red-500 text-sm block mb-4">{errorMessage}</span>}
        {providers && Object.values(providers).map(provider => (
          <Button key={provider.name} className="w-full mb-4" onClick={() => signIn(provider.id)}>
            Log in with {provider.name}
          </Button>
        ))}
        <form method="post" action="/api/auth/callback/credentials">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken || ''} />
          <Input 
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
          <Input 
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />
          <Button className="w-full bg-blue-700 mt-4" type="submit">Log In</Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;


