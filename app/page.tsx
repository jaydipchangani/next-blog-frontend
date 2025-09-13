import '@ant-design/v5-patch-for-react-19';
import Image from "next/image";
import Link from "next/link";
import { Button } from "antd";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white px-6 text-center">

      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-4">
        Welcome to My Blog
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl">
        Explore amazing articles, tips, and insights. Join us to stay updated with fresh content every day!
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <Link href="/login" passHref>
          <Button type="primary" size="large">
            Login
          </Button>
        </Link>
        <Link href="/signup" passHref>
          <Button type="default" size="large">
            Signup
          </Button>
        </Link>
      </div>

      {/* Hero Image */}
      <div className="w-full max-w-3xl rounded-xl shadow-lg overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Blog Hero"
          width={1200}
          height={600}
          style={{ borderRadius: "0.75rem" }} 
        />
      </div>
    </div>
  );
}
