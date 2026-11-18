"use strict";
const TEAM_ID = '5';
const CHAIN_ID = 'B';
const DATAPIPE_EXPERIMENT_ID = 'tBMiWjIWmNnK';
const NEXT_PROJECT_URL = ''; // Set to Team 6's public GitHub Pages URL before the chain goes live.
const params = new URLSearchParams(window.location.search);
const sessionId = params.get('sid');
const validSession = /^[A-Za-z0-9_-]+$/.test(sessionId ?? '') && params.get('chain') === CHAIN_ID;
const app=document.getElementById('app'),step=document.getElementById('step');
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const conditions=['control','misinformation','correction'];
const session={id:sessionId,condition:conditions[Math.floor(Math.random()*3)],started:null,answers:[],lineup:null,elapsed:0};
const scenes=Array.from({length:8},(_,i)=>`images/scene-${i+1}.jpg`);
const details=[
 {q:'What color was the suspect’s outer clothing?',opts:['Black','Red','Blue','White'],correct:0,mis:1},
 {q:'Where did the incident take place?',opts:['Campus outdoor seating area','Inside a library','Parking garage','Gymnasium'],correct:0,mis:1},
 {q:'What item was taken?',opts:['A backpack','A bicycle','A laptop computer','A phone'],correct:0,mis:2},
 {q:'What was the suspect carrying as he walked away?',opts:['A backpack','A suitcase','A helmet','An umbrella'],correct:0,mis:1},
 {q:'Was the scene indoors or outdoors?',opts:['Outdoors','Indoors'],correct:0,mis:null},
 {q:'Was another person visible near the suspect?',opts:['Yes','No'],correct:0,mis:null},
 {q:'Did the suspect appear to walk away from the seating area?',opts:['Yes','No'],correct:0,mis:null},
 {q:'Was the setting a campus-like environment?',opts:['Yes','No'],correct:0,mis:null}
];
let slide=0,question=0,choice=null,confidence=70,faceChoice=null,faceConfidence=70;
function render(html,label){app.innerHTML=`<section class="panel">${html}</section>`;step.textContent=label;window.scrollTo(0,0)}
function intro(){render(`<h1>Memory on Trial</h1><p class="muted">An interactive eyewitness memory experiment</p><p>You will view eight staged photographs of a fictional incident, complete a short task, read a second witness report, and answer questions about what you saw.</p><p>Try to remember the <strong>original photographs</strong>. Some later information may not be reliable. You may choose “Suspect not present” in the lineup.</p><div class="notice"><strong>Voluntary pilot:</strong> Your study responses are saved with an anonymous session ID. No names or emails are requested. Do not use for formal research recruitment until your instructor approves the protocol and data workflow.</div><div class="actions"><button id="start">Begin experiment</button></div>`,'Welcome');document.getElementById('start').onclick=()=>{session.started=new Date().toISOString();slide=0;showScene()}}
function showScene(){render(`<p class="counter">Photograph ${slide+1} of 8</p><div class="progress"><div class="bar" style="width:${(slide+1)/8*100}%"></div></div><h2>Observe the incident</h2><p>Look carefully at the photograph. You will not be able to return to it.</p><img class="scene" src="${scenes[slide]}" alt="Staged fictional campus incident, photograph ${slide+1}"><p class="muted">The next photograph will appear automatically after 5 seconds.</p><button disabled id="next">Continue</button>`,'Observe');let current=slide;setTimeout(()=>{if(slide!==current||!document.getElementById('next'))return;document.getElementById('next').disabled=false;document.getElementById('next').textContent=slide===7?'Continue to distractor':'Next photograph';document.getElementById('next').onclick=()=>{slide++;slide<8?showScene():distractor()}},5000)}
function distractor(){let remaining=30,num=483+Math.floor(Math.random()*300);render(`<h2>Brief distractor task</h2><p>Starting at <strong>${num}</strong>, count backward by 3. Type each next number separated by spaces. Continue until the timer ends.</p><p class="counter">Time remaining: <span id="seconds">30</span>s</p><textarea id="counts" rows="4" style="width:100%;padding:12px" aria-label="Counting responses"></textarea><p class="muted">This task will advance automatically.</p>`,'Distractor');const timer=setInterval(()=>{remaining--;const el=document.getElementById('seconds');if(!el){clearInterval(timer);return}el.textContent=remaining;if(remaining<=0){clearInterval(timer);report()}},1000)}
function report(){const bad=session.condition!=='control';const text=bad?'The individual was wearing a red jacket and took a laptop computer near the library entrance. The individual left carrying a suitcase.':'The individual wore dark outer clothing and took a backpack from an outdoor campus seating area. The individual walked away with the bag.';render(`<h2>Second witness report</h2><p>Another observer provided the following account. Read it carefully before proceeding.</p><div class="notice">“${text}”</div><div class="actions"><button id="continue">Continue</button></div>`,'Witness report');document.getElementById('continue').onclick=()=>session.condition==='correction'?correction():lineup()}
function correction(){render(`<h2>Important correction</h2><p>The second witness's account was checked against the original event record. Three details in that report were incorrect:</p><div class="notice"><p>The clothing was <strong>dark/black</strong>, not red. The item taken was a <strong>backpack</strong>, not a laptop. The incident occurred at an <strong>outdoor campus seating area</strong>, not the library entrance. The suspect walked away carrying a <strong>backpack</strong>, not a suitcase.</p></div><p>When answering, distinguish what you saw in the original photographs from what you later read.</p><button id="continue">Continue</button>`,'Correction');document.getElementById('continue').onclick=lineup}
function lineup(){const order=shuffle([1,2,3,4,5,6]);faceChoice=null;faceConfidence=70;render(`<h2>Identify the individual</h2><p>Select the person who took the bag in the original photographs, or choose <strong>Suspect not present</strong>. The lineup position is randomized.</p><div class="lineup">${order.map((id,i)=>`<button class="face" data-face="${id}" aria-label="Lineup person ${i+1}"><img src="images/face-${id}.jpg" alt="Fictional lineup portrait ${i+1}"><strong>Person ${i+1}</strong></button>`).join('')}</div><label class="choice"><input type="radio" name="absent" id="absent"> Suspect not present</label><p>How confident are you? <strong id="pct">70%</strong></p><input class="range" id="conf" type="range" min="0" max="100" step="5" value="70"><div class="actions"><button id="submit" disabled>Confirm identification</button></div>`,'Lineup');document.querySelectorAll('[data-face]').forEach(el=>el.onclick=()=>{faceChoice=Number(el.dataset.face);document.getElementById('absent').checked=false;document.querySelectorAll('.face').forEach(x=>x.classList.toggle('selected',x===el));document.getElementById('submit').disabled=false});document.getElementById('absent').onchange=()=>{faceChoice=0;document.querySelectorAll('.face').forEach(x=>x.classList.remove('selected'));document.getElementById('submit').disabled=false};document.getElementById('conf').oninput=e=>document.getElementById('pct').textContent=e.target.value+'%';document.getElementById('submit').onclick=()=>{session.lineup={selected:faceChoice,correct:faceChoice===1,confidence:Number(document.getElementById('conf').value),target_present:true};question=0;showQuestion()}}
function showQuestion(){const d=details[question];choice=null;render(`<p class="counter">Memory question ${question+1} of ${details.length}</p><div class="progress"><div class="bar" style="width:${(question+1)/details.length*100}%"></div></div><h2>${d.q}</h2><div class="choices">${d.opts.map((opt,i)=>`<label class="choice"><input type="radio" name="answer" value="${i}">${opt}</label>`).join('')}</div><p>How confident are you? <strong id="pct">70%</strong></p><input class="range" id="conf" type="range" min="0" max="100" step="5" value="70"><div class="actions"><button id="submit" disabled>${question===details.length-1?'Submit final answer':'Next question'}</button></div>`,'Memory test');document.querySelectorAll('[name=answer]').forEach(el=>el.onchange=()=>{choice=Number(el.value);document.getElementById('submit').disabled=false});document.getElementById('conf').oninput=e=>document.getElementById('pct').textContent=e.target.value+'%';document.getElementById('submit').onclick=()=>{session.answers.push({item:question+1,question:d.q,choice,answer_text:d.opts[choice],correct_choice:d.correct,correct:choice===d.correct,misinformation_lure:d.mis!==null&&choice===d.mis,confidence:Number(document.getElementById('conf').value)});question++;question<details.length?showQuestion():results()}}
function results(){const correct=session.answers.filter(a=>a.correct).length,lures=session.answers.filter(a=>a.misinformation_lure).length;session.finished=new Date().toISOString();render(`<h1>Your eyewitness results</h1><div class="stats"><div class="stat">Event detail accuracy<strong>${Math.round(correct/details.length*100)}%</strong>${correct} of ${details.length} correct</div><div class="stat">Lineup identification<strong>${session.lineup.correct?'Correct':'Incorrect'}</strong>Confidence: ${session.lineup.confidence}%</div><div class="stat">Misleading details selected<strong>${lures}</strong>Out of 4 misinformation-sensitive items</div><div class="stat">Study condition<strong style="font-size:18px">${session.condition}</strong>Assigned at random</div></div><h2>What does this mean?</h2><p>Memory is reconstructive. Information encountered after an event can influence later answers, and high confidence does not guarantee accuracy. A correction may reduce reliance on misleading details but does not necessarily restore an original memory.</p><div class="notice"><strong>Study note:</strong> One participant's score cannot demonstrate a misinformation effect. Comparing groups requires sufficient participants, appropriate analysis, and approved data collection. The lineup is an exploratory measure and must be pilot-validated before research use.</div><div id="save-status" role="status"></div><div id="save-actions" class="actions"></div>`,'Results');

  const identifiers = {session_id: session.id, team_id: TEAM_ID, chain_id: CHAIN_ID, condition: session.condition};
  const summary = {
    ...identifiers, session_start: session.started, session_end: session.finished,
    detail_correct: correct, detail_total: details.length, misinformation_lures: lures,
    lineup_selected: session.lineup.selected, lineup_correct: session.lineup.correct,
    lineup_confidence: session.lineup.confidence
  };
  const trials = session.answers.map(answer => ({...identifiers, ...answer}));
  const files = [
    {name: `summary_${session.id}.csv`, csv: toCsv([summary]), label: 'Download summary CSV'},
    {name: `trials_${session.id}.csv`, csv: toCsv(trials), label: 'Download trial CSV'}
  ];
  saveResults(files);
}

