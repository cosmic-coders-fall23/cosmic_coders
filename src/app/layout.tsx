import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {Providers} from "@/app/Providers";
import CustomNavbar from "@/components/navbar";
import { getServerSession } from "next-auth"
import SessionProvider from "@/components/SessionProvider";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Cosmic Coders',
    description: 'Website for Cosmic Coders.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();

  return (
    <html lang="en" className='dark'>
      <body className={inter.className}>
        <SessionProvider session={session}>
          <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-900 space-y-8">
            <CustomNavbar />
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  )
}
