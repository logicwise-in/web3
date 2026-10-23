
// Add your specific YouTube video links below. Newest first.
// Example shape: { url: "https://www.youtube.com/watch?v=VIDEO_ID", title: "Your video title" }
// Keep this empty to show the recent-uploads channel card. No API key required.
const featuredVideos = [];
const grid = document.getElementById('video-grid');
for (const video of featuredVideos.slice(0, 6)) {
  try {
    const url = new URL(video.url);
    let id;
    if (url.hostname === 'youtu.be') id = url.pathname.slice(1);
    else if (['youtube.com','www.youtube.com','m.youtube.com'].includes(url.hostname))
      id = url.searchParams.get('v') || url.pathname.match(/^\/(?:shorts|embed)\/([\w-]{11})/)?.[1];
    if (!/^[\w-]{11}$/.test(id || '')) continue;
    const card = document.createElement('a'); card.className='video-card';
    card.href='https://www.youtube.com/watch?v='+id; card.target='_blank'; card.rel='noopener noreferrer';
    const image=document.createElement('img'); image.src='https://i.ytimg.com/vi/'+id+'/hqdefault.jpg'; image.alt=''; image.loading='lazy';
    const title=document.createElement('h3'); title.textContent=video.title || 'Watch on Logic Wise';
    const caption=document.createElement('p'); caption.textContent='Watch on YouTube';
    card.append(image,title,caption); grid.append(card);
  } catch { /* Ignore malformed links without breaking the page. */ }
}
if (grid.children.length) document.getElementById('channel-card').hidden=true;
else grid.hidden=true;
const toggle=document.querySelector('.navbar-toggler');
const menu=document.getElementById('mainNav');
toggle.addEventListener('click',()=>{const opened=menu.classList.toggle('show');toggle.setAttribute('aria-expanded',String(opened));});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('show');toggle.setAttribute('aria-expanded','false');}));
document.addEventListener('keydown',e=>{if(e.key==='Escape' && menu.classList.contains('show')){menu.classList.remove('show');toggle.setAttribute('aria-expanded','false');toggle.focus();}});
document.getElementById('year').textContent=new Date().getFullYear();

// Clear the mobile menu state when returning to desktop.
window.matchMedia('(min-width: 1200px)').addEventListener('change', event => {
  if (event.matches) { menu.classList.remove('show'); toggle.setAttribute('aria-expanded','false'); }
});
// Highlight the section currently in view without changing browser history.
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      document.querySelectorAll('.nav-link').forEach(link => {
        const active = link.getAttribute('href') === '#' + entry.target.id;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, {rootMargin: '-15% 0px -60% 0px', threshold: 0});
  document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
}
