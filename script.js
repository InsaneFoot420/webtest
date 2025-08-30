
document.addEventListener('DOMContentLoaded', ()=>{
  const track = document.getElementById('track');
  const prev = document.querySelector('.sbtn.prev');
  const next = document.querySelector('.sbtn.next');
  const dotsWrap = document.getElementById('dots');

  const slides = Array.from(track.querySelectorAll('img'));
  slides.forEach((_,i)=>{
    const d = document.createElement('button');
    d.addEventListener('click', ()=> {
      const el = slides[i];
      track.scrollTo({left: el.offsetLeft - 10, behavior:'smooth'});
    });
    dotsWrap.appendChild(d);
  });
  function updateDots(){
    const scrollLeft = track.scrollLeft;
    let idx = 0, minDiff = Infinity;
    slides.forEach((el,i)=>{
      const diff = Math.abs(el.offsetLeft - scrollLeft);
      if(diff < minDiff){ minDiff = diff; idx = i; }
    });
    dotsWrap.querySelectorAll('button').forEach((b,j)=> b.classList.toggle('active', j===idx));
  }
  prev.addEventListener('click', ()=> track.scrollBy({left: -300, behavior:'smooth'}));
  next.addEventListener('click', ()=> track.scrollBy({left: 300, behavior:'smooth'}));
  track.addEventListener('scroll', updateDots, {passive:true});
  updateDots();

  // Enhance form via fetch (fallback to normal post when not supported)
  const form = document.querySelector('.contact-form');
  const status = document.getElementById('form-status');
  if(form && window.FormData){
    form.addEventListener('submit', (e)=>{
      if(!window.fetch) return;
      e.preventDefault();
      status.textContent = 'Odesílám…';
      fetch(form.action, { method:'POST', body:new FormData(form) })
        .then(r=>r.json().catch(()=>null).then(data=>({ok:r.ok, data})) )
        .then(({ok, data})=>{
          if(ok && data && data.sent){
            status.textContent = 'Děkuji, zpráva byla odeslána ✅';
            form.reset();
          } else {
            status.textContent = 'Nepodařilo se odeslat. Zkuste to prosím znovu.';
          }
        }).catch(()=> status.textContent = 'Chyba připojení.');
    });
  }
});
