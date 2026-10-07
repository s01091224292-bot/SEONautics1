let cart=JSON.parse(localStorage.getItem('seonauticsCart')||'[]');
function money(n){return '₩'+n.toLocaleString('ko-KR')}
function save(){localStorage.setItem('seonauticsCart',JSON.stringify(cart));renderCart();updateCount()}
function addCart(name,price){cart.push({name,price});save();alert(name+'이(가) 장바구니에 담겼습니다.')}
function removeCart(i){cart.splice(i,1);save()}
function updateCount(){const el=document.getElementById('cartCount');if(el)el.textContent=cart.length}
function renderCart(){const box=document.getElementById('cartItems'),total=document.getElementById('cartTotal');if(!box||!total)return;if(!cart.length){box.innerHTML='<p>담긴 상품이 없습니다.</p>';total.textContent='₩0';return}box.innerHTML=cart.map((x,i)=>`<div class="cart-row"><span>${x.name}</span><span>${money(x.price)} <button class="remove" onclick="removeCart(${i})">삭제</button></span></div>`).join('');total.textContent=money(cart.reduce((s,x)=>s+x.price,0))}
function checkout(){if(!cart.length){alert('장바구니에 상품을 먼저 담아주세요.');return}const summary=cart.map(x=>`${x.name} ${money(x.price)}`).join(', ');location.href='mailto:orders@seonautics.example?subject=SEONautics 주문 문의&body='+encodeURIComponent('주문 희망 상품: '+summary+'\n\n성함/회사명:\n연락처:\n배송지:')}
document.addEventListener('DOMContentLoaded',()=>{updateCount();renderCart()});

// V6: rotate SEONautics slogan, mission and core values in the hero.
window.addEventListener('DOMContentLoaded', () => {
  const messages = [...document.querySelectorAll('.hero-message')];
  const dots = [...document.querySelectorAll('.message-dots button')];
  if (!messages.length) return;
  let current = 0;
  let timer;
  const show = (index) => {
    current = index;
    messages.forEach((el, i) => el.classList.toggle('active', i === current));
    dots.forEach((el, i) => el.classList.toggle('active', i === current));
  };
  const restart = () => {
    clearInterval(timer);
    timer = setInterval(() => show((current + 1) % messages.length), 9000);
  };
  dots.forEach((dot, i) => dot.addEventListener('click', () => { show(i); restart(); }));
  restart();
});

// Real engine-room footage: Wikimedia Commons (CC BY-SA 4.0)
window.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('heroEngineVideo');
  const play = document.getElementById('videoPlayButton');
  if (!video) return;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  const tryPlay = () => video.play().then(() => {
    if (play) play.classList.remove('show');
  }).catch(() => {
    if (play) play.classList.add('show');
  });
  video.addEventListener('canplay', tryPlay, {once:true});
  video.addEventListener('error', () => {
    if (play) play.classList.add('show');
  });
  tryPlay();
  if (play) play.addEventListener('click', tryPlay);
});
