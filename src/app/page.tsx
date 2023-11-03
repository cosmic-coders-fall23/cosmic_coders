//ap/page.tsx
import Link from 'next/link'; // Import the Link component

export default function Home() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center p-8 bg-gray-900 space-y-8 overflow-hidden">
      <img src="/cosmiccoderslogo.png" alt="Logo" className="w-auto h-auto" />
    </main>
  );
}
