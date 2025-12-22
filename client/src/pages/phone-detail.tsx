import { useParams, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import type { Phone } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

const SENSITIVITY_LABELS: Record<string, string> = {
  generalSensitivity: "الحساسية العامة - General",
  redDotSensitivity: "حساسية النقطة الحمراء - Red Dot",
  x2ScopeSensitivity: "حساسية تكبير 2x - 2x Scope",
  x4ScopeSensitivity: "حساسية تكبير 4x - 4x Scope",
  sniperScopeSensitivity: "حساسية القناص - Sniper Scope",
  freeLookSensitivity: "حساسية النظر الحر - Free Look",
};

export default function PhoneDetail() {
  const { id } = useParams();
  const [, navigate] = useLocation();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const { data: phone, isLoading, error } = useQuery<Phone>({
    queryKey: ["/api/phones", id],
    queryFn: async () => {
      const res = await fetch(`/api/phones/${id}`, {
        credentials: "include",
      });
      
      if (res.status === 401) {
        navigate("/api/login");
        throw new Error("Unauthorized");
      }
      
      if (!res.ok) {
        throw new Error(`Failed to fetch phone: ${res.status}`);
      }
      return res.json();
    },
    enabled: isAuthenticated && !authLoading,
  });

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 p-4">
        <div className="max-w-2xl mx-auto">
          <Skeleton className="h-12 mb-8" />
          <Skeleton className="h-64 mb-8" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950 to-slate-950 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">سجل الدخول مطلوب</h1>
          <p className="text-gray-300 mb-6">يجب تسجيل الدخول لعرض إعدادات الهاتف</p>
          <a href="/api/login">
            <Button className="bg-red-600 hover:bg-red-700">تسجيل الدخول</Button>
          </a>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">خطأ في تحميل البيانات</p>
          <Button onClick={() => navigate("/phones")} variant="outline">
            العودة - Back
          </Button>
        </div>
      </div>
    );
  }

  if (!phone) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/phones")}
          className="text-gray-400 hover:text-white mb-6"
          data-testid="button-back"
        >
          <ArrowRight className="w-4 h-4 mr-2" />
          العودة - Back
        </Button>

        {/* Phone Name and DPI */}
        <Card className="bg-slate-800 border-red-500 rounded-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">
            {phone.brand} {phone.model}
          </h1>
          <div className="mt-4 flex items-center gap-4">
            <div>
              <p className="text-gray-400 text-sm">الـ DPI - DPI</p>
              <p className="text-5xl font-bold text-red-500">{phone.dpi}</p>
            </div>
          </div>
        </Card>

        {/* Sensitivity Settings */}
        <h2 className="text-2xl font-bold text-white mb-4">الإعدادات - Settings</h2>
        <div className="space-y-4">
          {[
            { key: "generalSensitivity", value: phone.generalSensitivity },
            { key: "redDotSensitivity", value: phone.redDotSensitivity },
            { key: "x2ScopeSensitivity", value: phone.x2ScopeSensitivity },
            { key: "x4ScopeSensitivity", value: phone.x4ScopeSensitivity },
            { key: "sniperScopeSensitivity", value: phone.sniperScopeSensitivity },
            { key: "freeLookSensitivity", value: phone.freeLookSensitivity },
          ].map(({ key, value }) => (
            <Card
              key={key}
              className="bg-slate-800 border-slate-700 p-4"
              data-testid={`setting-${key}`}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-white">
                  {SENSITIVITY_LABELS[key as keyof typeof SENSITIVITY_LABELS]}
                </p>
                <p className="text-2xl font-bold text-red-500">{value}</p>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-red-600 to-red-400 h-2 rounded-full"
                  style={{ width: `${(value / 100) * 100}%` }}
                ></div>
              </div>
            </Card>
          ))}
        </div>

        {/* Success Message */}
        <div className="mt-8 bg-gradient-to-r from-red-900 via-red-800 to-red-900 border-2 border-red-500 rounded-lg p-6 text-center">
          <h3 className="text-2xl font-bold text-red-100 mb-2">
            ستغيّر لعبك إلى الأبد! 🔥
          </h3>
          <p className="text-lg text-red-50 font-semibold">
            These Settings Will Change Your Game Forever!
          </p>
          <p className="text-sm text-red-200 mt-3">
            تطبيق هذه الإعدادات الآن ولاحظ الفرق في أدائك - Apply now and notice the difference in your gameplay
          </p>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-slate-800 border border-yellow-600 rounded-lg p-4">
          <p className="text-sm text-gray-300">
            ⚠️ هذه الإعدادات هي توصيات فقط وقد تحتاج إلى تعديلها حسب تفضيلاتك الشخصية.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            These settings are recommendations only and may need to be adjusted based on your preference.
          </p>
        </div>
      </div>
    </div>
  );
}
