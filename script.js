
// Polsur common script - reveal observer + product tilt
document.addEventListener('DOMContentLoaded', ()=>{

  // reveal on scroll (perf friendly)
  const observer = new IntersectionObserver((entries, obs)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('in-view'); obs.unobserve(e.target); }
    });
  }, {threshold: 0.12});

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // product tilt follow effect (optimized)
  document.querySelectorAll('.product-card').forEach(card => {
    let rect = null;
    let raf = null;

    const onMove = (e) => {
      if(!rect) rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) - rect.width/2;
      const y = (e.clientY - rect.top) - rect.height/2;
      const rx = (-y / (rect.height/2)) * 8; // rotateX
      const ry = (x / (rect.width/2)) * 8; // rotateY
      // set transform via rAF for performance
      if(raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(()=>{
        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(18px) scale(1.03)`;
      });
    };

    const onLeave = ()=>{
      if(raf) cancelAnimationFrame(raf);
      card.style.transform = '';
      rect = null;
    };

    card.addEventListener('mousemove', onMove, {passive:true});
    card.addEventListener('mouseleave', onLeave, {passive:true});
  });

});
