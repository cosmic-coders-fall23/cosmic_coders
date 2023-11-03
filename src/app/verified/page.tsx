import { Card, CardHeader, CardBody, CardFooter, Divider, Link } from "@nextui-org/react";

function VerifiedPage() {

    return (
        <div className="h-screen flex items-center justify-center p-5">
            <Card className="max-w-[400px]">
                <CardHeader className="flex gap-3">
                    <h1 className="text-2xl text-center font-extrabold">Email Verified Successfully</h1>
                </CardHeader>
                <Divider />
                <CardBody>
                    <p>Thank you for verifying your email.</p><br/>
                    <p><Link href="/login">Click here</Link> to login.</p>
                </CardBody>
            </Card>
        </div>
    )
}

export default VerifiedPage;