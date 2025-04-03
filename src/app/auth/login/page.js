"use client";

import { signIn } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Masuk ke Akun</CardTitle>
          <CardDescription className="text-center">Silakan masuk menggunakan akun Google Anda</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button size="lg" onClick={() => signIn("google", { callbackUrl: "/auth/dashboard" })}>
            Masuk dengan Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
