import Image from "next/image";
import Link from "next/link";

const NAV = [
  { href: "/sistemas", label: "Sistemas" },
  { href: "/categorias", label: "Categorías" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-28 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="SistemasPara — Inicio" className="flex items-center">
          <Image
            src="/sistema-para-logo.png"
            alt="SistemasPara.com — El directorio B2B de sistemas y software para empresas"
            width={536}
            height={180}
            priority
            className="h-20 w-auto md:h-24"
          />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition duration-200 ease-out hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/agregar" className="btn-accent">
          Agregar Sistema
        </Link>
      </div>
    </header>
  );
}
