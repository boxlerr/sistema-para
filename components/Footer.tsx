import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Logo and Tagline Column */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block">
              <Logo showDomain={true} />
            </Link>
            <p className="mt-4 text-sm text-slate-500 max-w-xs">
              El directorio B2B de sistemas y software para empresas.
            </p>
          </div>

          {/* Producto */}
          <div>
            <h3 className="font-heading font-semibold text-slate-900 mb-4">Producto</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/sistemas" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">
                  Explorar sistemas
                </Link>
              </li>
              <li>
                <Link href="/categorias" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">
                  Categorías
                </Link>
              </li>
              <li>
                <Link href="/empresas" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">
                  Empresas
                </Link>
              </li>
              <li>
                <Link href="/agregar" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">
                  Agregar sistema
                </Link>
              </li>
            </ul>
          </div>

          {/* Industrias */}
          <div>
            <h3 className="font-heading font-semibold text-slate-900 mb-4">Industrias</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/categorias/retail" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">
                  Retail
                </Link>
              </li>
              <li>
                <Link href="/categorias/salud" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">
                  Salud
                </Link>
              </li>
              <li>
                <Link href="/categorias/manufactura" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">
                  Manufactura
                </Link>
              </li>
              <li>
                <Link href="/categorias/finanzas" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">
                  Finanzas
                </Link>
              </li>
            </ul>
          </div>

          {/* Recursos & Legal */}
          <div>
            <h3 className="font-heading font-semibold text-slate-900 mb-4">Recursos y Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/blog" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/guias" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">
                  Guías de compra
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">
                  Términos de servicio
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-sm text-slate-600 hover:text-indigo-600 transition-colors">
                  Privacidad
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} SistemasPara.com. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
             {/* Social links placehoders */}
             <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
               <span className="sr-only">Twitter</span>
               <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                 <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
               </svg>
             </a>
             <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
               <span className="sr-only">LinkedIn</span>
               <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                 <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
               </svg>
             </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
