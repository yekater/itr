export const nodes=['Sociedad A (simulada)','Sociedad B (simulada)','Persona 01 (simulada)','Documento 01 (simulado)'];
export const sources=[
 {id:'F01',title:'Ficha registral simulada',type:'Registro público simulado',date:'2026-09-01',ref:'fuente01.example.invalid',finding:'Persona 01 figura como administradora de Sociedad A.',limit:'No acredita un vínculo con Sociedad B.'},
 {id:'F02',title:'Anuncio societario simulado',type:'Anuncio público simulado',date:'2026-09-02',ref:'fuente02.example.invalid',finding:'Documento 01 menciona a Sociedad A y Sociedad B en una operación.',limit:'Una mención conjunta no demuestra control societario.'},
 {id:'F03',title:'Perfil profesional simulado',type:'Perfil público simulado',date:'2026-09-03',ref:'fuente03.example.invalid',finding:'Persona 01 declara colaboración con Sociedad B.',limit:'Información autodeclarada, pendiente de verificación independiente.'}
] as const;
