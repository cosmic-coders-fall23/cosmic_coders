import { VerifyEmail } from '@/components/email';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);
const resend = new Resend("re_ScdsiYEE_MtJNBciMp9xc28i7uJ1EnRgG");

export async function POST(req: Request) {
    const data = await req.json();
    const {email} = data;
    const {username} = data;
    const {link} = data;
    console.log(email, username, link);

    try {
        const data = await resend.emails.send({
            from: 'Cosmic Coders <verify@cosmiccoders.space>',
            to: [email],
            subject: 'Verify your email',
            react: VerifyEmail({ username: username, link: link }),
        });
        console.log(data);

        return NextResponse.json(data);
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error });
    }
}
