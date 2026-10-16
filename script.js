document.addEventListener('DOMContentLoaded',()=>{
 const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');
 if(menu&&nav){menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');nav.classList.remove('open')}))}
 document.querySelectorAll('#year').forEach(el=>el.textContent=new Date().getFullYear());
 const revealEls=document.querySelectorAll('.reveal');
 if('IntersectionObserver'in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});revealEls.forEach(el=>io.observe(el))}else revealEls.forEach(el=>el.classList.add('visible'));
 const glow=document.querySelector('.cursor-glow');if(glow&&window.matchMedia('(hover:hover)').matches){window.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'},{passive:true})}
 const config=[
 {id:'coloredGrid',folder:'assets/images/colored',prefix:'artwork-',count:3,ext:'jpg',label:'Colored artwork',kind:'image'},
 {id:'sketchGrid',folder:'assets/images/sketches',prefix:'sketch-',count:3,ext:'jpg',label:'Sketch / line art',kind:'image'},
 {id:'timelapseGrid',folder:'assets/timelapses',prefix:'timelapse-',count:2,ext:'mp4',label:'Art timelapse',kind:'video'},
 {id:'coverGrid',folder:'assets/images/covers',prefix:'book-cover-',count:1,ext:'jpg',label:'Book cover artwork',kind:'image'}
 ];
 const lightbox=document.getElementById('lightbox'),lightboxContent=lightbox?.querySelector('.lightbox-content'),caption=lightbox?.querySelector('.lightbox-caption');
 function showLightbox(src,title,kind){if(!lightbox||!lightboxContent)return;lightboxContent.innerHTML='';let media;if(kind==='video'){media=document.createElement('video');media.src=src;media.controls=true;media.autoplay=true;media.playsInline=true}else{media=document.createElement('img');media.src=src;media.alt=title;media.decoding='async'}lightboxContent.appendChild(media);if(caption)caption.textContent=title;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
 function closeLightbox(){if(!lightbox)return;lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');if(lightboxContent)lightboxContent.innerHTML='';document.body.style.overflow=''}
 lightbox?.querySelector('.lightbox-close')?.addEventListener('click',closeLightbox);lightbox?.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox()});
 config.forEach(group=>{const grid=document.getElementById(group.id);if(!grid)return;for(let i=1;i<=group.count;i++){
  const filename=group.prefix+String(i).padStart(2,'0')+'.'+group.ext,src=group.folder+'/'+filename,card=document.createElement('article');
  card.className='art-card '+(group.kind==='video'?'video-card ':'')+(group.id==='coverGrid'?'cover-card':'');
  const mediaWrap=document.createElement('div');mediaWrap.className='art-media placeholder'+(group.kind==='video'?' video-media':'');
  let media;
  if(group.kind==='video'){
   media=document.createElement('video');media.src=src;media.muted=true;media.loop=true;media.playsInline=true;media.preload='metadata';
   media.addEventListener('loadedmetadata',()=>{mediaWrap.classList.remove('placeholder');mediaWrap.classList.remove('missing-media')});
   media.addEventListener('error',()=>showMissing(mediaWrap,'Add timelapse video',filename));mediaWrap.appendChild(media);
  }else{
   media=document.createElement('img');media.src=src;media.alt=group.label+' '+i;media.loading='lazy';media.decoding='async';
   media.addEventListener('load',()=>{mediaWrap.classList.remove('placeholder');mediaWrap.classList.remove('missing-media');mediaWrap.querySelector('.missing-label')?.remove()});
   media.addEventListener('error',()=>{media.style.display='none';showMissing(mediaWrap,'Add your artwork',filename)});mediaWrap.appendChild(media);
  }
  function showMissing(wrap,message,file){wrap.classList.add('missing-media');let label=wrap.querySelector('.missing-label');if(!label){label=document.createElement('div');label.className='missing-label';label.innerHTML='<span class="missing-spark">✳</span><b></b><small></small>';wrap.appendChild(label)}label.querySelector('b').textContent=message;label.querySelector('small').textContent=file;}
  const title=document.createElement('div');title.className='art-title';const name=document.createElement('b');name.textContent=group.id==='coverGrid'?'Book cover artwork':group.label+' '+String(i).padStart(2,'0');const num=document.createElement('span');num.textContent=String(i).padStart(2,'0');title.append(name,num);card.append(mediaWrap,title);
  card.addEventListener('click',()=>{if(group.kind==='video'&&media.readyState>0)showLightbox(src,name.textContent,'video');else if(group.kind==='image'&&media.complete&&media.naturalWidth>0)showLightbox(src,name.textContent,'image')});
  grid.appendChild(card);
 }});
 // Smoothly open a collection when a folder is chosen.
 if(location.hash){setTimeout(()=>{const target=document.querySelector(location.hash);if(target)target.scrollIntoView({behavior:'smooth',block:'start'})},180)}
});