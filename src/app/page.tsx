import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Header } from "../components/component/header";
import { MapPin } from "lucide-react";
export default function Home() {
  return (
    <div className="w-full h-full">
      <Header />
      <div className="bg-gray-200 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-bold text-dark">Lựa chọn hôm nay</div>
          <div className="flex items-center cursor-pointer hover:text-blue-600 hover:underline">
            <MapPin className="mr-2 text-dark" />
            <span className="text-dark">Quận Hải Châu - 65km</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="bg-white border rounded-md shadow-md hover:scale-105 transition-transform duration-300"
            >
              <a href="link-supplier">
                <img
                  className="w-full h-48 object-cover rounded-t-md"
                  src="https://admin.cms.ueb.edu.vn//Uploads/image/News/Thumbnails/2022/1/Thumbnails03012022052442.quan-tri-dai-hoc.jpg"
                  alt="Supplier"
                />
                <div className="p-4">
                  <div className="font-semibold text-lg">Tôn Hoa Sen</div>
                  <div className="text-sm text-gray-600">
                    183 Nguyễn Văn Trỗi, Quận Phú Nhuận, HCM
                  </div>
                  <div className="flex justify-between mt-2">
                    <div className="flex text-sm text-green-500">
                      <p className="text-primary mr-1">163</p>
                      <p>Sản phẩm</p>
                    </div>
                    <div className="flex text-sm text-red-500">
                      <p className="text-primary mr-1">4.6</p>
                      <p>Đánh giá</p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
