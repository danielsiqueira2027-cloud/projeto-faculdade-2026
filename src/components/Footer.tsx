'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Estilo base dos links do footer com animação de escala no hover
const footerLinkStyle: React.CSSProperties = {
  color: 'rgba(255,255,255,0.8)',
  textDecoration: 'none',
  fontSize: '0.95rem',
  display: 'inline-block',
  marginBottom: 10,
  transition: 'transform 0.2s ease, color 0.2s ease',
};

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <Link
      href={href}
      style={footerLinkStyle}
      className="hover:text-white hover:scale-105 no-underline block"
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.07)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
    >
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="w-full" style={{ backgroundColor: '#103569', padding: '50px 0', color: '#fff' }}>
      <div className="mx-auto" style={{ width: '90%', maxWidth: 1300 }}>
        <div className="flex justify-between items-start flex-wrap gap-12 mb-8">

          {/* Sobre */}
          <div className="flex flex-col min-w-[150px]">
            <h3 className="font-semibold uppercase mb-4" style={{ fontSize: '1.15rem' }}>Sobre</h3>
            <FooterLink href="/quem-somos">Quem Somos</FooterLink>
            <FooterLink href="/missao">Missão</FooterLink>
          </div>

          {/* Contato */}
          <div className="flex flex-col min-w-[200px]">
            <h3 className="font-semibold uppercase mb-4" style={{ fontSize: '1.15rem' }}>Contato</h3>
            <FooterLink href="tel:+551940028922">📞 (19) 4002-8922</FooterLink>
            <FooterLink href="mailto:contato@cs.com">📧 contato@cs.com</FooterLink>
            <FooterLink href="#">Atendimento</FooterLink>
          </div>

          {/* Pagamento */}
          <div className="flex flex-col min-w-[150px]">
            <h3 className="font-semibold uppercase mb-4" style={{ fontSize: '1.15rem' }}>Pagamento</h3>
            <div className="flex items-center gap-4">
              {['mastercard', 'visa', 'pix'].map((icon) => (
                <div key={icon} className="relative" style={{ width: 42, height: 42 }}>
                  <Image src={`/imgs/icons/${icon}.png`} alt={icon} fill className="object-contain" />
                </div>
              ))}
            </div>
          </div>

          {/* Siga-nos */}
          <div className="flex flex-col min-w-[120px]">
            <h3 className="font-semibold uppercase mb-4" style={{ fontSize: '1.15rem' }}>Siga-nos</h3>
            <div className="flex items-center gap-4">
              {[{ name: 'instagram', label: 'Instagram' }, { name: 'linkedin', label: 'LinkedIn' }].map(({ name, label }) => (
                <a
                  key={name}
                  href="#"
                  aria-label={label}
                  className="relative block"
                  style={{ width: 42, height: 42, transition: 'transform 0.2s ease' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
                >
                  <Image src={`/imgs/icons/${name}.png`} alt={label} fill className="object-contain" />
                </a>
              ))}
            </div>
          </div>

          {/* Baixar App */}
          <div className="flex flex-col min-w-[180px]">
            <h3 className="font-semibold uppercase mb-4" style={{ fontSize: '1.15rem' }}>Baixar App</h3>
            <div className="flex flex-col gap-3 items-start">
              {[
                { src: '/imgs/icons/googleplay.png', alt: 'Google Play', w: 564, h: 168 },
                { src: '/imgs/icons/apple.png', alt: 'App Store', w: 1201, h: 356 },
              ].map(({ src, alt, w, h }) => (
                <a
                  key={alt}
                  href="#"
                  style={{ transition: 'transform 0.2s ease', display: 'block', width: 155 }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
                >
                  <Image
                    src={src}
                    alt={alt}
                    width={w}
                    height={h}
                    unoptimized
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </a>
              ))}
            </div>
          </div>

        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: 16, textAlign: 'center' }}>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
            © {new Date().getFullYear()} ClickServiço — Conectando profissionais e clientes.
          </p>
        </div>
      </div>
    </footer>
  );
}
