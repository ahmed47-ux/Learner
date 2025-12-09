
/*
  LingoBox - front-end demo logic (all client-side, simulated)
  - Auth is simulated (localStorage)
  - Subscription is simulated (mock 'pay' button)
  - Weekly question packs unlock automatically (based on epoch week number)
  - Messaging & Calls are simulated: messages are in-app, calls are demo only
  - AI chat is local simulated replies; uses Speech Synthesis if available
*/

const LANGS = ["العربية","الإنجليزية","الصينية","الفرنسية","الألمانية","الالروسية","الإيطالية"];
const weeklyKey = 'lingo-week-unlocks';
const userKey = 'lingo-user';
const subKey = 'lingo-subscription';

// init page
document.addEventListener('DOMContentLoaded', ()=>{
  renderLangs();
  setupButtons();
  showHome();
  checkWeeklyUnlock();
});

function renderLangs(){
  const grid = document.getElementById('lang-grid');
  grid.innerHTML = '';
  LANGS.forEach(l=>{
    const card = document.createElement('div');
    card.className = 'lang-card card';
    card.innerHTML = `<h4>${l}</h4><p>دورة تجريبية - محتوى نموذجي</p><button class="open-course">افتح الدورة</button>`;
    card.querySelector('.open-course').onclick = ()=> openCourse(l);
    grid.appendChild(card);
  });
}

function setupButtons(){
  document.getElementById('btn-login').onclick = openLogin;
  document.getElementById('btn-profile').onclick = openProfile;
  document.getElementById('btn-training').onclick = openTraining;
  document.getElementById('start-training').onclick = ()=>{openTraining()};
  document.getElementById('btn-messages').onclick = openMessages;
  document.getElementById('btn-ai').onclick = openAIChat;
}

function showHome(){
  document.title = 'LingoBox - الرئيسية';
}

// Simple navigation rendering functions (single-page simplified)
function openLogin(){
  const html = `
    <div class="container">
      <div class="card">
        <h2>تسجيل / دخول (محلي - تجريبي)</h2>
        <p>استخدم أي اسم لتسجيل الدخول فوراً. تسجيلات التواصل الاجتماعي تعمل كمحاكاة.</p>
        <input id="name" placeholder="اسمك" style="padding:8px;margin-top:8px;width:100%"/>
        <div style="margin-top:8px;display:flex;gap:8px">
          <button id="btn-do-login">دخول</button>
          <button id="btn-google">دخول بـ Google (محاكاة)</button>
          <button id="btn-social">دخول عبرفيسبوك/تليجرام (محاكاة)</button>
        </div>
      </div>
    </div>
  `;
  document.body.innerHTML = document.body.innerHTML.split('<main')[0] + html + `<footer>© LingoBox - نسخة تجريبية</footer>`;
  document.getElementById('btn-do-login').onclick = ()=>{
    const name = document.getElementById('name').value || 'مستخدم';
    login({name});
  };
  document.getElementById('btn-google').onclick = ()=> login({name:'GoogleUser'});
  document.getElementById('btn-social').onclick = ()=> login({name:'SocialUser'});
}

function login(user){
  localStorage.setItem(userKey, JSON.stringify(user));
  alert('تم تسجيل الدخول كـ ' + user.name);
  location.reload();
}

function getUser(){ return JSON.parse(localStorage.getItem(userKey) || 'null'); }
function requireAuth(){ if(!getUser()){ openLogin(); throw 'auth_required'; } }

function openProfile(){
  try{
    requireAuth();
  }catch(e){ return; }
  const user = getUser();
  const sub = JSON.parse(localStorage.getItem(subKey) || 'null');
  const html = `
  <div class="container">
    <h2>الملف الشخصي - ${user.name}</h2>
    <div class="grid-page">
      <div class="card">
        <h3>الإعدادات</h3>
        <p>ساعات استخدام، لغات مفضلة، إشعارات</p>
        <button id="btn-logout">تسجيل خروج</button>
      </div>
      <div class="card">
        <h3>اشتراك</h3>
        <p>الحالة: ${sub ? 'مشترك' : 'غير مشترك'}</p>
        <button id="btn-buy">اشترك 15$ كل شهرين (محاكاة)</button>
      </div>
    </div>
  </div>
  `;
  document.body.innerHTML = document.body.innerHTML.split('<main')[0] + html + `<footer>© LingoBox - نسخة تجريبية</footer>`;
  document.getElementById('btn-logout').onclick = ()=>{ localStorage.removeItem(userKey); alert('تم الخروج'); location.reload();}
  document.getElementById('btn-buy').onclick = ()=>{
    localStorage.setItem(subKey, JSON.stringify({since:Date.now(), plan:'bi-monthly', price:15}));
    alert('تم تفعيل الاشتراك (محاكاة)');
    openProfile();
  }
}

