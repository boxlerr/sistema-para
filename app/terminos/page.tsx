import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos de servicio | SistemasPara",
  description:
    "Condiciones de uso del directorio SistemasPara.com y de las suscripciones de listing.",
};

const LAST_UPDATED = "26 de abril de 2026";

export default function TerminosPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <header>
        <span className="eyebrow">Legal</span>
        <h1 className="mt-4 text-4xl font-heading font-bold tracking-tight text-slate-900 sm:text-5xl">
          Términos de servicio
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          Última actualización: {LAST_UPDATED}
        </p>
      </header>

      <article className="prose prose-slate mt-10 max-w-none prose-headings:font-heading prose-headings:tracking-tight prose-headings:text-slate-900 prose-a:text-indigo-600">
        <p>
          Estos Términos rigen el uso de <strong>SistemasPara.com</strong>{" "}
          (el &ldquo;Sitio&rdquo;) y de las suscripciones de listing pagas
          ofrecidas a través del mismo. Al acceder al Sitio, aceptás estos
          Términos.
        </p>

        <h2>1. Naturaleza del Sitio</h2>
        <p>
          SistemasPara.com es un directorio editorial de software B2B. Las
          comparativas y guías son producidas con asistencia de inteligencia
          artificial y revisadas a partir de fuentes públicas. La información
          tiene fines informativos y no constituye recomendación profesional
          de ningún tipo.
        </p>

        <h2>2. Listings de proveedores</h2>
        <h3>2.1 Alta y aprobación</h3>
        <p>
          Cualquier proveedor puede solicitar el alta de su producto a través
          de <a href="/agregar">/agregar</a>. Nos reservamos el derecho de
          rechazar solicitudes que: contengan información falsa, infrinjan
          derechos de terceros, promuevan productos ilegales o no se ajusten
          a la línea editorial del Sitio.
        </p>

        <h3>2.2 Planes y precios</h3>
        <p>
          Los listings se ofrecen en planes mensuales (Listado, Pro,
          Featured) cuyos precios y beneficios figuran en la página de alta.
          Los precios pueden actualizarse con un aviso previo de 30 días para
          listings activos.
        </p>

        <h3>2.3 Cobro y reembolsos</h3>
        <p>
          El cobro se realiza a través de la pasarela Mercado Pago. La
          suscripción se renueva automáticamente cada mes. Podés cancelarla
          en cualquier momento escribiendo a{" "}
          <a href="mailto:hola@sistemaspara.com">hola@sistemaspara.com</a>;
          el listing permanecerá activo hasta el final del período pago.
          Salvo error en el cobro, no realizamos reembolsos parciales.
        </p>

        <h3>2.4 Contenido y exactitud</h3>
        <p>
          El proveedor garantiza que toda la información provista (nombre,
          descripción, capturas, logos) es veraz, propia o cuenta con
          autorización para ser usada. Nos otorga una licencia no exclusiva,
          mundial y libre de regalías para mostrar dicho contenido en el
          Sitio mientras dure la suscripción.
        </p>

        <h2>3. Uso del Sitio</h2>
        <ul>
          <li>
            No está permitido scrapear, replicar masivamente o redistribuir
            el contenido sin autorización escrita.
          </li>
          <li>
            No está permitido enviar tráfico artificial o automatizado a
            anuncios.
          </li>
          <li>
            No está permitido alterar, dañar o intentar acceder no
            autorizadamente a la infraestructura del Sitio.
          </li>
        </ul>

        <h2>4. Publicidad de terceros</h2>
        <p>
          El Sitio muestra anuncios de Google AdSense u otros redes
          publicitarias. No respaldamos ni controlamos el contenido de
          dichos anuncios y no nos hacemos responsables por las relaciones
          que entables con los anunciantes.
        </p>

        <h2>5. Propiedad intelectual</h2>
        <p>
          La marca <em>SistemasPara</em>, el diseño del Sitio, los textos
          editoriales y los gráficos son propiedad del equipo editorial.
          Las marcas y logotipos de los productos listados pertenecen a sus
          respectivos titulares y se usan con fines descriptivos al amparo
          del uso leal.
        </p>

        <h2>6. Responsabilidad</h2>
        <p>
          El Sitio se ofrece &ldquo;tal cual&rdquo;. En la máxima medida
          permitida por la ley, no garantizamos que las recomendaciones
          editoriales se ajusten a las necesidades particulares de tu
          empresa. No somos responsables por daños indirectos derivados del
          uso de la información.
        </p>

        <h2>7. Modificaciones</h2>
        <p>
          Podemos modificar estos Términos publicando una nueva versión en
          esta página. Si los cambios son sustanciales, los notificaremos
          dentro del Sitio o por email a los listings activos.
        </p>

        <h2>8. Ley aplicable y jurisdicción</h2>
        <p>
          Estos Términos se rigen por la ley argentina. Cualquier
          controversia se someterá a los tribunales ordinarios de la Ciudad
          Autónoma de Buenos Aires, salvo que la normativa de defensa del
          consumidor disponga lo contrario.
        </p>

        <h2>9. Contacto</h2>
        <p>
          Para consultas sobre estos Términos:{" "}
          <a href="mailto:hola@sistemaspara.com">hola@sistemaspara.com</a>.
        </p>
      </article>
    </div>
  );
}
