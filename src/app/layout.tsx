import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {Providers} from "@/app/Providers";
import CustomNavbar from "@/components/navbar";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Cosmic Coders',
    description: 'Website for Cosmic Coders.',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className='dark'>
        <body>
        <Providers>
            <CustomNavbar />
            {children}
        </Providers>
        </body>
        </html>
    )
}
