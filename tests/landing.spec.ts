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
test('fallback sin WebGL, teclado y sin analítica externa',async({browser})=>{const context=await browser.newContext({viewport:{width:1024,height:500}});await context.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(this:HTMLCanvasElement,type:string,...args:unknown[]){if(type.includes('webgl'))return null;return (original as Function).apply(this,[type,...args])} as typeof original});const page=await context.newPage();const requests:string[]=[];page.on('request',r=>requests.push(r.url()));await page.goto('/');await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Saltar al contenido'})).toBeFocused();await expect(page.locator('.connecting-dots')).toBeVisible();await page.locator('.case').scrollIntoViewIfNeeded();await expect(page.locator('astro-island[component-url*=EvidenceCase]')).not.toHaveAttribute('ssr');const node=page.getByRole('button',{name:/Sociedad B \(simulada\)/});await node.focus();await page.keyboard.press('Enter');await expect(node).toHaveAttribute('aria-pressed','true');expect(requests.filter(u=>!u.startsWith('http://127.0.0.1:4321'))).toEqual([]);expect(await page.evaluate(()=>({cookies:document.cookie,local:localStorage.length,session:sessionStorage.length}))).toEqual({cookies:'',local:0,session:0});await context.close();});
test('expresiones SEO y orden editorial en HTML',async({page})=>{await page.goto('/');const html=await page.content();const text=await page.locator('body').textContent();for(const phrase of ['Curso OSINT para abogados','OSINT aplicado al ámbito jurídico','Investigación digital para abogados','Investigación de personas en internet','Investigación de sociedades mercantiles','Investigación de empresas y administradores','Análisis de huella digital','Investigación en redes sociales','Inteligencia de fuentes abiertas','Técnicas OSINT para abogados','Herramientas OSINT para profesionales jurídicos','Búsqueda avanzada de información pública','Investigación empresarial mediante fuentes abiertas','Elaboración de informes OSINT','Curso de investigación digital para abogados'])expect(text!.toLocaleLowerCase()).toContain(phrase.toLocaleLowerCase());expect(await page.locator('main>section').evaluateAll(nodes=>nodes.map(n=>n.id))).toEqual(['inicio','aplicaciones','para-quien','programa','formacion','aplicacion-profesional','certificacion','preguntas','informacion']);expect(html).not.toMatch(/\b(?:540|445)(?:[.,]00)?\s*(?:€|EUR)|€|"Offer"|priceValidUntil/);});
test('hero sin textos, tipografías corporativas y control de animación',async({page})=>{
 await page.goto('/');
 await page.evaluate(()=>document.fonts.ready);
 await expect(page.locator('.connecting-dots')).toBeVisible();
 await expect(page.locator('.connecting-dots text')).toHaveCount(0);
 await expect(page.getByText('Conectar los indicios.',{exact:true})).toHaveCount(0);
 expect(await page.locator('.connecting-dots .network-point').count()).toBe(64);
 const fonts=await page.evaluate(()=>({
   inter:document.fonts.check('16px Inter'),plex:document.fonts.check('16px "IBM Plex Sans"'),
   heading:getComputedStyle(document.querySelector('h1')!).fontFamily,
   body:getComputedStyle(document.body).fontFamily,
   source:getComputedStyle(document.querySelector('code')!).fontFamily,
 }));
 expect(fonts.inter&&fonts.plex).toBeTruthy();expect(fonts.heading).toContain('IBM Plex Sans');expect(fonts.body).toContain('Inter');expect(fonts.source).toContain('Inter');
 await page.getByRole('button',{name:'Pausar animación'}).click();
 await expect(page.getByRole('button',{name:'Reanudar animación'})).toHaveAttribute('aria-pressed','true');
 expect(await page.locator('.connecting-dots').evaluate(el=>el.getAnimations({subtree:true}).every(animation=>animation.playState==='paused'))).toBeTruthy();
 await page.getByRole('button',{name:'Reanudar animación'}).click();
 await expect(page.locator('#inicio')).not.toHaveClass(/network-paused/);
 await page.emulateMedia({reducedMotion:'reduce'});
 await expect(page.locator('.network-constellation')).toHaveCSS('animation-name','none');
 await expect(page.locator('#animation-toggle')).toBeHidden();
});
test('HTML autónomo actualizado: red, pausa y expediente',async({page})=>{
 const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
 await page.setViewportSize({width:1440,height:1000});
 await page.setContent(readFileSync('preview/iTR-preview.html','utf8'),{waitUntil:'domcontentloaded'});
 await expect(page.locator('.connecting-dots')).toBeVisible();
 await page.getByRole('button',{name:'Pausar animación'}).click();
 await expect(page.getByRole('button',{name:'Reanudar animación'})).toHaveAttribute('aria-pressed','true');
 await page.getByRole('button',{name:'02 Contrastar'}).click();
 await page.getByRole('button',{name:'Crear registro'}).click();
 await expect(page.getByRole('heading',{name:'03 / Registro del informe'})).toBeVisible();
 await page.setViewportSize({width:390,height:844});
 await expect(page.locator('#inicio')).not.toHaveClass(/network-animated/);
 expect(errors).toEqual([]);
});
