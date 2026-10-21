import { CORPORATE_URL, COURSE_URL } from '../data/site';
export function destination(type:'contact'|'course', id:string) {
 const url=new URL(type==='contact'?CORPORATE_URL:COURSE_URL);
 url.search=new URLSearchParams({utm_source:'landing_osint_abogados',utm_medium:'referral',utm_campaign:'osint_juridico',utm_content:id}).toString();
 return url.href;
}
