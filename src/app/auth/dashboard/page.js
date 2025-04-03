"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="container mx-auto px-4 py-8">
        <Header />
        <main className="flex justify-center items-center min-h-[50vh]">
          <p className="text-xl">Memuat...</p>
        </main>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <main className="flex flex-col items-center justify-center min-h-[50vh] space-y-8">
        <h1 className="text-3xl font-bold text-center">Dashboard Pengguna</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Profil Anda</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={session.user.image} alt="Foto profil" />
                <AvatarFallback>{session.user.name?.[0] ?? session.user.email?.[0]}</AvatarFallback>
              </Avatar>

              <div className="text-center">
                <h3 className="text-xl font-bold">{session.user.name}</h3>
                <p className="text-gray-500">{session.user.email}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informasi Sesi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <strong>Status:</strong> Aktif
                </p>
                <p>
                  <strong>Login Terakhir:</strong> {new Date().toLocaleString("id-ID")}
                </p>
                <p>
                  <strong>Token:</strong>
                  <span className="ml-2 p-1 bg-gray-100 rounded text-xs overflow-hidden truncate block">{session.loggedUser}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
