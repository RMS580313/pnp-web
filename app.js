const products={
  puzolana:{name:'Puzolana molida',category:'Construcción · Adición mineral',image:'cargador-cantera',description:'Puzolana natural molida para incorporar en cemento y concreto. Su uso se define mediante el diseño de mezcla y las condiciones de cada proyecto.',uses:['Producción de cemento','Formulaciones de concreto','Mezclas con requerimientos de durabilidad']},
  mortero:{name:'Mortero para Repello Blanco',category:'Construcción · Acabados',image:'mortero',description:'Mortero formulado para repellos blancos, con buena trabajabilidad y adherencia para facilitar una aplicación consistente.',uses:['Repellos entintados blancos','Acabados arquitectónicos','Muros interiores y exteriores']},
  'cemento-n':{name:'Cemento de Albañilería Tipo N',category:'Construcción · Mampostería',image:'cemento-n',description:'Cemento de albañilería para la preparación de morteros y trabajos de mampostería.',uses:['Morteros de pega','Repellos','Mampostería']},
  'cemento-blanco':{name:'Cemento de Uso General Blanco',category:'Construcción · Uso general',image:'cemento-blanco',description:'Cemento blanco de uso general para proyectos que requieren una terminación blanca y uniforme.',uses:['Aplicaciones generales','Elementos arquitectónicos','Acabados blancos']},
  'termo-sonic':{name:'Termo-Sonic PNP',category:'Construcción · Confort térmico y acústico',image:'termo-sonic',description:'Mortero aislante desarrollado para aportar protección térmica y acústica en superficies y divisiones. Consulta las condiciones de aplicación con nuestro equipo.',uses:['Paredes','Techos','Divisiones interiores y exteriores']},
  enmienda:{name:'Enmienda mineral volcánica',category:'Agricultura · Manejo del suelo',image:'enmienda',description:'Enmienda formulada con puzolana natural de origen volcánico. Su aplicación debe definirse según las características del suelo y las necesidades del cultivo.',uses:['Manejo de las condiciones físicas del suelo','Agricultura','Jardinería']}
};
const dialog=document.getElementById('product-dialog');
document.querySelectorAll('[data-product]').forEach(button=>button.addEventListener('click',()=>{
 const p=products[button.dataset.product];
 document.getElementById('dialog-title').textContent=p.name;
 document.getElementById('dialog-category').textContent=p.category;
 document.getElementById('dialog-description').textContent=p.description;
 const image=document.getElementById('dialog-image');image.src=`assets/${p.image}.webp`;image.alt=p.name;
 const list=document.getElementById('dialog-uses');list.replaceChildren(...p.uses.map(use=>{const li=document.createElement('li');li.textContent=use;return li;}));
 document.getElementById('dialog-contact').href=`mailto:rarauz@pnpanama.com?subject=${encodeURIComponent('Consulta PNP: '+p.name)}`;
 dialog.showModal();document.body.classList.add('modal-open');
}));
dialog.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
dialog.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();}});

const productsToggle=document.querySelector('.products-toggle');
const productsMenu=document.getElementById('products-menu');
const productsNav=document.querySelector('.products-nav');
function closeProductsMenu(){productsMenu.hidden=true;productsToggle.setAttribute('aria-expanded','false');}
productsToggle.addEventListener('click',()=>{const open=productsToggle.getAttribute('aria-expanded')!=='true';productsMenu.hidden=!open;productsToggle.setAttribute('aria-expanded',String(open));});
productsMenu.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeProductsMenu));
document.addEventListener('click',event=>{if(!productsNav.contains(event.target))closeProductsMenu();});
productsNav.addEventListener('keydown',event=>{if(event.key==='Escape'){closeProductsMenu();productsToggle.focus();}});
productsNav.addEventListener('focusout',event=>{if(!productsNav.contains(event.relatedTarget))closeProductsMenu();});

const quoteDialog=document.getElementById('quote-dialog');
const quoteForm=document.getElementById('quote-form');
document.querySelectorAll('[data-quote]').forEach(button=>button.addEventListener('click',()=>{quoteDialog.showModal();document.body.classList.add('modal-open');}));
quoteDialog.querySelector('.close').addEventListener('click',()=>quoteDialog.close());
quoteDialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
function buildQuoteMailto(name,email,area,message){
 const subject=`Solicitud de cotización PNP — ${area}`;
 const body=`Nombre o empresa: ${name}\r\nCorreo de contacto: ${email}\r\nÁrea: ${area}\r\n\r\nNecesidad:\r\n${message}`;
 return `mailto:rms@pnpanama.com,rarauz@pnpanama.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
quoteForm.addEventListener('submit',event=>{
 event.preventDefault();
 if(!quoteForm.reportValidity())return;
 const values=['quote-name','quote-email','quote-area','quote-message'].map(id=>document.getElementById(id).value.trim());
 if(values.some(value=>!value)){document.getElementById('quote-status').textContent='Completa todos los campos antes de continuar.';return;}
 window.location.href=buildQuoteMailto(...values);
 document.getElementById('quote-status').textContent='Revisa y envía la solicitud en tu aplicación de correo. Si no se abre, puedes escribirnos a rms@pnpanama.com y rarauz@pnpanama.com.';
});
