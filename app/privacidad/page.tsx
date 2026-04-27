import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidad | SistemasPara",
  description:
    "Cómo SistemasPara.com recopila, usa y protege tus datos personales.",
};

const LAST_UPDATED = "26 de abril de 2026";

export default function PrivacidadPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <header>
        <span className="eyebrow">Legal</span>
        <h1 className="mt-4 text-4xl font-heading font-bold tracking-tight text-slate-900 sm:text-5xl">
          Política de privacidad
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          Última actualización: {LAST_UPDATED}
        </p>
      </header>

      <article className="prose prose-slate mt-10 max-w-none prose-headings:font-heading prose-headings:tracking-tight prose-headings:text-slate-900 prose-a:text-indigo-600">
        <p>
          En <strong>SistemasPara.com</strong> (&ldquo;nosotros&rdquo;,
          &ldquo;el Sitio&rdquo;) respetamos tu privacidad. Este documento
          explica qué datos personales recopilamos, con qué finalidad, durante
          cuánto tiempo los conservamos y qué derechos tenés sobre ellos.
        </p>

        <h2>1. Responsable del tratamiento</h2>
        <p>
          El responsable de los datos personales tratados a través del Sitio
          es el equipo editorial de SistemasPara.com. Para cualquier consulta
          podés escribir a{" "}
          <a href="mailto:hola@sistemaspara.com">hola@sistemaspara.com</a>.
        </p>

        <h2>2. Qué datos recopilamos</h2>
        <ul>
          <li>
            <strong>Datos que vos nos das:</strong> nombre, email, nombre de
            tu producto, sitio web y descripción cuando completás el
            formulario de <em>Agregar tu sistema</em>.
          </li>
          <li>
            <strong>Datos de navegación:</strong> dirección IP, tipo de
            navegador, sistema operativo, páginas visitadas y tiempo de
            permanencia. Estos datos se anonimizan o agregan cuando es
            posible.
          </li>
          <li>
            <strong>Cookies y tecnologías similares:</strong> ver sección 5.
          </li>
        </ul>

        <h2>3. Finalidades del tratamiento</h2>
        <ul>
          <li>Operar el directorio y sus funcionalidades.</li>
          <li>
            Procesar las solicitudes de alta de listings, incluyendo
            facturación y cobro a través de pasarelas de pago.
          </li>
          <li>
            Medir la audiencia, analizar el uso del Sitio y mejorar la
            experiencia.
          </li>
          <li>
            Mostrar anuncios relevantes mediante Google AdSense (ver sección
            6).
          </li>
        </ul>

        <h2>4. Base legal</h2>
        <p>
          Tratamos tus datos sobre la base de tu <strong>consentimiento</strong>
          {" "}
          (cuando aceptás cookies o completás el formulario de alta), la{" "}
          <strong>ejecución de un contrato</strong> (procesar el pago de tu
          listing) y nuestro <strong>interés legítimo</strong> en operar y
          mejorar el Sitio.
        </p>

        <h2>5. Cookies</h2>
        <p>
          Utilizamos cookies propias y de terceros para fines técnicos,
          analíticos y publicitarios. Al ingresar al Sitio podés{" "}
          <strong>aceptar</strong> o <strong>rechazar</strong> las cookies no
          esenciales mediante el banner de consentimiento. Tu elección se
          guarda en tu navegador y podés modificarla en cualquier momento
          borrando las cookies del Sitio.
        </p>

        <h2>6. Servicios de terceros</h2>
        <p>
          Usamos servicios externos que pueden recibir o procesar datos
          tuyos:
        </p>
        <ul>
          <li>
            <strong>Google AdSense</strong>: muestra anuncios y puede usar
            cookies para personalización. Más info en{" "}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener"
            >
              Políticas de publicidad de Google
            </a>
            .
          </li>
          <li>
            <strong>Vercel Analytics</strong>: métricas de tráfico
            anonimizadas, sin cookies persistentes.
          </li>
          <li>
            <strong>Supabase</strong>: base de datos donde guardamos los
            envíos del formulario de alta.
          </li>
          <li>
            <strong>Mercado Pago</strong> (cuando esté activo): pasarela de
            pago para los listings premium. Procesa los datos de tarjeta y
            no los recibimos en nuestros servidores.
          </li>
        </ul>

        <h2>7. Conservación</h2>
        <p>
          Conservamos los datos de los formularios mientras tu listing siga
          activo y por un período adicional de 12 meses para cumplir
          obligaciones contables. Los datos analíticos se conservan en forma
          agregada.
        </p>

        <h2>8. Tus derechos</h2>
        <p>
          Tenés derecho a acceder, rectificar, eliminar, oponerte al
          tratamiento, limitar su uso y solicitar la portabilidad de tus
          datos personales. Para ejercerlos, escribinos a{" "}
          <a href="mailto:hola@sistemaspara.com">hola@sistemaspara.com</a>{" "}
          desde el email asociado a tu cuenta.
        </p>

        <h2>9. Seguridad</h2>
        <p>
          Aplicamos medidas técnicas y organizativas razonables (HTTPS, RLS
          en base de datos, control de accesos, cifrado de credenciales)
          para proteger los datos contra acceso, alteración o divulgación
          no autorizados.
        </p>

        <h2>10. Cambios a esta política</h2>
        <p>
          Podemos actualizar esta política para reflejar cambios legales o
          operativos. La fecha de &ldquo;última actualización&rdquo; al
          principio te indica la versión vigente. Los cambios sustanciales
          se notificarán también dentro del Sitio.
        </p>

        <h2>11. Contacto</h2>
        <p>
          Cualquier consulta sobre privacidad:{" "}
          <a href="mailto:hola@sistemaspara.com">hola@sistemaspara.com</a>.
        </p>
      </article>
    </div>
  );
}