function openTraining(){
  const user = JSON.parse(localStorage.getItem(userKey) || 'null');
  const html = `
  <div class="container">
    <h2>التدريب - الدورات</h2>
    <div class="grid-page" id="training-grid"></div>
  </div>
  `;
  document.body.innerHTML = document.body.innerHTML.split('<main')[0] + html + `<footer>© LingoBox - نسخة تجريبية</footer>`;
  const grid = document.getElementById('training-grid');
  LANGS.forEach(l=>{
    const d = document.createElement('div');
    d.className = 'card';
    d.innerHTML = `<h3>${l}</h3><p>تمارين، بطاقات، أسئلة</p><button class="open-q">افتح أسئلة هذا الأسبوع</button>`;
    d.querySelector('.open-q').onclick = ()=> openWeeklyQuiz(l);
    grid.appendChild(d);
  });
}

function openCourse(lang){
  openTraining();
  setTimeout(()=> alert('تم فتح صفحة الدورة لـ ' + lang + ' (ضغط على التدريب لعرض المواد)') ,200);
}

// Weekly unlocks: compute ISO week number (simple epoch week) and map to pack index
function weekNumber(){
  return Math.floor(Date.now()/(1000*60*60*24*7));
}

function checkWeeklyUnlock(){
  const current = weekNumber();
  const stored = JSON.parse(localStorage.getItem(weeklyKey) || '[]');
  if(!stored.includes(current)){
    stored.push(current);
    localStorage.setItem(weeklyKey, JSON.stringify(stored));
    console.log('Unlocked new weekly pack for week', current);
  }
}

function openWeeklyQuiz(lang){
  const unlocked = JSON.parse(localStorage.getItem(weeklyKey) || '[]');
  const lastWeek = unlocked[unlocked.length-1];
  const html = `
  <div class="container">
    <h2>أسئلة الأسبوع لـ ${lang}</h2>
    <div class="card">
      <ol id="q-list">
        <li>ما ترجمة كلمة "Hello"؟ <button class="ans">A: مرحبا</button></li>
        <li>اختر الفعل الصحيح: I ___ to school. <button class="ans">A: go</button></li>
        <li>ترجمة: "Good night" <button class="ans">A: تصبح على خير</button></li>
      </ol>
    </div>
  </div>
  `;
  document.body.innerHTML = document.body.innerHTML.split('<main')[0] + html + `<footer>© LingoBox - نسخة تجريبية</footer>`;
  document.querySelectorAll('.ans').forEach(b=> b.onclick = ()=> alert('إجابة محفوظة (تجريبي)'));
}

// Messages / Calls (simulated)
function openMessages(){
  try{ requireAuth(); }catch(e){ return; }
  const sub = JSON.parse(localStorage.getItem(subKey) || 'null');
  const canUse = sub || simulateTrialFor('messages', 7);
  const containerClass = (sub ? 'subscribed' : '');
  const html = `
  <div class="${containerClass} container">
    <h2>المراسلات & المكالمات</h2>
    <div class="card chat-window" id="chat-window">
      <div class="chat-logs" id="chat-logs"></div>
      <div class="chat-input">
        <input id="chat-text" placeholder="اكتب رسالة..."/>
        <button id="send-chat">إرسال</button>
      </div>
    </div>
    <div style="margin-top:8px">
      <button id="btn-start-call">محاكاة مكالمة صوتية</button>
      ${canUse ? '' : '<p>هذه الميزة انتهت - متاحة للأعضاء فقط. اشترك لتفعيلها.</p><button id="btn-upgrade">اشترك الآن</button>'}
    </div>
  </div>
  `;
  document.body.innerHTML = document.body.innerHTML.split('<main')[0] + html + `<footer>© LingoBox - نسخة تجريبية</footer>`;
  const logs = document.getElementById('chat-logs');
  document.getElementById('send-chat').onclick = ()=>{
    const t = document.getElementById('chat-text'); if(!t.value) return;
    const msg = domMessage(t.value,'you'); logs.appendChild(msg); t.value=''; logs.scrollTop = logs.scrollHeight;
    setTimeout(()=> logs.appendChild(domMessage('رد تجريبي من مستخدم بعيد: شكراً!','them')), 700);
  };
  document.getElementById('btn-start-call').onclick = ()=> alert('محاكاة مكالمة - في النسخة التجريبية المكالمة غير فعلية');
  const up = document.getElementById('btn-upgrade'); if(up) up.onclick = ()=>{ localStorage.setItem(subKey, JSON.stringify({since:Date.now(), plan:'bi-monthly', price:15})); alert('تم تفعيل الاشتراك (محاكاة)'); openMessages();}
}

