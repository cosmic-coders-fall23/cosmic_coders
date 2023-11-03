//app/layout.tsx
import './globals.css'
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import Providers from "@/app/Providers";
import CustomNavbar from "@/components/navbar";
import { getServerSession } from "next-auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();

  return (
    <html lang="en" className='dark'>
      <body>
        <Providers session={session}>
            <CustomNavbar />
            {children}
        </Providers>
      </body>
    </html>
  )
}
