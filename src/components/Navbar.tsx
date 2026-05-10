'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#fddfa2] shadow-md px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 no-underline text-[#103569] font-bold text-xl">
        <Image
          src="/imgs/misc/logo.png"
          alt="ClickServiço"
          width={35}
          height={35}
          className="object-contain"
        />
        <span>ClickServiço</span>
      </Link>

      {/* Nav Links */}
      <div className="flex items-center gap-6">
        <Link href="/categorias" className="text-[#0b2545] font-medium hover:underline no-underline">
          Explorar
        </Link>
        <Link href="/seja-profissional" className="text-[#0b2545] font-medium hover:underline no-underline">
          Trabalhe Conosco
        </Link>
        <Link href="/login" className="bg-[#0b2545] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#103569] transition-colors no-underline">
          Entrar
        </Link>
      </div>
    </nav>
  );
}
