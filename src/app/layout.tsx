//app/layout.tsx
import './globals.css'
import Providers from "@/app/Providers";
import CustomNavbar from "@/components/navbar";

export default async function RootLayout({
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
