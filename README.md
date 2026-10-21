# iTR+ · Curso OSINT para abogados

Landing estática Astro con React y TypeScript, Tailwind v4, Motion y escena Three.js diferida. Todo el contenido comercial esencial está en HTML; el programa y FAQ funcionan sin JavaScript. Expediente simulado accesible, selector jurídico, planificación orientativa y PDF real de 38 lecciones generado desde los mismos datos.

## Desarrollo

Node 24, npm. En este entorno: `npm ci --cache /workspace/.npm-cache`. Después: `npm run dev`. `npm run check` valida tipos; `npm run build` genera PDF y dist; `npm run preview` sirve el resultado. `npm test` ejecuta Chromium y axe (configurado /usr/bin/chromium; adaptar executablePath en otras máquinas). `node scripts/assets.mjs` regenera la imagen social. `npm run audit` requiere preview activo en 4321. No hay secretos requeridos.

## Contenido y operación

Datos en src/data; enlaces Odoo en src/lib/links.ts. Analítica desactivada, sin formulario local ni cookies de marketing. Precio y estrategia solo en docs, que nunca debe desplegarse. Preview noindex por defecto; copia .env.example y configura dominio real antes de producción. dist es el único directorio publicable.

Consulta docs/trazabilidad-contenido.md, docs/fuentes-y-verificaciones.md, docs/medicion-y-odoo.md y docs/despliegue.md. Faltan dominio final, identidad/documentos legales y confirmación de condiciones comerciales señaladas; no impiden desarrollo ni preview, pero sí una publicación definitiva responsable. No se ha publicado ni modificado Odoo.
