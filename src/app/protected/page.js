"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProtectedPage() {
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
        <h1 className="text-3xl font-bold text-center">Halaman Terproteksi</h1>

        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Konten Khusus Pengguna</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Selamat datang di halaman terproteksi! Halaman ini hanya dapat diakses oleh pengguna yang sudah login.</p>
            <div className="mt-4">
              <p>
                <strong>Email:</strong> {session.user.email}
              </p>
              <p>
                <strong>Nama:</strong> {session.user.name}
              </p>
              <p>
                <strong>Token:</strong> {session.loggedUser?.substring(0, 20)}...
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
