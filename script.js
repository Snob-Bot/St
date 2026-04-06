async function startSession(){
await fetch('/.netlify/functions/session-start',{method:'POST'})
}

async function endSession(){
await fetch('/.netlify/functions/session-end',{method:'POST'})
}

async function load(){
const status=await fetch('/.netlify/functions/session-status').then(r=>r.json())
document.getElementById('status').innerText=status.active?'Active':'Inactive'

const players=await fetch('/.netlify/functions/players').then(r=>r.json())
document.getElementById('players').innerHTML=
players.map(p=>`<div>${p.username} ${p.staff?'[STAFF]':''}</div>`).join('')

const logs=await fetch('/.netlify/functions/logs').then(r=>r.json())
document.getElementById('logs').innerHTML=
logs.map(l=>`<div>${l.message}</div>`).join('')
}

setInterval(load,5000)
load()
