import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Smartphone, LogOut, Home as HomeIcon } from "lucide-react";
import type { Phone } from "@shared/schema";

interface PhonePublic {
  id: number;
  brand: string;
  model: string;
  dpi: number;
}

export default function PhonesList() {
  const { isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const [, navigate] = useLocation();
  const [search, setSearch] = useState("");

  const { data: phones = [], isLoading } = useQuery<PhonePublic[]>({
    queryKey: ["/api/phones", search],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      const res = await fetch(`/api/phones?${params}`);
      if (!res.ok) throw new Error("Failed to fetch phones");
      return res.json();
    },
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950 to-slate-950 flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <Smartphone className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-4">سجل الدخول</h1>
          <p className="text-gray-300 mb-6">
            يجب عليك تسجيل الدخول لعرض إعدادات الهاتف
          </p>
          <a href="/api/login">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              تسجيل الدخول - Sign In
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-sm text-gray-400 mb-1">Free Fire Headshot Settings</p>
            <h1 className="text-4xl font-bold text-white">قائمة الهواتف</h1>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              data-testid="button-home"
            >
              <HomeIcon className="w-4 h-4 mr-2" />
              الرئيسية
            </Button>
            <Button
              variant="destructive"
              onClick={() => logout()}
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4 mr-2" />
              تسجيل الخروج
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <Input
            type="text"
            placeholder="ابحث عن هاتفك... Search for phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-800 border-red-500 text-white placeholder-gray-400"
            data-testid="input-search"
          />
        </div>
      </div>

      {/* Phones List */}
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin">
              <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full"></div>
            </div>
          </div>
        ) : phones.length === 0 ? (
          <div className="text-center text-gray-400">
            <p>لم يتم العثور على هواتف - No phones found</p>
          </div>
        ) : (
          <div className="space-y-2">
            {phones.map((phone) => (
              <Card
                key={phone.id}
                className="bg-slate-800 border-red-500 hover:border-red-400 cursor-pointer transition-all hover:shadow-lg hover:shadow-red-500/20 p-4"
                onClick={() => navigate(`/phones/${phone.id}`)}
                data-testid={`card-phone-${phone.id}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-lg">
                      {phone.brand} {phone.model}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      DPI: {phone.dpi}
                    </p>
                  </div>
                  <p className="text-sm text-gray-400">
                    انقر لعرض - Click to view
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
