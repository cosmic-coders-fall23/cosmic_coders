import Link from 'next/link'; // Import the Link component

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 bg-gray-100">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">SPACE INVADERS</h1>
      <div className="flex flex-col items-center space-y-4">
        <Link href="/signup"> {/* Add this Link component */}
          <a className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
            Go to Sign Up
          </a>
        </Link>

        <Link href="/login"> {/* Add this Link component */}
          <a className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200">
            Go to Login
          </a>
        </Link>
      </div>
    </main>
  );
}
