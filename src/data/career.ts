export const careerFaq = [
  {
    id: 'empleabilidad',
    question: '¿Cómo puede ayudarme el curso a encontrar empleo o progresar profesionalmente?',
    paragraphs: [
      'Puede ayudarte a mostrar una especialización en búsqueda, contraste y documentación de información pública dentro de tu perfil jurídico. Estas competencias son aplicables a litigación, investigación societaria, prevención del fraude, compliance y derecho digital.',
      'Su valor se entiende mejor cuando puedes explicar qué sabes hacer y mostrar un ejemplo de trabajo con fuentes trazables. El certificado complementa tu formación y experiencia: no garantiza contratación, ascenso ni una mejora salarial y no sustituye una habilitación profesional.',
    ],
    examples: [],
    skills: [],
  },
  {
    id: 'cv-osint',
    question: '¿Cómo incorporo el curso y el certificado a mi CV de abogado?',
    paragraphs: [
      'Añádelo en Formación complementaria y utiliza la denominación y la entidad emisora que figuren en el certificado recibido. Si aún estás estudiando, indica «en curso». No presentes la formación como una titulación oficial ni como una acreditación de COEINF mientras esas condiciones no estén confirmadas.',
      'Destaca competencias y tareas que realmente hayas practicado. Puedes preparar un proyecto formativo con datos simulados: una investigación societaria breve, un registro de fuentes y un informe que distinga hallazgos, hipótesis y límites. No incluyas datos confidenciales de clientes.',
    ],
    examples: [
      {label: 'Formación complementaria',text: 'Curso OSINT para abogados — iTR+ · En curso / mes y año de finalización. Añade el certificado solo cuando lo hayas obtenido.'},
      {label: 'Ejemplo de proyecto, si lo has realizado',text: 'Investigación de sociedades mediante fuentes abiertas: búsqueda y contraste documental, registro de procedencia y elaboración de un informe OSINT con limitaciones expresas.'},
    ],
    skills: [],
  },
  {
    id: 'linkedin-osint',
    question: '¿Cómo actualizo mi LinkedIn: titular, extracto, aptitudes y palabras clave?',
    paragraphs: [
      'Mantén tu especialidad jurídica en primer plano y añade OSINT como competencia complementaria. Elige un titular acorde con tu experiencia y tu situación profesional. En Acerca de, explica el tipo de información que sabes localizar, cómo la contrastas y cómo documentas sus límites.',
      'Cuando lo obtengas, registra el certificado en Licencias y certificaciones con su nombre y emisor exactos. Añade una fecha y un identificador solo si figuran en el documento; enlaza a una verificación únicamente si existe. Puedes incluir un proyecto simulado en Destacado y compartir lo aprendido sin revelar datos de casos reales.',
    ],
    examples: [
      {label: 'Titular para litigación',text: 'Abogado/a | Litigación civil y mercantil | Investigación en fuentes abiertas (OSINT)'},
      {label: 'Titular para derecho digital',text: 'Abogado/a | Derecho digital y privacidad | Verificación de información y análisis de huella digital'},
      {label: 'Extracto adaptable a tus competencias reales',text: 'Complemento mi práctica jurídica con técnicas OSINT para localizar y contrastar información pública, analizar relaciones societarias y documentar hallazgos con fuentes trazables y respeto a la privacidad.'},
    ],
    skills: ['OSINT', 'Inteligencia de fuentes abiertas', 'Búsqueda avanzada de información pública', 'Verificación de fuentes', 'Investigación societaria', 'Análisis de huella digital', 'Investigación en redes sociales', 'Elaboración de informes OSINT'],
  },
] as const;
