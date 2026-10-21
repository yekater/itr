import {build} from 'vite';
import {readFileSync,writeFileSync,unlinkSync,mkdirSync} from 'node:fs';
import {resolve} from 'node:path';
const entry=resolve('scripts/offline-entry.tsx');
writeFileSync(entry,`import React from 'react';import {hydrateRoot} from 'react-dom/client';import HeroBackground from '../src/components/HeroBackground';import EvidenceCase from '../src/components/EvidenceCase';import Audience from '../src/components/Audience';import Planner from '../src/components/Planner';const components={HeroBackground,EvidenceCase,Audience,Planner};document.querySelectorAll('astro-island').forEach(el=>{const name=el.getAttribute('component-export-name');const Component=components[name];if(Component)hydrateRoot(el,React.createElement(Component));});`);
try{
const result=await build({configFile:false,define:{'process.env.NODE_ENV':JSON.stringify('production')},logLevel:'error',build:{write:false,minify:true,lib:{entry,formats:['iife'],name:'ItrOffline'}},esbuild:{jsx:'automatic'}});
const results=Array.isArray(result)?result:[result];const js=results.flatMap(r=>r.output).filter(o=>o.type==='chunk').map(o=>o.code).join('\n');
let html=readFileSync('dist/index.html','utf8');
const data=(path,mime)=>`data:${mime};base64,${readFileSync(path).toString('base64')}`;
html=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,tag=>tag.includes('application/ld+json')?tag:'');
html=html.replace(/<link rel="stylesheet" href="([^"]+)"[^>]*>/g,(_,url)=>{let css=readFileSync('dist'+url,'utf8');css=css.replace(/url\(([^)]+)\)/g,(all,raw)=>{const u=raw.replace(/["']/g,'');if(u.startsWith('data:'))return all;const p=u.startsWith('/')?resolve('dist'+u):resolve('dist/_astro',u);return `url(${data(p,'font/woff2')})`});return `<style>${css}</style>`});
html=html.replace(/<astro-island\b([^>]*)>/g,(_tag,attrs)=>{const name=attrs.match(/component-url="[^\"]*\/([A-Za-z]+)\./)?.[1];return `<astro-island component-export-name="${name||''}">`});
html=html.replaceAll('/downloads/programa-osint-abogados.pdf',data('dist/downloads/programa-osint-abogados.pdf','application/pdf')).replace('href="/favicon.svg"',`href="${data('dist/favicon.svg','image/svg+xml')}"`);
const pageScript=readFileSync('dist/_astro/'+readFileSync('dist/index.html','utf8').match(/src="\/_astro\/(index\.astro[^\"]+\.js)"/)[1],'utf8').replace(/import\{t as (\w+)\}from"[^"]+";/,(_,name)=>`const ${name}=()=>{};`);
html=html.replace('</body>',()=>`<script>${js.replaceAll('</script','<\\/script')}</script><script>${pageScript}</script></body>`);
mkdirSync('preview',{recursive:true});
writeFileSync('preview/iTR-preview.html',html);
}finally{unlinkSync(entry)}
