"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function NewUserPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading" || !session) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Header />
        <main className="flex justify-center items-center min-h-[50vh]">
          <p className="text-xl">Memuat...</p>
        </main>
      </div>
    );
  }

  const handleContinue = () => {
    router.push("/auth/dashboard");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <main className="flex flex-col items-center justify-center min-h-[50vh] space-y-8">
        <h1 className="text-3xl font-bold text-center">Selamat Datang di Aplikasi Kami!</h1>

        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Akun Baru Dibuat</CardTitle>
            <CardDescription className="text-center">Terima kasih telah bergabung dengan kami</CardDescription>
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

            <div className="text-center mt-4">
              <p>Akun Anda berhasil dibuat. Anda sekarang dapat mengakses semua fitur aplikasi kami.</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={handleContinue}>Lanjutkan ke Dashboard</Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
