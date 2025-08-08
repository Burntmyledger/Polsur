document.addEventListener('DOMContentLoaded', ()=>{
  // hamburger toggle
  const hb = document.getElementById('hb');
  const nav = document.querySelector('nav ul');
  if(hb) hb.addEventListener('click', ()=> {
    if(nav.style.display === 'flex') nav.style.display = '';
    else nav.style.display = 'flex';
  });

  // reveal animation
  const obs = new IntersectionObserver((entries, o)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('in-view'); o.unobserve(e.target); }
    });
  }, {threshold:0.12});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

  // smooth anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const id = a.getAttribute('href');
      document.querySelector(id).scrollIntoView({behavior:'smooth'});
    });
  });

  // buy now: open external link (placeholder)
  document.querySelectorAll('.buy-now').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const url = btn.dataset.href || btn.getAttribute('href');
      if(url){ window.open(url, '_blank'); }
    });
  });
});