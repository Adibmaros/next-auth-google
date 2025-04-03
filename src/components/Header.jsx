'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="w-full py-4 border-b">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Next-Auth Demo
        </Link>
        
        <nav className="flex gap-4 items-center">
          <Link href="/" className="hover:text-blue-600">
            Beranda
          </Link>
          
          <Link href="/protected" className="hover:text-blue-600">
            Halaman Terproteksi
          </Link>
          
          {session ? (
            <Button
              variant="outline"
              onClick={() => signOut({ callbackUrl: '/auth/login' })}
            >
              Keluar
            </Button>
          ) : (
            <Button
              onClick={() => signIn('google')}
            >
              Masuk dengan Google
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}