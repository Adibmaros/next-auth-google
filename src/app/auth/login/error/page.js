"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { XCircle } from "lucide-react";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  let errorMessage = "Terjadi kesalahan saat proses autentikasi.";

  if (error === "AccessDenied") {
    errorMessage = "Akses ditolak. Anda tidak memiliki izin untuk mengakses halaman ini.";
  } else if (error === "Configuration") {
    errorMessage = "Terjadi kesalahan konfigurasi. Silakan hubungi administrator.";
  } else if (error === "Verification") {
    errorMessage = "Link verifikasi email tidak valid atau sudah kadaluarsa.";
  }

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-red-600">Kesalahan Autentikasi</CardTitle>
          <CardDescription className="text-center">Maaf, terjadi kesalahan saat Anda mencoba masuk</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/auth/login">
            <Button>Kembali ke Halaman Login</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
