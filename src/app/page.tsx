import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Header } from "../components/component/header";
import { MapPin } from "lucide-react";
export default function Home() {
  return (
    <div className="w-full h-full">
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <h1 className="text-6xl font-bold text-white animate-fadeIn">
        SELENIUM WEBDRIVER
      </h1>
    </div>
    </div>
  );
}
