/* ========= EDIT EVERYTHING HERE: change these for any person ========= */
const CONFIG = {
  mast: "TECXPERT",
  issue: "THE LEADERSHIP ISSUE",
  hb: "Happy Birthday",
  name: "Rakesh Sir",
  coverCaption: "For the leader who listens first, guides with calm, and builds teams that grow.",
  greeting: "Dear Rakesh Sir,",
  letter: [
    "Wishing you a very Happy Birthday! May this year bring you good health, joy, and every success you work so hard for.",
    "In the short time I have worked with you, one thing stood out: you always listen first. Whether it is an idea, a concern, or a challenge, you hear us out before giving direction. That makes every one of us feel valued.",
    "Your calm nature and genuine guidance have shown me what real leadership looks like. Thank you for your trust, your patience, and for supporting my growth at Tecxpert.",
    "Your dedication to quality and reliability sets the standard for all of us. I am grateful to learn from you."
  ],
  from: "Mohit Kumar",
  fromRole: "Software Developer, Tecxpert Software Pvt. Ltd.",
  photoCaption: "Thank you for everything, Sir!",
  pageTitle: "Happy Birthday, Rakesh Sharma",
  company: "Tecxpert Software Pvt. Ltd., Noida",
  replyTitle: "Reply to Mohit",
  coverImage: "../images/cover.jpg",      // magazine cover photo (portrait works best)
  groupImage: "../images/together.jpeg",  // photo of you with him
  // Reply: create a form at formspree.io with ermohitk99@gmail.com, paste the ID (e.g. "xyzabcde")
  formspreeId: "xpwgnqbe",
  myEmail: "ermohitk99@gmail.com",
  subject: "Birthday wishes reply",
  quickReplies: ["Thank you so much, Mohit! 😊", "Really touched by your words. Keep growing!", "Thanks! Proud of your work too."]
};
/* ======================================== */

document.title=CONFIG.pageTitle;
document.documentElement.style.setProperty("--cover-img",`url("${CONFIG.coverImage}")`);
document.documentElement.style.setProperty("--group-img",`url("${CONFIG.groupImage}")`);
document.querySelectorAll("[data-edit]").forEach(e=>e.textContent=CONFIG[e.dataset.edit]);
document.getElementById("letter").innerHTML=CONFIG.letter.map(t=>`<p>${t.replace(/</g,"&lt;")}</p>`).join("");
document.getElementById("subj").value=CONFIG.subject;
document.querySelector("[name=name]").value=CONFIG.name;

/* book open / close + scaling (all sizes are px, the whole book is scaled to fit the screen) */
const book=document.getElementById("book"),navBtn=document.getElementById("navBtn");
let isOpen=false,view="L";
function layout(){
  const mobile=innerWidth<900;document.body.classList.toggle("mobile",mobile);
  let s,tx;
  if(mobile){s=Math.min(1,(innerWidth-24)/440,(innerHeight-100)/620);tx=!isOpen?-220:(view==="L"?220:-220)}
  else{s=Math.min(1,(innerWidth-40)/880,(innerHeight-80)/620);tx=isOpen?0:-220}
  book.style.setProperty("--s",s);book.style.setProperty("--tx",tx*s+"px");
}
function setOpen(v){
  isOpen=v;view="L";book.classList.toggle("open",v);document.body.classList.toggle("opened",v);
  navBtn.querySelector("span").textContent="See photo";layout();if(v)burst();
}
document.getElementById("openBtn").onclick=()=>setOpen(true);
document.getElementById("closeBtn").onclick=()=>setOpen(false);
navBtn.onclick=()=>{view=view==="L"?"R":"L";navBtn.querySelector("span").textContent=view==="L"?"See photo":"Read letter";layout()};
addEventListener("resize",layout);layout();

/* reply panel */
const panel=document.getElementById("panel"),form=document.getElementById("form"),st=document.getElementById("status");
document.getElementById("tab").onclick=()=>panel.classList.add("show");
document.getElementById("x").onclick=()=>panel.classList.remove("show");
const chips=document.getElementById("chips");
CONFIG.quickReplies.forEach(q=>{const b=document.createElement("button");b.type="button";b.textContent=q;b.onclick=()=>form.message.value=q;chips.appendChild(b)});
form.onsubmit=async e=>{
  e.preventDefault();
  if(CONFIG.formspreeId==="xpwgnqbe"){ // fallback until Formspree is set up
    location.href=`mailto:${CONFIG.myEmail}?subject=${encodeURIComponent(CONFIG.subject)}&body=${encodeURIComponent(form.message.value+"\n\n- "+form.name.value)}`;return;
  }
  st.textContent="Sending…";
  try{
    const r=await fetch("https://formspree.io/f/"+CONFIG.formspreeId,{method:"POST",body:new FormData(form),headers:{Accept:"application/json"}});
    if(!r.ok)throw 0;
    st.textContent="Sent! reply 🎉";form.reset();burst();
  }catch{st.textContent="Could not send. Please try again."}
};

/* background: balloons + floating icons */
const cols=["#d4af37","#f3d97a","#3b5fb5","#ffffff"];
for(let i=0;i<12;i++){const b=document.createElement("div");b.className="balloon";
  b.style.cssText=`left:${Math.random()*100}vw;background:${cols[i%4]};--dx:${(Math.random()-.5)*160}px;animation-duration:${14+Math.random()*14}s;animation-delay:${-Math.random()*20}s;transform:scale(${.7+Math.random()*.8})`;
  document.body.appendChild(b)}
const icons=["fa-cake-candles","fa-laptop-code","fa-code","fa-trophy","fa-star","fa-mug-hot","fa-rocket","fa-handshake","fa-gift","fa-lightbulb"];
icons.forEach((c,i)=>{const s=document.createElement("i");s.className=`fa-solid ${c} float-icon`;
  s.style.cssText=`left:${(i*10+Math.random()*6)%96}vw;top:${8+Math.random()*80}vh;font-size:${20+Math.random()*22}px;animation-delay:${-Math.random()*6}s`;
  document.body.appendChild(s)});

/* confetti */
const cv=document.getElementById("fx"),cx=cv.getContext("2d");let P=[];
const fit=()=>{cv.width=innerWidth;cv.height=innerHeight};fit();addEventListener("resize",fit);
const colors=["#d4af37","#f3d97a","#ffffff","#5b7fd6"];
function add(n,x,y,burst){for(let i=0;i<n;i++)P.push({x:x??Math.random()*cv.width,y:y??-10,vx:burst?(Math.random()-.5)*14:(Math.random()-.5)*1.2,vy:burst?-Math.random()*13-3:Math.random()*2+1,s:4+Math.random()*6,r:Math.random()*6,vr:(Math.random()-.5)*.3,c:colors[Math.random()*4|0]})}
function burst(){add(140,cv.width/2,cv.height/2,true)}
(function loop(){cx.clearRect(0,0,cv.width,cv.height);
  if(Math.random()<.25)add(1);
  P=P.filter(p=>p.y<cv.height+20);
  for(const p of P){p.x+=p.vx;p.y+=p.vy;p.vy+=p.vx&&Math.abs(p.vx)>1.3?.25:.01;p.r+=p.vr;
    cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;cx.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);cx.restore()}
  requestAnimationFrame(loop)})();
setTimeout(burst,600);
