(function(){
  function greeting(){ 
    const now = new Date(); 
    const h = now.getHours(); 
    let g = 'Selamat Pagi'; 
    if(h>=11 && h<15) g='Selamat Siang'; 
    else if(h>=15 && h<19) g='Selamat Sore'; 
    else if(h>=19) g='Selamat Malam'; 
    const name = (JSON.parse(localStorage.getItem('sessionUser')||'{}').name || ''); 
    const elGreeting = document.getElementById('greeting'); 
    if(elGreeting) elGreeting.innerText = g + (name?(', '+name):''); 
    const timeEl = document.getElementById('timeNow'); 
    if(timeEl) timeEl.innerText = now.toLocaleString(); 
  }

  function loadOrders() {
    const list = JSON.parse(localStorage.getItem('orders') || '[]');
    const hist = document.getElementById('historyList');
    if (!hist) return;
    if (list.length === 0) {
      hist.innerHTML = '<p>Tidak ada transaksi.</p>';
      return;
    }
    hist.innerHTML = list.map(o => `
      <div class="card small">
        <strong>${o.id}</strong> — ${o.nama} <br/>
        Total: ${o.total} <br/>
        <button class="btn-link" onclick="location.href='tracking.html'">Lacak</button>
      </div>`).join('');
  }

  document.addEventListener('DOMContentLoaded', function(){ greeting(); setInterval(greeting,60000); loadOrders(); });
})();