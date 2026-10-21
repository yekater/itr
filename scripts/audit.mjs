import {spawn} from 'node:child_process';
import {writeFileSync,readdirSync,statSync,readFileSync} from 'node:fs';
import {gzipSync} from 'node:zlib';
const report=[];for(const file of readdirSync('dist/_astro'))if(file.endsWith('.js'))report.push({file,bytes:statSync('dist/_astro/'+file).size,gzip:gzipSync(readFileSync('dist/_astro/'+file)).length});writeFileSync('docs/resource-sizes.json',JSON.stringify(report,null,2));
const p=spawn('node_modules/.bin/lighthouse',['http://127.0.0.1:4321','--chrome-flags=--headless --no-sandbox','--output=json','--output-path=docs/lighthouse.json','--quiet'],{env:{...process.env,CHROME_PATH:'/usr/bin/chromium'},stdio:'inherit'});p.on('exit',code=>process.exit(code||0));
