import { Card } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

function LoginPage() {
  const backgroundImageUrl =
    "https://preview.redd.it/lqw1dpdwv7hb1.jpg?width=640&crop=smart&auto=webp&s=7c386c659f48ead0ed7ddd6d7f6e4f192bc0d728";

  return (
    <div
      className="h-screen flex items-center justify-center p-5"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        imageRendering: "pixelated", // Add this line for image rendering
      }}
    >
      <Card className="w-96 p-8">
        <h1 className="text-4xl text-center font-extrabold text-white mb-4">Log In</h1>
        <div className="flex w-full flex-wrap gap-4">
          <Input type="email" label="Email" placeholder="✉️ Enter your email" className="cool-input" />
          <Input type="password" label="Password" placeholder="🔒 Enter your password" className="cool-input" />
          <Button className="bg-space-theme text-white hover:bg-space-theme-dark w-full">
            Log In
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default LoginPage;