function toCsv(rows) {
  const keys = Object.keys(rows[0]);
  const escape = value => '"' + String(value ?? '').replaceAll('"', '""') + '"';
  return [keys.join(','), ...rows.map(row => keys.map(key => escape(row[key])).join(','))].join('\r\n');
}

async function upload(file, retry) {
  const response = await fetch('https://pipe.jspsych.org/api/data/', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({experimentID: DATAPIPE_EXPERIMENT_ID, filename: file.name, data: file.csv})
  });
  if (response.status === 201 || response.status === 202) return;
  const body = await response.json().catch(() => ({}));
  if (retry && response.status === 400 && body.error === 'FILE_EXISTS') return;
  throw new Error(body.error || `HTTP_${response.status}`);
}

function download(file) {
  const url = URL.createObjectURL(new Blob([file.csv], {type: 'text/csv;charset=utf-8'}));
  const link = document.createElement('a');
  link.href = url;
  link.download = file.name;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function saveResults(files) {
  const status = document.getElementById('save-status');
  const actions = document.getElementById('save-actions');
  const accepted = new Set();
  const attempted = new Set();

  async function save() {
    actions.replaceChildren();
    status.textContent = 'Saving…';
    try {
      for (const file of files) {
        if (accepted.has(file.name)) continue;
        const retry = attempted.has(file.name);
        attempted.add(file.name);
        await upload(file, retry);
        accepted.add(file.name);
      }
    } catch (error) {
      console.error('DataPipe save failed', error);
      status.textContent = 'Saving failed. Retry or download your CSVs before closing this page.';
      const retryButton = document.createElement('button');
      retryButton.textContent = 'Retry saving';
      retryButton.onclick = save;
      actions.append(retryButton);
      for (const file of files) {
        const button = document.createElement('button');
        button.className = 'secondary';
        button.textContent = file.label;
        button.onclick = () => download(file);
        actions.append(button);
      }
      return;
    }

    if (!NEXT_PROJECT_URL) {
      status.textContent = 'Test complete. DataPipe accepted both CSV files.';
      return;
    }
    status.textContent = 'Saved. Opening the next activity…';
    const next = new URL(NEXT_PROJECT_URL);
    next.searchParams.set('sid', session.id);
    next.searchParams.set('chain', CHAIN_ID);
    window.location.assign(next.toString());
  }

  await save();
}

if (!validSession) {
  render('<h1>Start through Team 4</h1><p>Open Memory on Trial through the preceding activity in Chain B.</p>', 'Chain B');
} else if (!NEXT_PROJECT_URL && !sessionId.startsWith('TEST')) {
  render('<h1>Chain B is being set up</h1><p>Please check with your instructor before starting.</p>', 'Chain B');
} else {
  intro();
}
