import {Card} from "@nextui-org/card";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";

function LoginPage () {

    return (
        <div className="h-screen flex items-center justify-center p-5">
            <Card className="w-96 p-8">
                <h1 className="text-4xl text-center font-extrabold mb-4">Log In</h1>
                <div className="flex w-full flex-wrap gap-4">
                    <Input type="email" label="Email" placeholder="Enter your email" />
                    <Input type="password" label="Password" placeholder="Enter your password" />
                    <Button className="w-full bg-blue-700">Log In</Button>
                </div>
            </Card>
        </div>
    )
}

export default LoginPage;