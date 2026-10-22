import {courseFormat} from './course-format';
export const CORPORATE_URL = 'https://perinfor.odoo.com/itr-principal';
export const COURSE_URL = 'https://perinfor.odoo.com/slides/acreditacion-tecnico-especialista-en-analisis-forense-en-la-web-10';
export const duration = 'Carga formativa estimada de 60 horas, según el programa facilitado, incluyendo práctica: 20 teóricas y 40 prácticas.';
export const durationNote = 'El tiempo configurado actualmente en la plataforma es de 15 h 10 min; consulta la dedicación y planificación vigentes.';
export const certification = 'La formación contempla un certificado final. La referencia a COEINF, la entidad emisora, el visado y su denominación y alcance están pendientes de confirmación. No se presenta como una titulación oficial ni garantiza la admisión judicial de informes.';
export const specialties = [
 ['Litigación civil y mercantil','Mejora la prueba documental y la diligencia investigadora en pleitos.','Localiza un documento público y registra su procedencia antes de incorporarlo al análisis.'],
 ['Conflictos societarios','Analiza estructuras societarias y movimientos patrimoniales.','Contrasta cargos y fechas en fuentes mercantiles antes de inferir una relación.'],
 ['Derecho digital y privacidad','Localiza fuentes públicas preservando cumplimiento normativo.','Delimita la finalidad y minimiza los datos recogidos en un perfil público.'],
 ['Penal económico','Apoya diligencias preliminares con análisis de evidencias abiertas.','Separa los indicios documentados de las hipótesis pendientes de contraste.']
] as const;
export const benefits = [
 ['Investigación de sociedades','Mapea estructuras empresariales y relaciones societarias con fuentes públicas.','Investigación de empresas y administradores e investigación empresarial mediante fuentes abiertas para preparar diligencias.'],
 ['Localización de información','Localiza prensa, actas y datos regulatorios relevantes para el caso.','Búsqueda avanzada de información pública: operadores, documentos y selección de fuentes fiables.'],
 ['Análisis de identidades','Reconstruye huellas digitales y conexiones entre personas y empresas.','Análisis de huella digital e investigación de personas en internet, siempre con fuentes públicas, finalidad legítima y respeto a la privacidad.'],
 ['Documentación probatoria','Genera informes estructurados y verificables para estrategias jurídicas.','Elaboración de informes OSINT: organiza resultados, registra fuentes y distingue información, indicio, hipótesis y prueba.']
] as const;
export const learning = [
 ['Metodología OSINT','Enfoque práctico, legal y reproducible para la investigación digital.'],
 ['Búsquedas avanzadas','Técnicas de Google y operadores avanzados para resultados precisos.'],
 ['Investigación en redes sociales','Extracción y análisis de perfiles públicos, hilos y conexiones relevantes, con accesos autorizados.'],
 ['Investigación societaria','Investigación de sociedades mercantiles: fuentes mercantiles, registros y análisis de relaciones empresariales.'],
 ['Seguridad y Deep Web','Buenas prácticas para proteger al investigador y preservar pruebas. Deep Web no equivale a actividad delictiva ni implica acceso a contenido privado.'],
 ['Herramientas y geolocalización','Herramientas OSINT para profesionales jurídicos: uso práctico de herramientas open-source y localización geográfica.'],
 ['Elaboración de informes','Formatea hallazgos con trazabilidad y estándares útiles para tribunales, sin garantizar su admisibilidad.']
] as const;
export const faq = [
 ['¿Necesito conocimientos previos?','No. El curso parte de un nivel básico y sube a prácticas avanzadas.'],
 ['¿Cuál es la duración efectiva?', duration+' '+durationNote+' Esta carga es orientativa, no un plazo de finalización. '+courseFormat.pace],
 ['¿La certificación es oficial?','No se presenta como título oficial. La referencia a COEINF y las condiciones del certificado están pendientes de confirmación; consulta la información vigente en iTR+.'],
 ['¿Cómo aplicar lo aprendido?','Plantillas y formatos para integrar hallazgos en informes jurídicos. La obtención y aportación de cada evidencia exige valorar sus límites legales y técnicos.'],
 ['¿Cómo se desarrolla la formación?',courseFormat.mode+' '+courseFormat.materials+' Estudias los siete módulos, trabajas las actividades y realizas los cuestionarios y la evaluación final. '+courseFormat.support],
 ['¿Qué incluye la formación?',courseFormat.materials+' Incluye actividades, cuestionarios, evaluación final, soporte técnico y el foro de consulta. La formación contempla un certificado final en las condiciones indicadas.'],
 ['¿Puedo preguntar al creador y al mentor del curso?','Sí. '+courseFormat.support+' El estudio autónomo no significa estudiar sin un lugar donde resolver dudas: puedes utilizar el foro para consultar los contenidos y las actividades.'],
 ['¿Es compatible con trabajar a jornada completa?',courseFormat.work],
 ['¿Me quedaré con los materiales después de terminar?','Sí. '+courseFormat.access+' Puedes volver a consultar los PDF, los enlaces a vídeos y los recursos del curso cuando los necesites.'],
 ['¿Para quién es este curso de investigación digital para abogados?','Principalmente para abogados y pasantes de despachos pequeños y medianos. También resulta de interés para estudiantes, investigadores privados habilitados, consultores antifraude, profesionales digitales y peritos informáticos. No confiere habilitación profesional adicional.'],
 ['¿Dónde consulto las condiciones y el acceso?','La ficha de iTR+ recoge la información completa y las condiciones vigentes. El acceso a la plataforma y la matrícula pueden requerir identificación y pasos adicionales.']
] as const;
