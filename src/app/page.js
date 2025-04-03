"use client";

import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <main className="flex flex-col items-center justify-center min-h-[50vh] space-y-8">
        <h1 className="text-3xl font-bold text-center">Autentikasi di Next.js menggunakan Next-Auth</h1>

        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">{loading ? "Memuat..." : session ? "Profil Pengguna" : "Autentikasi"}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            {loading && (
              <div className="w-full space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            )}

            {session && (
              <>
                <p className="text-lg font-medium mb-4">Selamat datang, {session.user.name ?? session.user.email}</p>

                {session.user.image ? (
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={session.user.image} alt="Foto profil" />
                    <AvatarFallback>{session.user.name?.[0] ?? session.user.email?.[0]}</AvatarFallback>
                  </Avatar>
                ) : (
                  <Avatar className="h-16 w-16">
                    <AvatarFallback>{session.user.name?.[0] ?? session.user.email?.[0]}</AvatarFallback>
                  </Avatar>
                )}
              </>
            )}

            {!session && !loading && <p className="text-lg text-center">Silakan masuk untuk melanjutkan</p>}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
