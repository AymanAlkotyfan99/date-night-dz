(() => {
  'use strict';
  const C = window.DATE_CONFIG;
  const app = document.querySelector('#app');
  const KEY = 'date-night-progress';
  const emotions = ['neutral','suspicious','angry','shocked','happy','exhausted','proud','mischievous'];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const strings = a => Array.isArray(a) && a.length > 0 && a.every(v => typeof v === 'string' && v.trim());
  const correctIds = stage => stage.correctIds ?? [stage.correctId];
  const isCorrect = (stage, id) => correctIds(stage).includes(id);
  function validate() {
    const errors = [];
    if (!C || !C.version || !C.title) return ['Missing configuration, title, or version.'];
    if (!C.opening || !strings(C.opening.noMessages) || !strings(C.opening.success) || !strings(C.opening.escapeStyles) || !strings(C.opening.emotions)) errors.push('Opening reaction arrays must contain text.');
    for (const key of ['question','subtitle','yesLabel','noLabel','intro','approval']) if (!C.opening?.[key]) errors.push(`Opening: missing ${key}.`);
    if (!Array.isArray(C.stages) || C.stages.length !== 4) errors.push('Exactly four stages are required.');
    else {
      if (new Set(C.stages.map(s => s.id)).size !== 4) errors.push('Stage IDs must be unique.');
      C.stages.forEach(s => {
        if (!s.id || !s.title || !s.short || !s.success) errors.push(`Stage ${s.id}: required content missing.`);
        if (!Array.isArray(s.options) || s.options.length < 2) { errors.push(`Stage ${s.id}: at least two options required.`); return; }
        if (new Set(s.options.map(o => o.id)).size !== s.options.length) errors.push(`Stage ${s.id}: duplicate option IDs.`);
        const accepted = correctIds(s);
        if (!strings(accepted) || new Set(accepted).size !== accepted.length || !accepted.every(id => s.options.some(o => o.id === id))) {
          errors.push(`Stage ${s.id}: correctId/correctIds must reference existing, unique option IDs.`);
          return;
        }
        s.options.forEach(o => {
          if (!o.id || !o.label) errors.push(`Stage ${s.id}: option needs ID and label.`);
          if (!isCorrect(s,o.id) && (!strings(o.messages) || o.messages.length < 3)) errors.push(`${s.id}/${o.id}: three incorrect responses required.`);
          if (!emotions.includes(o.emotion)) errors.push(`${s.id}/${o.id}: unknown emotion.`);
        });
      });
    }
    for (const key of ['heading','greeting','subtitle','seal','closing','punchline','message','whatsappLabel','restartLabel']) if (!C.finale?.[key]) errors.push(`Finale: missing ${key}.`);
    if (!Array.isArray(C.comedy?.levels) || !C.comedy.levels.length || !Array.isArray(C.comedy?.events)) errors.push('Comedy levels and events are required.');
    if (C.wifePhone && !/^[1-9]\d{6,14}$/.test(C.wifePhone)) errors.push('wifePhone must be 7–15 international digits, with no + or leading zero. Leave empty until configured.');
    return errors;
  }
  const errors = validate();
  if (errors.length) {
    app.innerHTML = `<section class="diagnostic"><h1 style="font-size:26px">في شي بالإعدادات بدو تصليح 🔧</h1><p>راجع config.js:</p><ul dir="ltr">${errors.map(e => `<li>${esc(e)}</li>`).join('')}</ul></section>`;
    console.error('Date Night configuration:', errors); return;
  }
  // A content fingerprint also invalidates saved answers when version was not bumped.
  const signature = JSON.stringify([C.version,C.stages.map(s => [s.id,correctIds(s),s.options.map(o => [o.id,o.label])])]);
  const blank = () => ({signature,accepted:false,answers:[],noAttempts:0,optionAttempts:{},stageAttempts:{},wrong:0,events:[],sound:Boolean(C.soundDefault)});
  const count = n => Number.isSafeInteger(n) && n >= 0 && n < 1000000;
  function restore() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY));
      if (!s || s.signature !== signature || typeof s.accepted !== 'boolean' || !Array.isArray(s.answers) || s.answers.length > 4 || (!s.accepted && s.answers.length)) return blank();
      if (!s.answers.every((id,i) => isCorrect(C.stages[i],id))) return blank();
      if (![s.noAttempts,s.wrong].every(count) || !s.optionAttempts || !s.stageAttempts || !Array.isArray(s.events)) return blank();
      if (![...Object.values(s.optionAttempts),...Object.values(s.stageAttempts)].every(count)) return blank();
      if (Object.values(s.optionAttempts).reduce((a,b)=>a+b,0) !== s.wrong || Object.values(s.stageAttempts).reduce((a,b)=>a+b,0) !== s.wrong) return blank();
      return {...blank(),...s,sound:Boolean(s.sound),events:s.events.filter(e => typeof e === 'string')};
    } catch { return blank(); }
  }
  let state = restore(), locked = false, screen = '', cleanup = () => {}, toastTimer, audio;
  function save() { try { localStorage.setItem(KEY,JSON.stringify(state)); } catch { /* Private browsing can disable storage; play remains available. */ } }
  function toast(message) { const el = document.querySelector('#toast'); clearTimeout(toastTimer); el.textContent = message; el.classList.add('visible'); toastTimer = setTimeout(()=>el.classList.remove('visible'),4200); }
  function sound(kind) {
    if (!state.sound) return;
    try {
      audio ||= new (window.AudioContext || window.webkitAudioContext)();
      if (audio.state === 'suspended') audio.resume().catch(()=>{});
      const oscillator = audio.createOscillator(), gain = audio.createGain(), now = audio.currentTime;
      oscillator.type = 'sine'; oscillator.frequency.setValueAtTime(kind === 'success' ? 520 : 260,now);
      oscillator.frequency.exponentialRampToValueAtTime(kind === 'success' ? 850 : 140,now+.14);
      gain.gain.setValueAtTime(.055,now); gain.gain.exponentialRampToValueAtTime(.001,now+.2);
      oscillator.connect(gain); gain.connect(audio.destination); oscillator.start(); oscillator.stop(now+.22);
    } catch { /* Audio is optional. */ }
  }
  function syncSound() { const b = document.querySelector('#sound'); b.setAttribute('aria-pressed',String(state.sound)); b.setAttribute('aria-label',state.sound?'سكّر الصوت':'شغّل الصوت'); b.querySelector('span').hidden=state.sound; }
  document.querySelector('#sound').addEventListener('click',()=>{ state.sound=!state.sound; syncSound(); save(); sound('success'); });
  document.title=C.title; document.querySelector('#credit').textContent=C.branding?.credit || '';
  for (const key of ['coral','lavender']) if (/^#[\da-f]{6}$/i.test(C.branding?.[key])) document.documentElement.style.setProperty(`--${key}`,C.branding[key]);
  syncSound();
  function mascot(emotion='neutral') {
    return `<button class="mascot-button" data-emotion="${emotion}" aria-label="احكي مع مفتّش الطلعات"><svg class="mascot-svg" viewBox="0 0 320 310" aria-hidden="true"><use href="assets/mascot.svg#inspector"/><use class="face" href="assets/mascot.svg#${emotion}"/></svg></button>`;
  }
  function setEmotion(emotion) { if (!emotions.includes(emotion)) emotion='neutral'; const m=app.querySelector('.mascot-button'); if(m){m.dataset.emotion=emotion;m.querySelector('.face').setAttribute('href',`assets/mascot.svg#${emotion}`);} }
  function confetti() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root=document.querySelector('#particles');
    for(let i=0;i<22;i++){const p=document.createElement('span');p.className='particle';p.textContent=i%3===0?'♥':'✦';p.style.color=['#e95379','#9971d4','#d8a431','#319579'][i%4];p.style.setProperty('--x',`${(Math.random()-.5)*Math.min(innerWidth,720)}px`);p.style.setProperty('--y',`${Math.random()*450-170}px`);p.style.setProperty('--r',`${Math.random()*540}deg`);root.append(p);setTimeout(()=>p.remove(),1100);}
  }
  function mount(html,nextScreen,focus=true) {
    cleanup();cleanup=()=>{};screen=nextScreen;app.innerHTML=html;locked=false;
    app.querySelector('.mascot-button')?.addEventListener('click',()=>{if(C.comedy.secretsEnabled){toast(C.comedy.inspectorMessage);setEmotion('mischievous');if(!state.events.includes('inspector')){state.events.push('inspector');save();}}});
    if(focus){app.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});}
  }
  const top = label => `<div class="scene-top"><span class="eyebrow" dir="ltr">${label}</span><span class="file-number" dir="ltr">FILE № 001 / ♡</span></div>`;
  function renderOpening(focus=true) {
    mount(`<section class="scene opening">${top('DATE NIGHT — YOUR CHOICE (NOT REALLY)')}<div class="opening-grid"><div class="invitation"><div class="paper-label">${esc(C.opening.label)}</div><h1>${esc(C.opening.question)} <span class="headline-heart" aria-hidden="true">♡</span></h1><p class="subtitle">${esc(C.opening.subtitle)}</p><div class="playground"><button class="primary yes">${esc(C.opening.yesLabel)}</button><button class="no" aria-describedby="no-help"><span>${esc(C.opening.noLabel)}</span></button></div><p class="choice-note" id="no-help">اختار براحتك… بس في جواب أحلى من التاني</p><p class="no-warning" aria-live="polite">${state.noAttempts>=C.opening.warningThreshold?esc(C.opening.warning):''}</p></div><div class="art-area"><span class="spark spark-one" aria-hidden="true">✧</span><div class="speech" role="status">${esc(C.opening.intro)}</div><div class="mascot-paper">${mascot()}<div class="mascot-caption">مفتّش الطلعات • قسم إسعاد الحبيبة</div></div><span class="sticker secret-sticker" dir="ltr">TOP SECRET<br>LOVE AFFAIRS</span><span class="sticker love-sticker" aria-hidden="true">♡</span><span class="spark spark-two" aria-hidden="true">✳</span><span class="hand-note">المفتّش شايف كل شي ↗</span></div></div><div class="rules-strip"><p>رأيك مهم إلنا… بس مو لهالدرجة 😂</p><span class="mini-heart" aria-hidden="true">♡</span><span>جميع القرارات خاضعة لموافقة الإدارة العليا.</span></div><div class="lower-notes"><span>٤ قرارات صغيرة</span><b>·</b><span>طلعة كبيرة</span><b>·</b><span>حرية اختيار… تقريباً</span></div></section>`,'OPENING',focus);
    const area=app.querySelector('.playground'), no=app.querySelector('.no'), yes=app.querySelector('.yes');
    let position={x:12,y:53}, last=-1000, pointerHandled=0;
    function destinations(){
      const w=area.clientWidth,h=area.clientHeight,nw=no.offsetWidth,nh=no.offsetHeight;
      const yr={x:yes.offsetLeft,y:yes.offsetTop,w:yes.offsetWidth,h:yes.offsetHeight};
      const gap=12,pad=5,points=[];
      for(const x of [pad,Math.max(pad,yr.x-nw-gap),w-nw-pad]) for(const y of [pad,Math.round((h-nh)/2),h-nh-pad]){
        if(x>=pad&&x+nw<=w-pad&&y>=pad&&y+nh<=h-pad&&(x+nw+gap<=yr.x||x>=yr.x+yr.w+gap||y+nh+gap<=yr.y||y>=yr.y+yr.h+gap)) points.push({x,y});
      }
      return points;
    }
    function place(p){position=p;no.style.transform=`translate(${p.x}px,${p.y}px)`;}
    function resize(){const points=destinations();place(points.reduce((a,b)=>Math.hypot(b.x-position.x,b.y-position.y)<Math.hypot(a.x-position.x,a.y-position.y)?b:a,points[0]||{x:5,y:5}));}
    function deny(move){
      if(locked||screen!=='OPENING')return;
      const now=performance.now();if(now-last<350)return;last=now;
      state.noAttempts++;save();
      app.querySelector('.speech').textContent=C.opening.noMessages[(state.noAttempts-1)%C.opening.noMessages.length];
      setEmotion(C.opening.emotions[Math.min(Math.floor((state.noAttempts-1)/2),C.opening.emotions.length-1)]);
      if(state.noAttempts>=C.opening.warningThreshold)app.querySelector('.no-warning').textContent=C.opening.warning;
      if(move){const choices=destinations().filter(p=>Math.hypot(p.x-position.x,p.y-position.y)>30);if(choices.length){const next=choices[Math.floor(Math.random()*choices.length)];no.dataset.motion=C.opening.escapeStyles[(state.noAttempts-1)%C.opening.escapeStyles.length];place(next);}}
      sound('no');
    }
    no.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')deny(true);});
    no.addEventListener('pointerdown',e=>{if(e.button!==0)return;e.preventDefault();pointerHandled=performance.now();deny(true);});
    no.addEventListener('click',e=>{e.preventDefault();if(e.detail===0){deny(false);}else if(performance.now()-pointerHandled>500)deny(true);});
    yes.addEventListener('click',()=>{if(locked)return;locked=true;state.accepted=true;save();sound('success');renderOpeningSuccess();});
    const observer=new ResizeObserver(resize);observer.observe(area);resize();cleanup=()=>observer.disconnect();
  }
  function renderOpeningSuccess(){
    mount(`<section class="scene success-scene">${mascot('happy')}<div class="big-stamp">${esc(C.opening.approval)} ✓</div><h1>${esc(C.opening.success[0])}</h1><p>${esc(C.opening.success.slice(1).join(' '))}</p><button class="primary next-button">يلا نخطّط الطلعة ←</button></section>`,'OPENING_SUCCESS');confetti();
    app.querySelector('.next-button').addEventListener('click',()=>renderStage());
  }
  function meter(){const level=[...C.comedy.levels].reverse().find(l=>state.wrong>=l.at)||C.comedy.levels[0];return `<div class="meter-label"><span>مؤشر النكد الزوجي</span><span>${esc(level.text)}</span></div><div class="meter-track" role="meter" aria-label="مؤشر النكد الزوجي" aria-valuemin="0" aria-valuemax="12" aria-valuenow="${Math.min(state.wrong,12)}" aria-valuetext="${esc(level.text)}"><div class="meter-fill" style="width:${Math.min(100,5+state.wrong/12*95)}%"></div></div>`;}
  function renderStage(){
    if(state.answers.length===4){renderFinale();return;}
    const index=state.answers.length,s=C.stages[index];
    mount(`<section class="scene planning">${top('THE DATE FILE / LET’S MAKE PLANS')}<ol class="progress" aria-label="مراحل تخطيط الطلعة">${C.stages.map((stage,i)=>`<li class="${i<index?'done':i===index?'active':''}" ${i===index?'aria-current="step"':''}><span class="step-num">${i<index?'✓':i+1}</span>${esc(stage.short)}</li>`).join('')}</ol><div class="stage-layout"><div class="stage-main"><h1 class="stage-heading"><span class="stage-title-icon">${esc(s.icon)}</span> ${esc(s.title)}</h1><p class="stage-subtitle">${esc(s.subtitle)}</p><div class="options">${s.options.map((o,i)=>`<button class="option" data-option="${i}"><span class="option-icon" aria-hidden="true">${esc(o.icon)}</span><strong>${esc(o.label)}</strong><small>${esc(o.note||'')}</small></button>`).join('')}</div><div class="feedback" role="status">اختار بقلبك… المفتّش ناطر قرارك ♡</div></div><aside class="stage-aside"><div class="speech" role="status">القرار ${index+1} من ٤… عندك كامل الحرية نظرياً 😌</div>${mascot()}<div class="mascot-caption">مفتّش الطلعات</div></aside></div><div class="stage-bottom"><div class="meter">${meter()}</div>${C.comedy.secretsEnabled?`<button class="text-button freedom">${esc(C.comedy.freedomLabel)}</button>`:''}</div><div class="continue-slot"></div><div class="lower-notes">جميع القرارات خاضعة لموافقة الإدارة العليا.</div></section>`,'STAGE');
    app.querySelectorAll('.option').forEach(b=>b.addEventListener('click',()=>choose(s,s.options[Number(b.dataset.option)],b,index)));
    app.querySelector('.freedom')?.addEventListener('click',()=>{toast(C.comedy.freedomMessage);setEmotion('suspicious');const feedback=app.querySelector('.feedback');feedback.textContent=`مرفوض ✕ — ${C.comedy.freedomMessage}`;feedback.classList.remove('shake');void feedback.offsetWidth;feedback.classList.add('shake');if(!state.events.includes('freedom')){state.events.push('freedom');save();}});
  }
  function choose(s,o,button,index){
    if(locked||index!==state.answers.length||screen!=='STAGE')return;
    const feedback=app.querySelector('.feedback');
    app.querySelectorAll('.option').forEach(b=>b.classList.remove('rejected','shake','tilt','bounce'));
    if(isCorrect(s,o.id)){
      locked=true;state.answers.push(o.id);save();button.classList.add('approved',s.animation||'bounce');
      app.querySelectorAll('.option').forEach(b=>b.disabled=true);setEmotion(s.emotion);feedback.classList.add('success');feedback.textContent=`معتمد ✓ — ${s.success}`;
      app.querySelector('.speech').textContent=state.stageAttempts[s.id]?C.comedy.confidence:s.success;
      sound('success');confetti();
      app.querySelector('.continue-slot').innerHTML=`<button class="primary next-button">${index===3?'استلم تصريح الطلعة 💌':'ع القرار اللي بعده ←'}</button>`;
      const next=app.querySelector('.next-button');next.addEventListener('click',()=>{if(screen!=='STAGE')return;if(index===3)renderFinalTransition();else renderStage();});next.focus({preventScroll:true});
    }else{
      locked=true;const key=`${s.id}/${o.id}`,n=state.optionAttempts[key]||0;
      state.optionAttempts[key]=n+1;state.stageAttempts[s.id]=(state.stageAttempts[s.id]||0)+1;state.wrong++;
      button.classList.add('rejected',o.reaction||'shake');feedback.classList.remove('success');feedback.textContent=`مرفوض ✕ — ${o.messages[n%o.messages.length]}${o.secondary?' '+o.secondary:''}`;setEmotion(o.emotion);
      app.querySelector('.speech').textContent=o.messages[n%o.messages.length];
      const event=C.comedy.events.find(e=>state.wrong>=e.at&&!state.events.includes(e.id));
      let emotionTimer;
      if(event){state.events.push(event.id);toast(event.message);setEmotion(event.emotion);emotionTimer=setTimeout(()=>{if(screen==='STAGE'&&state.answers.length===index)setEmotion('neutral');},2400);}
      app.querySelector('.meter').innerHTML=meter();save();sound('no');
      const timer=setTimeout(()=>{locked=false;},430);cleanup=()=>{clearTimeout(timer);clearTimeout(emotionTimer);};
    }
  }
  function renderFinalTransition(){mount(`<section class="scene success-scene">${mascot('proud')}<div class="big-stamp">الملف مكتمل ✓</div><h1>${esc(C.finale.greeting)}</h1><p>${esc(C.finale.punchline)}</p><p class="romantic">${esc(C.finale.closing)}</p><button class="primary next-button">فرجيني التصريح 💌</button></section>`,'FINALE_TRANSITION');confetti();app.querySelector('.next-button').addEventListener('click',renderFinale);}
  function selected(){return C.stages.map((s,i)=>s.options.find(o=>o.id===state.answers[i]));}
  function invitation(){const values={wife:C.wifeName,husband:C.husbandName};C.stages.forEach((s,i)=>values[s.id]=selected()[i].label);return C.finale.message.replace(/\{([^}]+)\}/g,(_,key)=>values[key]??'');}
  function renderFinale(){
    if(state.answers.length!==4){renderStage();return;}
    const answers=selected();
    mount(`<section class="scene finale">${top('MISSION ACCOMPLISHED / WITH LOVE')}<div class="finale-mascot">${mascot('proud')}</div><h1>${esc(C.finale.greeting)}</h1><p class="subtitle">${esc(C.finale.subtitle)}</p><article class="ticket"><div class="ticket-top"><div><small dir="ltr">OFFICIAL DATE TICKET</small><h2 class="ticket-heading">${esc(C.finale.heading)}</h2></div><span class="ticket-heart" aria-hidden="true">♡</span></div><div class="ticket-grid">${C.stages.map((s,i)=>`<div class="ticket-field"><small>${esc(s.short)}</small><strong>${esc(answers[i].icon)} ${esc(answers[i].label)}</strong></div>`).join('')}</div><div class="ticket-bottom"><div><p class="ticket-stats">٤ قرارات معتمدة · ${state.wrong} اعتراض مرفوض<br>${state.noAttempts} محاولة هروب… وآخرتنا سوا ♡</p><div class="barcode" aria-hidden="true"></div></div><div class="ticket-seal">${esc(C.finale.seal)}</div></div></article><p class="romantic">${esc(C.finale.closing)}</p><button class="primary whatsapp">${esc(C.finale.whatsappLabel)}</button><div class="final-actions"><button class="text-button copy">انسخ تفاصيل الموعد</button><button class="text-button restart">${esc(C.finale.restartLabel)}</button></div><div class="copy-fallback"></div><p class="lower-notes">${esc(C.finale.punchline)}</p></section>`,'DATE_TICKET');
    app.querySelector('.whatsapp').addEventListener('click',()=>{
      if(!/^[1-9]\d{6,14}$/.test(C.wifePhone)){toast('رقم الحبيبة لسا مو مضاف. انسخ الدعوة وابعثها إلها بحب 💌');return;}
      const url=`https://wa.me/${C.wifePhone}?text=${encodeURIComponent(invitation())}`;
      window.open(url,'_blank','noopener,noreferrer');
    });
    app.querySelector('.copy').addEventListener('click',async()=>{
      try{if(!navigator.clipboard)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText(invitation());toast('تم نسخ الدعوة… يلا ابعت الحب 💌');}
      catch{app.querySelector('.copy-fallback').innerHTML='<label for="invitation-copy">انسخ هالدعوة يدويّاً 💌</label><textarea id="invitation-copy" class="manual-copy" readonly></textarea>';const t=app.querySelector('textarea');t.value=invitation();t.focus();t.select();toast('النسخ التلقائي مو متاح. الدعوة جاهزة لتنسخها يدويّاً.');}
    });
    app.querySelector('.restart').addEventListener('click',()=>{const pref=state.sound;state=blank();state.sound=pref;save();document.querySelector('#toast').classList.remove('visible');renderOpening();});
  }
  if(!state.accepted)renderOpening(false);else if(state.answers.length<4)renderStage();else renderFinale();
})();
