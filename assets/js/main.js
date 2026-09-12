document.addEventListener('DOMContentLoaded',()=>{
  const navLinks=document.querySelectorAll('#mainNav .nav-link');
  const nav=document.getElementById('mainNav');
  navLinks.forEach(link=>link.addEventListener('click',()=>{
    if(nav.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(nav).hide();
  }));
  const sections=[...document.querySelectorAll('main section[id]')];
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        navLinks.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+entry.target.id));
      }
    });
  },{rootMargin:'-35% 0px -55% 0px',threshold:0});
  sections.forEach(s=>observer.observe(s));
});
