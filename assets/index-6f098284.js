(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function a(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=a(s);fetch(s.href,i)}})();const p={name:"Dhyanesh",tagline:"Grade 11 student in Toronto. I write software, build hardware projects and coach badminton.",photo:"/dhyanesh.jpg",photoAlt:"Dhyanesh, smiling, wearing glasses and a dark jacket",about:["I'm in Grade 11 at Woburn Collegiate Institute in Toronto. Most of my time outside class goes into computer science, AI and machine learning, cybersecurity and hardware.","I started coding in Grade 5, during COVID, with Python, and got into cybersecurity and ethical hacking around the same time. I also started a YouTube channel back then, which has 40 subscribers now. Since then I have written Python, Java, HTML, CSS and SQL, and spent a lot of time learning how computers work underneath.","On the hardware side I've worked with Arduino and ESP32 boards, installed different operating systems on a Raspberry Pi, built a Linux PC and learned about binary and computer architecture.","Away from the computer, I play badminton competitively for Canada and coach kids in the sport. Right now I'm planning a community project: survey people locally, find problems worth fixing, and build something for them with software, electronics and 3D printing."],facts:[["School","Woburn Collegiate Institute, Grade 11"],["Earlier","Pre-IB in Grades 9 and 10, Grade 8 honors"],["Tutoring","Math (advanced algebra, calculus) and CS (Python, Java, HTML)"],["Sport","Badminton, competing for Canada"]],skills:[["Languages",["Python","Java","SQL","HTML","CSS"]],["Hardware and systems",["Arduino","ESP32","Raspberry Pi","Linux","OS installation","PC assembly"]],["Software",["AI-assisted development","Conversational AI","Rapid prototyping","Debugging"]],["Games",["Python","Scratch","Java","Game logic and collisions"]],["Security",["Network and OS exploration","Authorized Wi-Fi router testing"]]],stats:[{count:100,suffix:"+",label:"hours of engineering volunteering"},{count:5e3,prefix:"$",suffix:"+",label:"earned coaching badminton"},{count:40,suffix:"+",label:"hours of event planning and babysitting"},{count:40,label:"YouTube subscribers, from a channel started in Grade 5"}],experience:[["HT6 HackDay 2026, Best Use of Open Source AI","Won with CaptainGemma, an AI pilot for a flight simulator, built with Abhiram and Shubh."],["Tutoring","Math and computer science for middle and high school students."],["Hackathon","Built AIDIFY, a working web app, within the event time limit."],["Engineering volunteering, 100+ hours","Hands-on work with computer hardware, binary, operating systems, Linux, Raspberry Pi, Arduino, ESP32 and circuit boards."],["Badminton coaching, $5,000+ earned","Coaching kids, which mostly means breaking skills down so younger players can pick them up. The money is going toward the community project."],["Event planning and babysitting, 40+ hours","Helped plan and run events, and looked after children."],["Pre-IB programme","Grades 9 and 10."],["Grade 8 honors","Graduated Grade 8 with honors."]],contact:{blurb:"If you're working on something interesting, or want help with one of these topics, get in touch. Email is the fastest way to reach me.",email:"cyberzunior@gmail.com",phone:"+1 437 602 3996",instagram:"dhy_n3sh._"}},H=`
<svg viewBox="0 0 64 32" aria-hidden="true">
  <path class="sh-skirt" d="M44 10 L6 1 Q1.5 16 6 31 L44 22 Z" />
  <path class="sh-rib" d="M44 12 L6 4 M44 14 L5 10 M44 16 L4 16 M44 18 L5 22 M44 20 L6 28" />
  <path class="sh-thread" d="M36 8.1 L36 23.9 M28 6.2 L28 25.8" />
  <path class="sh-cork" d="M44 9 H52 A7 7 0 0 1 52 23 H44 Z" />
  <rect class="sh-band" x="44" y="9" width="3.5" height="14" />
</svg>`,Q=matchMedia("(prefers-reduced-motion: reduce)");function ct(){const e=.21215397923875437,a=55*Math.PI/180,n=1/300;let s=28*Math.cos(a),i=28*Math.sin(a),o=0,r=0;const c=[[0,0]];for(;r>=0;){const l=Math.hypot(s,i);s-=e*l*s*n,i-=(9.81+e*l*i)*n,o+=s*n,r+=i*n,c.push([o,Math.max(r,0)])}const h=Math.max(...c.map(l=>l[1]));return c.map(([l,m])=>[l/o,m/h])}const C=ct();function tt(t,e,a){return n=>{const s=Math.min(Math.max(n,0),1)*(C.length-1),i=Math.floor(s),o=s-i,r=C[i],c=C[Math.min(i+1,C.length-1)],h=r[0]+(c[0]-r[0])*o,l=r[1]+(c[1]-r[1])*o,m=t.x+(e.x-t.x)*h,b=t.y+(e.y-t.y)*h,L=a*l+(t.lift??0)*(1-h);return{x:m,y:b-L,gx:m,gy:b,u:h,h:l}}}const et=(t,e,a=0,n=1)=>`translate(${t}px, ${e}px) rotate(${a}rad) scale(${n})`;function S(t,...e){t.style.transform=et(...e)}function T(t,e,a,{duration:n=800,peak:s=120,shadow:i,scale:o=[1,1],trail:r}={}){const c=tt(e,a,s);return new Promise(h=>{const l=performance.now(),m=[],b=L=>{const $=Math.min((L-l)/n,1),y=c($),[M,P]=$<.98?[y,c($+.02)]:[c($-.02),y],G=Math.atan2(P.y-M.y,P.x-M.x),E=o[0]+(o[1]-o[0])*y.u;if(S(t,y.x,y.y,G,E),i&&(S(i,y.gx,y.gy,0,E*(1-.55*y.h)),i.style.opacity=.45*(1-.6*y.h)),r&&(m.push(`${y.x.toFixed(1)},${y.y.toFixed(1)}`),r.setAttribute("points",m.slice(-18).join(" "))),$<1)return requestAnimationFrame(b);r&&(r.animate({opacity:[1,0]},350).onfinish=()=>r.setAttribute("points","")),h()};requestAnimationFrame(b)})}const R=t=>new Promise(e=>setTimeout(e,t));function dt(t){const e=Number(t.dataset.count),{prefix:a="",suffix:n=""}=t.dataset,s=r=>`${a}${Math.round(r).toLocaleString("en-US")}${n}`,i=performance.now(),o=r=>{const c=Math.min((r-i)/1400,1);t.textContent=s(e*(1-(1-c)**3)),c<1&&requestAnimationFrame(o)};requestAnimationFrame(o)}function ht(t){const e=t.currentTarget,a=e.getBoundingClientRect(),n=(t.clientX-a.left)/a.width,s=(t.clientY-a.top)/a.height;e.style.setProperty("--rx",`${(.5-s)*8}deg`),e.style.setProperty("--ry",`${(n-.5)*10}deg`),e.style.setProperty("--mx",`${n*100}%`),e.style.setProperty("--my",`${s*100}%`)}function ut(t){t.querySelectorAll("[data-split]").forEach(a=>{a.innerHTML=a.textContent.trim().split(/\s+/).map((n,s)=>`<span class="word"><span style="--i:${s}">${n}</span></span>`).join(" ")}),t.querySelectorAll("[data-letters]").forEach(a=>{a.setAttribute("aria-label",a.textContent),a.innerHTML=[...a.textContent.trim()].map((n,s)=>`<span class="letter" aria-hidden="true" style="--i:${s}">${n}</span>`).join("")}),matchMedia("(hover: hover)").matches&&!Q.matches&&t.querySelectorAll(".card").forEach(a=>a.addEventListener("pointermove",ht));const e=new IntersectionObserver(a=>{for(const n of a)n.isIntersecting&&(n.target.classList.add("in"),n.target.dataset.count&&dt(n.target),e.unobserve(n.target))},{rootMargin:"0px 0px -8% 0px"});return t.querySelectorAll("[data-reveal], [data-count]").forEach(a=>e.observe(a)),()=>e.disconnect()}const pt=[{title:"Zombie Spideroid",category:"Hardware",status:"Hack-or-Treat 2026",summary:"A spider-shaped radio companion that decodes Morse, maps the room and broadcasts what it finds as SSTV audio.",details:["Zombie Spideroid is a spider-shaped radio companion for a zombie, set in a 1944 outbreak. It receives a Morse transmission, decodes it letter by letter on a retro HUD, then sweeps the room with an ultrasonic sensor mounted on a stepper-driven head. It maps the room, counts the \"humans\" in it and panics out loud.","If there are people nearby, it snaps a webcam crop and broadcasts it as Robot36 SSTV audio that a phone can decode live. A local Gemma model writes its lines, while deterministic code decides the facts: contacts, distances and threat level. Every model call has a time cap and a canned fallback, so the demo keeps running even when the model is slow or offline.","I built it for Hack-or-Treat 2026 with a Python state machine, an Arduino Uno, PySSTV and NumPy."],note:"Built for Hack-or-Treat 2026.",tags:["Python","Arduino","Gemma via Ollama","PySSTV","NumPy"],link:"https://youtu.be/eyID4pmsm5Y",linkLabel:"Watch the demo"},{title:"CaptainGemma",category:"AI",status:"HT6 HackDay 2026",summary:"An AI pilot that flies a Cessna 172 in a flight simulator while a model plane on an Arduino mount copies its moves in real time.",details:["We built CaptainGemma at HT6 HackDay 2026, where it won Best Use of Open Source AI. Gemma 3 4B runs locally through Ollama and flies a Cessna 172 in JSBSim, setting new flight targets every few seconds. After each failed attempt it writes notes for itself and uses them on the next try.","On the desk, a model plane sits on a mount driven by three motors and an Arduino Uno, and it matches the simulated plane's attitude as it flies.","I built it with Abhiram and Shubh."],note:"Won Best Use of Open Source AI at HT6 HackDay 2026.",tags:["Python","JSBSim","Gemma 3 4B","Ollama","Arduino Uno"],link:"https://github.com/AbhiramV010/ht6hackDay2026",linkLabel:"Source code"},{title:"Community Solutions Project",category:"Community",status:"In progress",summary:"Surveying people in my area, picking practical problems from the answers, and building fixes for them.",details:["I want to find problems that affect people in my community and build solutions for them. The plan is to run surveys, go through the responses and choose the problems that are realistic to solve with technology. I'm putting the $5,000+ I earned coaching badminton toward it."],steps:["Write and run surveys to learn what residents need","Go through the responses and pick problems worth solving","Write software and digital tools where they help","Design and 3D-print devices","Prototype with circuit boards, Arduino or ESP32 where it makes sense","Test, collect feedback and iterate"],note:"Still in planning. Nothing has been built or deployed yet.",tags:["Surveys","Software","Arduino","ESP32","3D printing"]},{title:"AIDIFY",category:"Software",status:"Hackathon",summary:"A web app built at a hackathon that helps people find resources and support.",details:["AIDIFY was a hackathon project about making it easier for people to find help when they need it. I built it with Lovable and had to get from idea to a working web app inside the time limit, so most of the work was fast prototyping with AI-assisted tools."],tags:["Lovable","Web app","Prototyping"],link:"https://aidify.lovable.app/"},{title:"CareData Chat",category:"AI",summary:"A chat interface for asking questions about clinical data in plain language.",details:["CareData Chat lets you explore clinical data by asking questions instead of reading through tables. I built it to see whether conversational AI could make healthcare data easier for people to understand and use."],note:"This is an experiment. It isn't a medical tool and doesn't give diagnoses or treatment advice.",tags:["Conversational AI","Data","Web app"],link:"https://care-data-chat.lovable.app/"},{title:"Personal assistant in Java",category:"AI",summary:"An interactive assistant I wrote from scratch in Java.",tags:["Java"]},{title:"Games",category:"Games",summary:"Flappy Bird and Space Shooter in Python, and Scratch games made for kids.",details:["These were how I learned game logic: movement, scoring and collision detection, and how to get an idea to the point where someone else can play it."],tags:["Python","Scratch","Game logic"]},{title:"Hardware and embedded systems",category:"Hardware",summary:"Experiments with Arduino, ESP32 and Raspberry Pi, plus a Linux PC build.",details:["I've worked with Arduino and ESP32 boards, tried different operating systems on a Raspberry Pi, built a computer running Linux, and spent time installing and configuring operating systems."],tags:["Arduino","ESP32","Raspberry Pi","Linux"]},{title:"Wi-Fi router security testing",category:"Security",summary:"Testing router security in an authorized setup, as part of learning networking and operating systems.",tags:["Networking","Operating systems","Security"]}],mt=t=>t.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""),v=pt.map(t=>({...t,slug:t.slug??mt(t.title)})),at=t=>`${t.category}${t.status?` · ${t.status}`:""}`,z=(t=[])=>t.length?`<ul class="tags">${t.map(e=>`<li>${e}</li>`).join("")}</ul>`:"",nt=(t,e)=>`
  <a class="card" href="/projects/${t.slug}" data-category="${t.category}" data-reveal style="--d:${e%3}; view-transition-name: card-${e}">
    ${t.image?`<img src="${t.image}" alt="" loading="lazy" />`:""}
    <span class="meta">${at(t)}</span>
    <h3>${t.title}</h3>
    <p>${t.summary}</p>
    ${z(t.tags)}
    <span class="card-arrow" aria-hidden="true">→</span>
  </a>`,A=40,x={w:610+A*2,h:1340+A*2},B=[{href:"/projects",label:"Projects",x:115,y:130},{href:"/experience",label:"Experience",x:495,y:130},{href:"/about",label:"About",x:115,y:575},{href:"/contact",label:"Contact",x:495,y:575}],yt={x:305,y:1090},O=46,_=({x:t,y:e})=>`left:${(t+A)/x.w*100}%; top:${(e+A)/x.h*100}%`,X=["M0 0 H610 V1340 H0 Z","M46 0 V1340","M564 0 V1340","M0 76 H610","M0 1264 H610","M0 472 H610","M0 868 H610","M305 0 V472","M305 868 V1340"],gt=()=>`
  <div class="court-stage">
    <div class="court-plane">
      <svg class="court-lines" viewBox="${-A} ${-A} ${x.w} ${x.h}" aria-hidden="true">
        <rect class="court-floor" x="0" y="0" width="610" height="1340" />
        ${X.map((t,e)=>`<path class="line" d="${t}" pathLength="1" style="--d:${e}" />`).join("")}
        <path class="line net-line" d="M-20 670 H630" pathLength="1" style="--d:${X.length}" />
        ${B.map(t=>`
          <g class="target" transform="translate(${t.x} ${t.y})">
            <circle class="ring" r="50" />
            <circle class="dot" r="12" />
            <circle class="ripple" r="50" />
          </g>`).join("")}
      </svg>
      <div class="net" style="left:${A/x.w*100}%; width:${610/x.w*100}%; top:${(670+A-155)/x.h*100}%; height:${155/x.h*100}%"></div>
      ${B.map(t=>`<span class="anchor" style="${_(t)}"></span>`).join("")}
      <span class="anchor" style="${_(yt)}"></span>
    </div>
    ${B.map((t,e)=>`<a class="zone" href="${t.href}" style="--i:${e}">${t.label}</a>`).join("")}
    <svg class="court-overlay" aria-hidden="true"><path class="preview" /><polyline class="trail" /></svg>
    <div class="court-shadow"></div>
    <div class="shuttle court-shuttle">${H}</div>
  </div>`;function ft(t,e){const a=[...t.querySelectorAll(".anchor")],n=[...t.querySelectorAll(".zone")],s=[...t.querySelectorAll(".target")],i=t.querySelector(".court-shuttle"),o=t.querySelector(".court-shadow"),r=t.querySelector(".preview"),c=t.querySelector(".trail");let h=[],l,m=!1;const b=()=>({x:l.x,y:l.y,lift:O}),L=d=>Math.hypot(d.x-l.x,d.y-l.y)*.5+70;function $(){if(m)return;const d=t.style.transform;t.style.transform="none";const g=t.getBoundingClientRect();h=a.map(f=>{const u=f.getBoundingClientRect();return{x:u.left+u.width/2-g.left,y:u.top+u.height/2-g.top,scale:u.width/40}}),t.style.transform=d,l=h.at(-1),n.forEach((f,u)=>{f.style.left=`${h[u].x}px`,f.style.top=`${h[u].y}px`}),S(o,l.x,l.y),S(i,l.x,l.y-O,Math.PI/2)}function y(d){const g=tt(b(),h[d],L(h[d])),f=Array.from({length:49},(u,I)=>{const U=g(I/48);return`${I?"L":"M"}${U.x.toFixed(1)} ${U.y.toFixed(1)}`}).join(" ");r.setAttribute("d",f),t.classList.add("aiming"),s.forEach((u,I)=>u.classList.toggle("active",I===d))}function M(){t.classList.remove("aiming"),s.forEach(d=>d.classList.remove("active"))}n.forEach((d,g)=>{d.addEventListener("pointerenter",()=>y(g)),d.addEventListener("focus",()=>y(g)),d.addEventListener("pointerleave",M),d.addEventListener("blur",M),d.addEventListener("click",async f=>{if(f.preventDefault(),m)return;m=!0,M(),t.classList.add("serving"),d.classList.add("chosen");const u=h[g];await T(i,b(),u,{duration:1150,peak:L(u),shadow:o,trail:c,scale:[1,u.scale/l.scale]}),s[g].classList.add("hit"),await R(320),e(d.getAttribute("href"),{mode:"drop"})})}),i.addEventListener("click",async()=>{if(m)return;m=!0,t.classList.add("serving"),await T(i,b(),l,{duration:1300,peak:240,shadow:o}),await R(250);const d=i.style.transform;S(i,l.x,l.y-O,Math.PI/2),i.animate({transform:[d,i.style.transform]},{duration:450,easing:"cubic-bezier(.3,1.4,.5,1)"}),S(o,l.x,l.y),t.classList.replace("serving","ready"),m=!1});const P=t.parentElement,G=d=>{if(m)return;const g=P.getBoundingClientRect(),f=(d.clientX-g.left)/g.width-.5,u=(d.clientY-g.top)/g.height-.5;t.style.transform=`perspective(1400px) rotateX(${-u*6}deg) rotateY(${f*9}deg)`},E=()=>t.style.transform="";matchMedia("(hover: hover)").matches&&!Q.matches&&(P.addEventListener("pointermove",G),P.addEventListener("pointerleave",E));const J=new ResizeObserver($);return J.observe(t),document.fonts.ready.then($),()=>J.disconnect()}const st=[...new Set(p.skills.flatMap(([,t])=>t))],K=()=>st.map((t,e)=>`<span class="${e%2?"outline":""}">${t}</span><i class="marquee-shuttle">${H}</i>`).join(""),vt=()=>({section:"/",dark:!0,html:`
    <section class="home-hero">
      <div class="floodlight left" aria-hidden="true"></div>
      <div class="floodlight right" aria-hidden="true"></div>
      <div class="home-intro">
        <p class="kicker" data-reveal><span class="live"></span>Toronto · Grade 11</p>
        <h1 class="display name" data-letters>${p.name}</h1>
        <p class="lead" data-reveal style="--d:3">${p.tagline}</p>
        <p class="hint" data-reveal style="--d:4">Each corner of the court is a page. Pick one and the shuttle will take you there.</p>
      </div>
      ${gt()}

      <div class="scoreboard" aria-label="Numbers">
        ${p.stats.map((t,e)=>`
            <div class="score" data-reveal style="--d:${e}">
              <span class="score-num" data-count="${t.count}" data-prefix="${t.prefix??""}" data-suffix="${t.suffix??""}">${t.prefix??""}${t.count.toLocaleString("en-US")}${t.suffix??""}</span>
              <span class="score-label">${t.label}</span>
            </div>`).join("")}
      </div>
    </section>

    <div class="marquee" aria-label="Skills: ${st.join(", ")}">
      <div class="marquee-track" aria-hidden="true">${K()}${K()}</div>
    </div>

    <section class="block">
      <div class="block-head">
        <h2 data-reveal>Selected projects</h2>
        <a class="text-link" href="/projects" data-reveal>All projects →</a>
      </div>
      <div class="cards">${v.slice(0,3).map(nt).join("")}</div>
    </section>`,mount:(t,e)=>ft(t.querySelector(".court-stage"),e)}),bt=()=>({section:"/about",title:"About",html:`
    <header class="page-head">
      <h1 class="display" data-split>About</h1>
    </header>

    <section class="about">
      <div class="portrait" data-reveal>
        <figure class="portrait-frame">
          <img src="${p.photo}" alt="${p.photoAlt}" width="1431" height="1920" />
        </figure>
      </div>
      <div>
        <div class="prose">
          ${p.about.map((t,e)=>`<p data-reveal style="--d:${e}">${t}</p>`).join("")}
        </div>
        <dl class="facts">
          ${p.facts.map(([t,e],a)=>`<div data-reveal style="--d:${a}"><dt>${t}</dt><dd>${e}</dd></div>`).join("")}
        </dl>
      </div>
    </section>

    <section class="block">
      <h2 data-reveal>Skills</h2>
      <div class="skills">
        ${p.skills.map(([t,e],a)=>`<div data-reveal style="--d:${a}"><h3>${t}</h3>${z(e)}</div>`).join("")}
      </div>
    </section>`}),$t=["All",...new Set(v.map(t=>t.category))];function wt(t){const e=t.querySelector(".filters"),a=t.querySelector(".filter-pill"),n=[...t.querySelectorAll(".card")],s=r=>{a.style.width=`${r.offsetWidth}px`,a.style.transform=`translateX(${r.offsetLeft}px)`},i=r=>n.forEach(c=>{c.hidden=r!=="All"&&c.dataset.category!==r,c.classList.add("in")});e.addEventListener("click",r=>{const c=r.target.closest("button");if(!c)return;e.querySelectorAll("button").forEach(l=>l.setAttribute("aria-pressed",l===c)),s(c);const h=()=>i(c.dataset.filter);document.startViewTransition?document.startViewTransition(h):h()});const o=()=>s(e.querySelector('[aria-pressed="true"]'));return document.fonts.ready.then(o),addEventListener("resize",o),()=>removeEventListener("resize",o)}const xt=()=>({section:"/projects",title:"Projects",html:`
    <header class="page-head">
      <h1 class="display" data-split>Projects</h1>
      <p class="lead" data-reveal style="--d:2">Things I've built, and one I'm still planning.</p>
    </header>

    <div class="filters" role="group" aria-label="Filter projects" data-reveal style="--d:3">
      <span class="filter-pill" aria-hidden="true"></span>
      ${$t.map((t,e)=>`<button data-filter="${t}" aria-pressed="${e===0}">${t}</button>`).join("")}
    </div>
    <div class="cards">${v.map(nt).join("")}</div>`,mount:wt}),it=()=>({section:"/",title:"Out",html:`
    <header class="page-head">
      <h1 class="display" data-split>Out.</h1>
      <p class="lead" data-reveal style="--d:1">That shot landed outside the lines. This page doesn't exist.</p>
      <a class="button" href="/" data-reveal style="--d:2">Back to the court</a>
    </header>`});function St(t){var i;const e=v.findIndex(o=>o.slug===t);if(e===-1)return it();const a=v[e],n=v[(e-1+v.length)%v.length],s=v[(e+1)%v.length];return{section:"/projects",title:a.title,html:`
      <a class="text-link back" href="/projects" data-reveal>← All projects</a>
      <header class="page-head project-head">
        <p class="kicker" data-reveal>${at(a)}</p>
        <h1 class="display" data-split>${a.title}</h1>
        <p class="lead" data-reveal style="--d:2">${a.summary}</p>
      </header>

      <div class="project-body">
        <div class="prose">
          ${a.image?`<img class="project-image" src="${a.image}" alt="" data-reveal />`:""}
          ${(a.details??[]).map(o=>`<p data-reveal>${o}</p>`).join("")}
          ${a.steps?`<h2 data-reveal>The plan</h2>
                 <ol class="steps">${a.steps.map((o,r)=>`<li data-reveal style="--d:${r}">${o}</li>`).join("")}</ol>`:""}
          ${a.note?`<p class="note" data-reveal>${a.note}</p>`:""}
        </div>
        <aside class="project-aside" data-reveal style="--d:2">
          ${(i=a.tags)!=null&&i.length?`<h2>Built with</h2>${z(a.tags)}`:""}
          ${a.link?`<a class="button" href="${a.link}" target="_blank" rel="noopener">${a.linkLabel??"Open live demo"} ↗</a>`:""}
        </aside>
      </div>

      <nav class="pager" aria-label="More projects">
        <a href="/projects/${n.slug}" data-reveal><span>Previous</span>${n.title}</a>
        <a href="/projects/${s.slug}" data-reveal style="--d:1"><span>Next</span>${s.title}</a>
      </nav>`}}function At(t){const e=t.querySelector(".timeline"),a=t.querySelector(".timeline-shuttle"),n=()=>{const s=e.getBoundingClientRect(),i=Math.min(Math.max((innerHeight*.55-s.top)/s.height,0),1),o=Math.sin(i*18)*.12;a.style.transform=`translateY(${i*(s.height-16)}px) rotate(${Math.PI/2+o}rad)`};return n(),addEventListener("scroll",n,{passive:!0}),()=>removeEventListener("scroll",n)}const kt=()=>({section:"/experience",title:"Experience",html:`
    <header class="page-head">
      <h1 class="display" data-split>Experience</h1>
      <p class="lead" data-reveal style="--d:2">Teaching, coaching, volunteering and school.</p>
    </header>

    <div class="timeline-wrap">
      <div class="timeline-shuttle" aria-hidden="true">${H}</div>
      <ol class="timeline" data-reveal>
        ${p.experience.map(([t,e],a)=>`<li data-reveal style="--d:${a%3}"><h2>${t}</h2><p>${e}</p></li>`).join("")}
      </ol>
    </div>`,mount:At}),{contact:w}=p;function Lt(t){const e=t.querySelector(".copy");e.addEventListener("click",async()=>{await navigator.clipboard.writeText(w.email),e.textContent="Copied",setTimeout(()=>e.textContent="Copy",1600)})}const Mt=()=>({section:"/contact",title:"Contact",html:`
    <header class="page-head">
      <h1 class="display" data-split>Get in touch</h1>
      <p class="lead" data-reveal style="--d:2">${w.blurb}</p>
    </header>

    <div class="email-row" data-reveal style="--d:3">
      <a class="big-email" href="mailto:${w.email}">${w.email}</a>
      <button class="copy">Copy</button>
    </div>

    <ul class="contact-list">
      <li data-reveal style="--d:4"><span>Phone</span><a href="tel:${w.phone.replace(/\s/g,"")}">${w.phone}</a></li>
      <li data-reveal style="--d:5"><span>Instagram</span><a href="https://instagram.com/${w.instagram}" target="_blank" rel="noopener">@${w.instagram}</a></li>
    </ul>`,mount:Lt}),Pt=[[/^\/$/,vt],[/^\/about\/?$/,bt],[/^\/projects\/?$/,xt],[/^\/projects\/([^/]+)\/?$/,St],[/^\/experience\/?$/,kt],[/^\/contact\/?$/,Mt]];function ot(t){for(const[e,a]of Pt){const n=t.match(e);if(n)return a(...n.slice(1))}return it()}const jt=[["/",p.name],["/about","About"],["/projects","Projects"],["/experience","Experience"],["/contact","Contact"]],W=-.14;document.querySelector("#app").innerHTML=`
  <a class="skip" href="#main">Skip to content</a>
  <header class="site-header">
    <nav aria-label="Main">
      ${jt.map(([t,e],a)=>`<a href="${t}" data-section="${t}" class="${a?"":"logo"}">${e}</a>`).join("")}
    </nav>
  </header>
  <main id="main"></main>
  <footer class="site-footer">
    <span>© ${new Date().getFullYear()} ${p.name}</span>
    <a href="mailto:${p.contact.email}">${p.contact.email}</a>
  </footer>
  <div class="curtain" aria-hidden="true"><span></span></div>
  <div class="shuttle-layer" aria-hidden="true">
    <svg class="trail-layer"><polyline class="trail" /></svg>
    <div class="shuttle nav-shuttle">${H}</div>
  </div>
`;const V=document.querySelector(".site-header"),D=document.querySelector("main"),k=document.querySelector(".nav-shuttle"),Et=document.querySelector(".trail-layer .trail"),F=document.querySelector(".curtain");let j=null,Z=[];function N(t){const e=V.querySelector(`[data-section="${t}"]`).getBoundingClientRect();return{x:e.left+e.width/2,y:e.bottom+2}}function Y(t){j=t;const e=N(t);S(k,e.x,e.y,W)}async function It(t,e,a){const n=N(t),s=o=>Math.max(o-14,0);if(e==="drop")await T(k,{x:n.x-50,y:n.y,lift:s(n.y)},n,{duration:520,peak:0});else{const o=a??N(j),r=Math.hypot(n.x-o.x,n.y-o.y);await T(k,o,n,{peak:Math.min(Math.max(r*.45,50),220,s(Math.min(o.y,n.y))),duration:Math.min(Math.max(450+r*.7,560),1e3),trail:Et})}j=t;const i=k.style.transform;S(k,n.x,n.y,W),k.animate({transform:[i,et(n.x,n.y-5,W*2),k.style.transform]},{duration:260,easing:"ease-out"})}function rt(t){var e;Z.forEach(a=>a==null?void 0:a()),document.title=t.title?`${t.title} · ${p.name}`:`${p.name}`,D.innerHTML=t.html,document.documentElement.classList.toggle("dark-top",!!t.dark),Z=[(e=t.mount)==null?void 0:e.call(t,D,q),ut(D)],V.querySelectorAll("a").forEach(a=>{a.toggleAttribute("aria-current",a.dataset.section===t.section)})}async function q(t,{mode:e="nav",origin:a,push:n=!0}={}){const s=ot(t);n&&history.pushState({},"",t);const i=s.section===j&&e!=="drop"?null:It(s.section,e,a);await Ct(s.title??"Home",()=>{rt(s),scrollTo(0,0)}),await i}async function Ct(t,e){F.querySelector("span").textContent=t;const a={duration:380,easing:"cubic-bezier(.7,0,.3,1)",fill:"forwards"};await F.animate({clipPath:["inset(0 100% 0 0)","inset(0 0 0 0)"]},a).finished,e(),await R(120),await F.animate({clipPath:["inset(0 0 0 0)","inset(0 0 0 100%)"]},a).finished}const Tt=()=>{const t=document.documentElement.scrollHeight-innerHeight;V.style.setProperty("--progress",t>0?scrollY/t:0)};addEventListener("scroll",Tt,{passive:!0});document.addEventListener("click",t=>{const e=t.target.closest("a"),a=e==null?void 0:e.getAttribute("href");if(!(a!=null&&a.startsWith("/"))||t.defaultPrevented||t.button||t.metaKey||t.ctrlKey||t.shiftKey||e.target||(t.preventDefault(),a===location.pathname))return;if(e.closest(".site-header"))return q(a);const n=e.getBoundingClientRect(),s=t.detail?{x:t.clientX,y:t.clientY}:{x:n.left+n.width/2,y:n.top+n.height/2};q(a,{origin:s})});addEventListener("popstate",()=>q(location.pathname,{push:!1}));addEventListener("resize",()=>Y(j));const lt=ot(location.pathname);rt(lt);Y(lt.section);document.fonts.ready.then(()=>Y(j));
