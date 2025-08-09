
document.addEventListener('DOMContentLoaded', ()=>{

  // reveal on scroll
  const observer = new IntersectionObserver((entries, obs)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('in-view'); obs.unobserve(e.target); }
    });
  }, {threshold:0.12});

  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

  // product tilt follow effect (optimized)
  document.querySelectorAll('.product-card').forEach(card=>{
    let rect = null;
    let raf = null;

    const onMove = (e)=>{
      if(!rect) rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) - rect.width/2;
      const y = (e.clientY - rect.top) - rect.height/2;
      const rx = (-y / (rect.height/2)) * 6; // rotateX
      const ry = (x / (rect.width/2)) * 6; // rotateY

      if(raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(()=>{
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(28px) scale(1.05)`;
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
