import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Gamepad2, Smartphone } from "lucide-react";

export default function Home() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950 to-slate-950 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Gamepad2 className="w-20 h-20 text-red-500 animate-pulse" />
            <Smartphone className="w-16 h-16 text-red-400 absolute -bottom-2 -right-2" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          Free Fire Headshot Settings
        </h1>
        
        <p className="text-xl text-gray-300 mb-8">
          قاعدة بيانات الحساسية والـ DPI الأمثل لهاتفك
        </p>

        <p className="text-lg text-gray-400 mb-12">
          Find the perfect sensitivity and DPI settings for your phone
        </p>

        {isLoading ? (
          <div className="animate-spin">
            <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full"></div>
          </div>
        ) : isAuthenticated ? (
          <div className="space-y-4">
            <p className="text-green-400 font-semibold">
              مرحبا بك، {user?.firstName || "لاعب"}! 👋
            </p>
            <Button
              onClick={() => navigate("/phones")}
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-8 py-6"
              data-testid="button-view-phones"
            >
              عرض الهواتف - View Phones
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-400 mb-6">
              سجل الدخول لعرض إعدادات هاتفك - Log in to view your phone settings
            </p>
            <a href="/api/login">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-8 py-6"
                data-testid="button-login"
              >
                تسجيل الدخول - Sign In with Google
              </Button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
