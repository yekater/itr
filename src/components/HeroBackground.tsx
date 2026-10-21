import {useEffect,useRef} from 'react';
import {motion,useMotionValue,useSpring,useTransform} from 'motion/react';
export default function HeroBackground(){
 const ref=useRef<HTMLDivElement>(null),x=useMotionValue(0),y=useMotionValue(0);
 const sx=useSpring(x,{stiffness:90,damping:24,mass:.8}),sy=useSpring(y,{stiffness:90,damping:24,mass:.8});
 const bx=useTransform(sx,v=>v*.3),by=useTransform(sy,v=>v*.3);
 useEffect(()=>{const host=document.getElementById('inicio');if(!host)return;const media=matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)');let visible=true;let dispose:(()=>void)|undefined;
 const move=(e:PointerEvent)=>{if(!media.matches||!visible||document.hidden)return;const r=host.getBoundingClientRect();x.set(Math.max(-1,Math.min(1,(e.clientX-r.left)/r.width*2-1))*24);y.set(Math.max(-1,Math.min(1,(e.clientY-r.top)/r.height*2-1))*18)};
 const reset=()=>{x.set(0);y.set(0)};const changed=()=>{reset();if(!media.matches){sx.jump(0);sy.jump(0);dispose?.();dispose=undefined}};
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(!visible)reset()});observer.observe(host);
 const visibility=()=>{if(document.hidden)reset()};host.addEventListener('pointermove',move,{passive:true});host.addEventListener('pointerleave',reset);media.addEventListener('change',changed);document.addEventListener('visibilitychange',visibility);
 const connection=(navigator as Navigator & {connection?:{saveData:boolean}}).connection;
 if(media.matches&&!connection?.saveData) import('./HeroScene').then(m=>{if(ref.current&&media.matches)dispose=m.createScene(ref.current,sx,sy)}).catch(()=>{});
 return ()=>{dispose?.();observer.disconnect();host.removeEventListener('pointermove',move);host.removeEventListener('pointerleave',reset);media.removeEventListener('change',changed);document.removeEventListener('visibilitychange',visibility);sx.stop();sy.stop()};
 },[]);
 return <div className="hero-decoration" aria-hidden="true"><motion.div className="halo" style={{x:bx,y:by}}/><motion.div ref={ref} className="webgl" style={{x:sx,y:sy}}/></div>
}
