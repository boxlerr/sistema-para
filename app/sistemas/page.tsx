import Link from "next/link";
import AdPlaceholder from "@/components/AdPlaceholder";

const SISTEMAS = [
  {
    id: 1,
    name: "HubSpot CRM",
    description: "Plataforma completa de CRM con herramientas de marketing, ventas, servicio de atención al cliente y gestión de contenido.",
    category: "CRM",
    tone: "indigo",
    logo: "H",
  },
  {
    id: 2,
    name: "Salesforce",
    description: "El CRM líder mundial que ayuda a las empresas a conectarse con sus clientes de una manera totalmente nueva.",
    category: "CRM",
    tone: "indigo",
    logo: "S",
  },
  {
    id: 3,
    name: "SAP ERP",
    description: "Software de planificación de recursos empresariales que integra los procesos de negocio clave y datos.",
    category: "ERP",
    tone: "teal",
    logo: "SA",
  },
  {
    id: 4,
    name: "QuickBooks",
    description: "Software de contabilidad para pequeñas y medianas empresas con potentes herramientas de facturación.",
    category: "Contabilidad",
    tone: "amber",
    logo: "Q",
  },
  {
    id: 5,
    name: "Workday",
    description: "Sistema en la nube para finanzas, recursos humanos y planificación en un solo sistema integral.",
    category: "RRHH",
    tone: "rose",
    logo: "W",
  },
  {
    id: 6,
    name: "Shopify",
    description: "Plataforma de comercio electrónico todo en uno para empezar, gestionar y hacer crecer un negocio.",
    category: "E-commerce",
    tone: "sky",
    logo: "SH",
  },
  {
    id: 7,
    name: "Mailchimp",
    description: "Plataforma de automatización de marketing que ayuda a compartir correos electrónicos y campañas publicitarias.",
    category: "Marketing",
    tone: "violet",
    logo: "M",
  },
  {
    id: 8,
    name: "Zendesk",
    description: "Software de servicio al cliente y CRM de ventas diseñado para crear mejores relaciones con los clientes.",
    category: "Soporte",
    tone: "indigo",
    logo: "Z",
  },
  {
    id: 9,
    name: "Notion",
    description: "Espacio de trabajo todo en uno para tus notas, tareas, wikis y bases de datos personalizadas.",
    category: "Productividad",
    tone: "teal",
    logo: "N",
  }
];

const TONE_CLASSES: Record<string, string> = {
  indigo: "bg-indigo-50 ring-indigo-100 text-indigo-700",
  teal: "bg-teal-50 ring-teal-100 text-teal-700",
  amber: "bg-amber-50 ring-amber-100 text-amber-700",
  rose: "bg-rose-50 ring-rose-100 text-rose-700",
  sky: "bg-sky-50 ring-sky-100 text-sky-700",
  violet: "bg-violet-50 ring-violet-100 text-violet-700",
};

export default function SistemasPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="md:flex md:items-end md:justify-between mb-12">
        <div className="max-w-2xl">
          <span className="eyebrow mb-4">Directorio de Software</span>
          <h1 className="mt-2 text-4xl font-heading font-bold tracking-tight text-slate-900 sm:text-5xl">
            Sistemas B2B
          </h1>
          <p className="mt-4 text-lg text-slate-600 leading-8">
            Explora nuestro catálogo completo de soluciones. Filtra por categoría, industria o tamaño de empresa para encontrar la herramienta perfecta.
          </p>
        </div>
        <div className="mt-6 md:mt-0 md:shrink-0">
           <form role="search" className="flex items-center gap-2">
             <input 
               type="search" 
               placeholder="Buscar sistemas..." 
               className="w-full sm:w-64 rounded-xl ring-1 ring-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
             />
             <button type="submit" className="btn-secondary whitespace-nowrap">
               Buscar
             </button>
           </form>
        </div>
      </div>

      <div className="mb-12">
        <AdPlaceholder size="leaderboard" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SISTEMAS.map((sistema) => (
          <Link href={`/sistemas/${sistema.id}`} key={sistema.id} className="card-modern flex flex-col h-full group">
            <div className="flex items-start gap-4 mb-4">
               <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-50 font-heading font-bold text-slate-400 text-xl ring-1 ring-slate-200 transition-colors group-hover:bg-white group-hover:text-indigo-600 group-hover:ring-indigo-100">
                 {sistema.logo}
               </div>
               <div className="pt-1">
                 <h3 className="text-lg font-heading font-bold text-slate-900 line-clamp-1">
                   {sistema.name}
                 </h3>
                 <div className="mt-2 flex flex-wrap gap-2">
                   <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${TONE_CLASSES[sistema.tone] || TONE_CLASSES.indigo}`}>
                     {sistema.category}
                   </span>
                 </div>
               </div>
            </div>
            
            <p className="text-sm text-slate-600 flex-grow mb-6 leading-relaxed">
              {sistema.description}
            </p>
            
            <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm font-semibold text-indigo-600 transition-colors group-hover:text-indigo-700 flex items-center">
                Ver sistema 
                <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </span>
              
              <div className="flex items-center gap-1 text-slate-400">
                <svg className="h-4 w-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-medium text-slate-600">4.8</span>
                <span className="text-xs text-slate-400">(124)</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-12 flex justify-center">
        <button className="btn-secondary">
          Cargar más sistemas
        </button>
      </div>
    </div>
  );
}
