'use client';

import React from 'react';

export function Footer() {
  return (
    <footer className="w-full text-center bg-[#fce9b0] py-4 font-semibold text-gray-700 mt-auto border-t border-[#e5c870] shadow-inner md:py-6">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <p className="text-sm tracking-wide md:text-base">
          © {new Date().getFullYear()} ClickServiço - Conectando profissionais e clientes.
        </p>
      </div>
    </footer>
  );
}