function domMessage(text, who){
  const d = document.createElement('div'); d.style.padding='6px 10px'; d.style.marginBottom='8px';
  d.style.maxWidth='80%'; d.style.borderRadius='10px'; d.className='msg';
  if(who==='you'){ d.style.background='#e6f4ff'; d.style.marginLeft='auto'; d.innerText = text; } else { d.style.background='#f1f5f9'; d.innerText = text; }
  return d;
}

// Trial simulation helper: returns true if within trialDays from install (store timestamp)
function simulateTrialFor(feature, days){
  const name = 'trial-'+feature;
  const record = JSON.parse(localStorage.getItem(name) || 'null');
  if(!record){ localStorage.setItem(name, JSON.stringify({start:Date.now()})); return true; }
  const passed = Date.now() - record.start;
  return passed < days*24*60*60*1000;
}

// AI chat page (local simulated AI)
function openAIChat(){
  try{ requireAuth(); }catch(e){ return; }
  const sub = JSON.parse(localStorage.getItem(subKey) || 'null');
  const canUse = sub || simulateTrialFor('ai', 30);
  const html = `
  <div class="container ${sub ? 'subscribed' : ''}">
    <h2>محادثة مع الذكاء الاصطناعي - ${canUse ? 'مفتوحة' : 'اختبار انتهى'}</h2>
    <div style="display:flex;gap:12px;align-items:flex-start;">
      <div class="ai-avatar" id="ai-avatar">AI</div>
      <div style="flex:1">
        <div class="card chat-window" id="ai-window">
          <div class="chat-logs" id="ai-logs"></div>
          <div class="chat-input">
            <input id="ai-text" placeholder="تحدث أو اكتب الآن..." />
            <button id="ai-send">أرسل</button>
          </div>
        </div>
      </div>
    </div>
    ${canUse ? '' : '<p>انتهت الفترة المجانية. للاستخدام المستمر اشترك الآن.</p><button id="ai-upgrade">اشترك</button>'}
  </div>
  `;
  document.body.innerHTML = document.body.innerHTML.split('<main')[0] + html + `<footer>© LingoBox - نسخة تجريبية</footer>`;
  const logs = document.getElementById('ai-logs');
  document.getElementById('ai-send').onclick = ()=>{
    const t = document.getElementById('ai-text'); if(!t.value) return;
    logs.appendChild(domMessage(t.value,'you')); logs.scrollTop = logs.scrollHeight; const q = t.value; t.value='';
    emulateAIResponse(q, logs);
  };
  const up = document.getElementById('ai-upgrade'); if(up) up.onclick = ()=>{ localStorage.setItem(subKey, JSON.stringify({since:Date.now(), plan:'bi-monthly', price:15})); alert('تم تفعيل الاشتراك (محاكاة)'); openAIChat();}
}

function emulateAIResponse(userText, logs){
  const avatar = document.getElementById('ai-avatar');
  avatar.classList.add('ai-speaking');
  // Simple canned responses — replaceable with real AI backend later
  const reply = generateReply(userText);
  setTimeout(()=>{
    avatar.classList.remove('ai-speaking');
    logs.appendChild(domMessage(reply,'them'));
    logs.scrollTop = logs.scrollHeight;
    // speech synthesis
    if('speechSynthesis' in window){
      const u = new SpeechSynthesisUtterance(reply);
      speechSynthesis.cancel();
      u.lang = 'en-US'; // default — user can change
      speechSynthesis.speak(u);
    }
  }, 900);
}

function generateReply(text){
  // Very simple heuristics for demo
  text = text.toLowerCase();
  if(text.includes('hello')||text.includes('hi')) return 'Hello! How are you? Try answering in English.';
  if(text.includes('how')&&text.includes('you')) return "I'm a demo AI — try saying: 'I want to practice speaking'.";
  if(text.includes('i want') || text.includes('practice')) return "Great! Let's practice. Tell me about your day in English.";
  // fallback: echo + small correction demo
  return "You said: \"" + text.slice(0,120) + "\" — Try expanding this sentence by adding why or when.";
}

// For quick demo: restore index view (simplified)
function restoreIndex(){
  fetch('index.html').then(r=>r.text()).then(t=>{ document.open(); document.write(t); document.close(); });
}
// expose to global for ease in demo
window.restoreIndex = restoreIndex;
