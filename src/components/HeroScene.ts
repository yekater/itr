import * as THREE from 'three';
import type {MotionValue} from 'motion/react';
export function createScene(host:HTMLElement,x:MotionValue<number>,y:MotionValue<number>){
 let renderer:THREE.WebGLRenderer;try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:false,powerPreference:'low-power'});}catch{return ()=>{}}
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));host.appendChild(renderer.domElement);
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(45,1,.1,100);camera.position.z=7;
 const positions=new Float32Array(450*3);let seed=41;for(let i=0;i<positions.length;i++){seed=(seed*16807)%2147483647;positions[i]=(seed/2147483647-.5)*12;}
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(positions,3));
 const material=new THREE.ShaderMaterial({transparent:true,uniforms:{uPointer:{value:new THREE.Vector2()}},vertexShader:'uniform vec2 uPointer; void main(){vec3 p=position;p.xy+=uPointer*.002;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);gl_PointSize=2.;}',fragmentShader:'void main(){if(distance(gl_PointCoord,vec2(.5))>.5)discard;gl_FragColor=vec4(.5,.76,1.,.45);}'});
 const points=new THREE.Points(geometry,material);scene.add(points);let frame=0,visible=true,disposed=false;
 function draw(){frame=0;if(disposed||!visible||document.hidden)return;points.rotation.y=x.get()*.001;points.rotation.x=y.get()*.001;material.uniforms.uPointer.value.set(x.get(),y.get());renderer.render(scene,camera)}
 function schedule(){if(!frame&&visible&&!document.hidden)frame=requestAnimationFrame(draw)}
 const ux=x.on('change',schedule),uy=y.on('change',schedule);
 const resize=new ResizeObserver(()=>{renderer.setSize(host.clientWidth,host.clientHeight);camera.aspect=host.clientWidth/Math.max(1,host.clientHeight);camera.updateProjectionMatrix();schedule()});resize.observe(host);
 const observer=new IntersectionObserver(e=>{visible=e[0].isIntersecting;if(!visible){cancelAnimationFrame(frame);frame=0}else schedule()});observer.observe(host);
 const context=(e:Event)=>{e.preventDefault();cleanup()};renderer.domElement.addEventListener('webglcontextlost',context);document.addEventListener('visibilitychange',schedule);
 function cleanup(){if(disposed)return;disposed=true;cancelAnimationFrame(frame);ux();uy();resize.disconnect();observer.disconnect();document.removeEventListener('visibilitychange',schedule);renderer.domElement.removeEventListener('webglcontextlost',context);geometry.dispose();material.dispose();renderer.dispose();renderer.domElement.remove()};schedule();return cleanup;
}
