// Fuentes primarias leídas el 22/10/2026. Contexto internacional, no resultados de iTR+.
export const employmentEvidence = {
  checkedAt: '22 de octubre de 2026',
  blsUrl: 'https://www.bls.gov/ooh/computer-and-information-technology/information-security-analysts.htm',
  ukUrl: 'https://www.gov.uk/government/publications/cyber-security-skills-in-the-uk-labour-market-2026/cyber-security-skills-in-the-uk-labour-market-2026',
  metrics: [
    {
      figure: '21 %',
      title: 'crecimiento del empleo proyectado',
      scope: 'Estados Unidos · Analistas de seguridad de la información · 2025–2035',
      explanation: 'Es una proyección de crecimiento de una ocupación técnica durante diez años, no una tasa de contratación de personas con un certificado OSINT.',
      source: 'BLS · Occupational Outlook Handbook · Job Outlook',
      url: 'https://www.bls.gov/ooh/computer-and-information-technology/information-security-analysts.htm',
    },
    {
      figure: '14.100',
      title: 'aperturas de empleo al año, en promedio',
      scope: 'Estados Unidos · Analistas de seguridad de la información · Proyección 2025–2035',
      explanation: 'Incluye aperturas por sustitución de trabajadores. No es un recuento de vacantes abiertas hoy ni de puestos para abogados con OSINT.',
      source: 'BLS · Occupational Outlook Handbook · Job Outlook',
      url: 'https://www.bls.gov/ooh/computer-and-information-technology/information-security-analysts.htm',
    },
    {
      figure: '34.932',
      title: 'anuncios de puestos centrados en ciberseguridad',
      scope: 'Reino Unido · Enero–diciembre de 2025 · Informe publicado en 2026',
      explanation: 'El informe analiza anuncios online de puestos cuya función principal es la ciberseguridad, con datos de Lightcast. Los anuncios no equivalen a contrataciones ni a oportunidades exclusivamente jurídicas u OSINT.',
      source: 'Gobierno británico / DSIT · Informe 2026 · Apartado 4.1',
      url: 'https://www.gov.uk/government/publications/cyber-security-skills-in-the-uk-labour-market-2026/cyber-security-skills-in-the-uk-labour-market-2026',
    },
  ],
} as const;
