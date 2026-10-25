
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
if(toggle && nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'×':'☰';});}
const newsletter = document.querySelector('#newsletter-form');
if(newsletter){newsletter.addEventListener('submit',e=>{e.preventDefault();const note=document.querySelector('#newsletter-note');note.textContent='Thanks! This demo form is not connected to an email service yet.';newsletter.reset();});}
const project = document.querySelector('#project-form');
if(project){project.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(project);const note=document.querySelector('#form-note');note.textContent=`Thanks, ${data.get('name')}. Your demo enquiry is ready for review, but has not been sent to a server.`;note.classList.add('success-note');});}
