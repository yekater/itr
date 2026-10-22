import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {readFileSync} from 'node:fs';
test('HTML, enlaces y PDF sin JavaScript',async({browser,request})=>{
 const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();await page.goto('/');await expect(page.locator('h1')).toHaveCount(1);await expect(page.locator('[data-module]')).toHaveCount(7);await page.locator('[data-module] summary').first().click();await expect(page.getByText('¿Qué es OSINT?',{exact:false}).first()).toBeVisible();await expect(page.locator('[data-module] li')).toHaveCount(38);await page.locator('.faq-item summary').first().click();await expect(page.getByText('No. El curso parte')).toBeVisible();
 for(const link of await page.locator('a[href*="perinfor.odoo.com"]').all()){const url=new URL((await link.getAttribute('href'))!);expect(url.hostname).toBe('perinfor.odoo.com');expect(['/itr-principal','/slides/acreditacion-tecnico-especialista-en-analisis-forense-en-la-web-10']).toContain(url.pathname);const text=await link.innerText();if(/Solicit|Contactar/.test(text))expect(url.pathname).toBe('/itr-principal');}
 const html=readFileSync('dist/index.html','utf8');expect(html).not.toMatch(/\b(?:540|445)(?:[.,]00)?\s*(?:€|EUR)|€|"Offer"|priceValidUntil/);const pdf=await request.get('/downloads/programa-osint-abogados.pdf');expect(pdf.ok()).toBeTruthy();expect((await pdf.body()).subarray(0,5).toString()).toBe('%PDF-');await context.close();
});
test('expediente, descarga, selector y planificación',async({page})=>{await page.goto('/');await page.locator('.case').scrollIntoViewIfNeeded();await page.getByRole('button',{name:'02 Contrastar'}).click();await expect(page.getByText('Hipótesis: una relación')).toBeVisible();await page.getByRole('button',{name:'Crear registro'}).click();await expect(page.getByRole('heading',{name:'03 / Registro del informe'})).toBeVisible();const download=page.waitForEvent('download');await page.getByRole('link',{name:'Descargar registro'}).click();expect((await download).suggestedFilename()).toBe('registro-fuentes-simuladas.txt');await page.locator('.audience-grid').scrollIntoViewIfNeeded();await expect(page.locator('astro-island[component-url*=Audience]')).not.toHaveAttribute('ssr');await page.getByRole('button',{name:/Conflictos societarios/}).click();await expect(page.locator('.example')).toContainText('Contrasta cargos');await page.locator('#hours').scrollIntoViewIfNeeded();await expect(page.locator('astro-island[component-url*=Planner]')).not.toHaveAttribute('ssr');await page.locator('#hours').fill('10');await expect(page.locator('.planner')).toContainText('6 semanas');await page.locator('#hours').fill('0');await expect(page.locator('.planner')).toContainText('Introduce un número');});
test('puntero, retorno, movimiento reducido y fallback',async({page})=>{const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');await page.waitForTimeout(900);await page.mouse.move(1100,300);await page.waitForTimeout(500);const moved=await page.locator('.hero-art').evaluate(e=>getComputedStyle(e).transform);expect(moved).not.toBe('none');await page.mouse.move(10,10);await page.waitForTimeout(1200);const reset=await page.locator('.hero-art').evaluate(e=>getComputedStyle(e).transform);expect(reset).not.toBe(moved);await page.emulateMedia({reducedMotion:'reduce'});await page.mouse.move(1000,400);await expect(page.locator('.hero-art')).toHaveCSS('transform','none');expect(errors).toEqual([]);});
test('responsive y accesibilidad',async({page})=>{await page.goto('/');for(const width of [320,360,390,768,1024,1440,1920]){await page.setViewportSize({width,height:900});await page.screenshot({path:`docs/qa-${width}.png`,fullPage:true});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();}await page.setViewportSize({width:390,height:700});const results=await new AxeBuilder({page}).analyze();expect(results.violations).toEqual([]);await page.locator('.mobile-menu summary').click();await expect(page.getByRole('navigation',{name:'Navegación móvil'})).toBeVisible();await page.keyboard.press('Escape');await expect(page.locator('.mobile-menu')).not.toHaveAttribute('open');});
test('fallback sin WebGL, teclado y sin analítica externa',async({browser})=>{const context=await browser.newContext({viewport:{width:1024,height:500}});await context.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(this:HTMLCanvasElement,type:string,...args:unknown[]){if(type.includes('webgl'))return null;return (original as Function).apply(this,[type,...args])} as typeof original});const page=await context.newPage();const requests:string[]=[];page.on('request',r=>requests.push(r.url()));await page.goto('/');await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Saltar al contenido'})).toBeFocused();await expect(page.locator('.investigation-scene')).toBeVisible();await page.locator('.case').scrollIntoViewIfNeeded();await expect(page.locator('astro-island[component-url*=EvidenceCase]')).not.toHaveAttribute('ssr');const node=page.getByRole('button',{name:/Sociedad B \(simulada\)/});await node.focus();await page.keyboard.press('Enter');await expect(node).toHaveAttribute('aria-pressed','true');expect(requests.filter(u=>!u.startsWith('http://127.0.0.1:4321'))).toEqual([]);expect(await page.evaluate(()=>({cookies:document.cookie,local:localStorage.length,session:sessionStorage.length}))).toEqual({cookies:'',local:0,session:0});await context.close();});
test('expresiones SEO y orden editorial en HTML',async({page})=>{await page.goto('/');const html=await page.content();const text=await page.locator('body').textContent();for(const phrase of ['Curso OSINT para abogados','OSINT aplicado al ámbito jurídico','Investigación digital para abogados','Investigación de personas en internet','Investigación de sociedades mercantiles','Investigación de empresas y administradores','Análisis de huella digital','Investigación en redes sociales','Inteligencia de fuentes abiertas','Técnicas OSINT para abogados','Herramientas OSINT para profesionales jurídicos','Búsqueda avanzada de información pública','Investigación empresarial mediante fuentes abiertas','Elaboración de informes OSINT','Curso de investigación digital para abogados'])expect(text!.toLocaleLowerCase()).toContain(phrase.toLocaleLowerCase());expect(await page.locator('main>section').evaluateAll(nodes=>nodes.map(n=>n.id))).toEqual(['inicio','aplicaciones','para-quien','programa','formacion','aplicacion-profesional','certificacion','preguntas','informacion']);expect(html).not.toMatch(/\b(?:540|445)(?:[.,]00)?\s*(?:€|EUR)|€|"Offer"|priceValidUntil/);});
test('hero de investigación, tipografías corporativas y control de animación',async({page})=>{
 await page.goto('/');
 await page.evaluate(()=>document.fonts.ready);
 await expect(page.locator('.investigation-scene')).toBeVisible();
 await expect(page.locator('.investigation-scene text')).toHaveCount(0);
 await expect(page.getByText('Conectar los indicios.',{exact:true})).toHaveCount(0);
 await expect(page.locator('.investigation-scene .source-card')).toHaveCount(3);
 await expect(page.locator('.investigation-scene .investigation-report')).toHaveCount(1);
 const fonts=await page.evaluate(()=>({
   inter:document.fonts.check('16px Inter'),plex:document.fonts.check('16px "IBM Plex Sans"'),
   heading:getComputedStyle(document.querySelector('h1')!).fontFamily,
   body:getComputedStyle(document.body).fontFamily,
   source:getComputedStyle(document.querySelector('code')!).fontFamily,
 }));
 expect(fonts.inter&&fonts.plex).toBeTruthy();expect(fonts.heading).toContain('IBM Plex Sans');expect(fonts.body).toContain('Inter');expect(fonts.source).toContain('Inter');
 await page.getByRole('button',{name:'Pausar animación'}).click();
 await expect(page.getByRole('button',{name:'Reanudar animación'})).toHaveAttribute('aria-pressed','true');
 expect(await page.locator('.investigation-scene').evaluate(el=>el.getAnimations({subtree:true}).every(animation=>animation.playState==='paused'))).toBeTruthy();
 await page.getByRole('button',{name:'Reanudar animación'}).click();
 await expect(page.locator('#inicio')).not.toHaveClass(/investigation-paused/);
 await page.emulateMedia({reducedMotion:'reduce'});
 await expect(page.locator('.analysis-orbit')).toHaveCSS('animation-name','none');
 await expect(page.locator('#animation-toggle')).toBeHidden();
});
test('HTML autónomo actualizado: animación, pausa y expediente',async({page})=>{
 const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
 await page.setViewportSize({width:1440,height:1000});
 await page.setContent(readFileSync('preview/iTR-preview.html','utf8'),{waitUntil:'domcontentloaded'});
 await expect(page.locator('.investigation-scene')).toBeVisible();
 await page.getByRole('button',{name:'Pausar animación'}).click();
 await expect(page.getByRole('button',{name:'Reanudar animación'})).toHaveAttribute('aria-pressed','true');
 await page.getByRole('button',{name:'02 Contrastar'}).click();
 await page.getByRole('button',{name:'Crear registro'}).click();
 await expect(page.getByRole('heading',{name:'03 / Registro del informe'})).toBeVisible();
 await page.setViewportSize({width:390,height:844});
 await expect(page.locator('#inicio')).not.toHaveClass(/investigation-animated/);
 expect(errors).toEqual([]);
});

test('la información se recopila, se contrasta y forma el expediente',async({page})=>{
 await page.setViewportSize({width:1440,height:1000});
 await page.goto('/');await page.getByRole('button',{name:'Pausar animación'}).click();
 const seek=async(time:number)=>page.locator('.hero-investigation').evaluate((el,time)=>{
   el.getAnimations({subtree:true}).forEach(animation=>{animation.currentTime=time});
 },time);
 await seek(1600);await expect(page.locator('.investigation-phase-0')).toHaveCSS('opacity','1');
 await expect(page.locator('.investigation-report')).toHaveCSS('opacity','0');
 const initial=await page.locator('.collection-packet').first().evaluate(el=>getComputedStyle(el).offsetDistance);
 await page.screenshot({path:'docs/hero-01-recopilar.png'});
 await seek(3200);expect(await page.locator('.collection-packet').first().evaluate(el=>getComputedStyle(el).offsetDistance)).not.toBe(initial);
 await seek(6400);await expect(page.locator('.investigation-phase-1')).toHaveCSS('opacity','1');
 await page.screenshot({path:'docs/hero-02-contrastar.png'});
 await seek(10400);await expect(page.locator('.investigation-phase-2')).toHaveCSS('opacity','1');
 await expect(page.locator('.investigation-report')).toHaveCSS('opacity','1');
 await expect(page.locator('.report-ready')).toHaveCSS('opacity','0');
 await page.screenshot({path:'docs/hero-03-documentar.png'});
 await seek(14400);await expect(page.locator('.investigation-phase-3')).toHaveCSS('opacity','1');
 await expect(page.locator('.report-ready')).toHaveCSS('opacity','1');
 await expect(page.locator('.report-line').last()).toHaveCSS('stroke-dashoffset','0px');
 await page.screenshot({path:'docs/hero-04-expediente.png'});
 await page.emulateMedia({reducedMotion:'reduce'});
 await expect(page.locator('.investigation-report')).toHaveCSS('opacity','1');
 await expect(page.locator('.investigation-phase-3')).toHaveCSS('opacity','1');
 await expect(page.locator('.investigation-phase-0')).toHaveCSS('opacity','0');
});
test('formato autónomo, foro y acceso permanente sin JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const page=await context.newPage();await page.goto('/');
 const open=async(question:string)=>{const detail=page.locator('#preguntas details').filter({has:page.locator('summary').filter({hasText:question})});await detail.locator('summary').click();return detail;};
 const learning=await open('¿Cómo se desarrolla la formación?');await expect(learning).toContainText('Cada módulo incluye un PDF');await expect(learning).toContainText('enlaces a vídeos');await expect(learning).toContainText('creador y al mentor');
 const work=await open('¿Es compatible con trabajar a jornada completa?');await expect(work).toContainText('sin horarios de clase obligatorios ni plazo de finalización');
 const access=await open('¿Me quedaré con los materiales después de terminar?');await expect(access).toContainText('para siempre');await expect(access).toContainText('usuario y contraseña');
 await page.locator('#cv-osint summary').click();await expect(page.locator('#cv-osint')).toContainText('Formación complementaria');await expect(page.locator('#cv-osint')).toContainText('en curso');
 await page.locator('#linkedin-osint summary').click();await expect(page.locator('#linkedin-osint')).toContainText('Licencias y certificaciones');await expect(page.locator('#linkedin-osint')).toContainText('Abogado/a | Litigación civil y mercantil');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 await page.locator('#linkedin-osint').screenshot({path:'docs/qa-linkedin-mobile.png',style:'.header,.mobile-cta,.skip{visibility:hidden!important}'});
 await context.close();
});
test('estadísticas delimitadas y fuentes primarias, sin promesa de colocación',async({page})=>{
 await page.goto('/');await page.locator('#estadisticas-empleo summary').click();
 const panel=page.locator('#estadisticas-empleo');await expect(panel).toContainText('21 %');await expect(panel).toContainText('14.100');await expect(panel).toContainText('34.932');await expect(panel).toContainText('Estados Unidos');await expect(panel).toContainText('Reino Unido');await expect(panel).toContainText('2025–2035');await expect(panel).toContainText('no son un contador de ofertas disponibles');
 const links=panel.locator('.employment-metric a');await expect(links).toHaveCount(3);for(const link of await links.all()){expect(['www.bls.gov','www.gov.uk']).toContain(new URL((await link.getAttribute('href'))!).hostname);}
 await page.locator('#certificado-empleo summary').click();await expect(page.locator('#certificado-empleo')).toContainText('no una evaluación del certificado de iTR+');await expect(page.locator('#certificado-empleo a')).toHaveCount(2);
 await expect(page.locator('#preguntas')).not.toContainText('90 %');
 await page.setViewportSize({width:390,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 const results=await new AxeBuilder({page}).include('#preguntas').analyze();expect(results.violations).toEqual([]);
 await panel.screenshot({path:'docs/qa-estadisticas-mobile.png',style:'.header,.mobile-cta,.skip{visibility:hidden!important}'});
});
test('PDF actualizado y descarga idéntica dentro del HTML autónomo',async({page,request})=>{
 const {execFileSync}=await import('node:child_process');
 const text=execFileSync('pdftotext',['-layout','public/downloads/programa-osint-abogados.pdf','-'],{encoding:'utf8'});const normalized=text.replace(/\s+/g,' ');
 expect(text.match(/^\s*[1-7]\.[1-9]\.\s/gm)).toHaveLength(38);
 for(const phrase of ['estudio autónomo','Cada módulo incluye un PDF','enlaces a vídeos','al creador y al mentor','No hay una fecha límite','para siempre','usuario y contraseña'])expect(normalized).toContain(phrase);
 expect(normalized).not.toMatch(/€|\b(?:540|445)\b|sesiones virtuales/);
 const asset=await request.get('/downloads/programa-osint-abogados.pdf');expect(asset.ok()).toBeTruthy();expect(await asset.body()).toEqual(readFileSync('public/downloads/programa-osint-abogados.pdf'));
 await page.setContent(readFileSync('preview/iTR-preview.html','utf8'),{waitUntil:'domcontentloaded'});
 const href=await page.locator('a[download][href^="data:application/pdf"]').first().getAttribute('href');expect(Buffer.from(href!.split(',')[1],'base64')).toEqual(await asset.body());
 await page.locator('#estadisticas-empleo summary').click();await expect(page.locator('#estadisticas-empleo')).toContainText('34.932');
});
