const cart = (function(){
  function getCart(){ return JSON.parse(localStorage.getItem('cart')||'[]'); }
  function saveCart(c){ localStorage.setItem('cart', JSON.stringify(c)); updateBadge(); }
  function updateBadge(){ const c = getCart(); const el = document.getElementById('cartCount'); if(el) el.innerText = c.reduce((s,i)=>s+i.quantity,0); }
  function addItem(kode, qty){ const c = getCart(); const idx = c.findIndex(i=>i.kodeBarang===kode); if(idx>=0) c[idx].quantity += qty; else c.push({kodeBarang:kode,quantity:qty}); saveCart(c); }
  function removeItem(kode){ const c = getCart().filter(i=>i.kodeBarang!==kode); saveCart(c); }
  function listItemsDetailed(){ const c = getCart(); if(typeof dataKatalogBuku==='undefined') return []; return c.map(i=>{ const info = dataKatalogBuku.find(d=>d.kodeBarang===i.kodeBarang) || {}; return { ...info, quantity:i.quantity }; }); }
  function renderCartSummary(){ const el = document.getElementById('cartItems'); if(!el) return; el.innerHTML = ''; const list = listItemsDetailed(); let total=0; list.forEach(it=>{ const row = document.createElement('div'); row.style.marginBottom='8px'; const price = (it.harga||0)*(it.quantity||1); total += price; row.innerHTML = `<div><strong>${it.namaBarang}</strong> <div class="muted">${it.quantity} × ${it.harga?('Rp '+it.harga.toLocaleString()):'-'}</div></div><div style="margin-top:6px"><button class="btn-link" onclick="cart.removeItem('${it.kodeBarang}');cart.renderCartSummary()">Hapus</button></div>`; el.appendChild(row); }); const totalEl = document.getElementById('cartTotal'); if(totalEl) totalEl.innerText = 'Rp '+total.toLocaleString(); saveCart(list.map(i=>({kodeBarang:i.kodeBarang,quantity:i.quantity}))); }
  
  const form = document.getElementById('checkoutForm'); 
  if(form){ 
    form.addEventListener('submit', function(e){ 
      e.preventDefault(); 
      const order = { 
        id: 'DO'+Math.floor(Math.random()*900000+100000), 
        nama: document.getElementById('c_name').value, 
        email: document.getElementById('c_email').value, 
        phone: document.getElementById('c_phone').value, 
        address: document.getElementById('c_address').value, 
        payment: document.getElementById('c_payment_text').value, 
        items: listItemsDetailed(), 
        total: document.getElementById('cartTotal').innerText 
      }; 
      const his = JSON.parse(localStorage.getItem('orders')||'[]'); 
      his.push(order); 
      localStorage.setItem('orders', JSON.stringify(his)); 
      localStorage.removeItem('cart'); 
      ui.showToast('Pesanan berhasil! Nomor DO: '+order.id);
      
      // Show confirmation modal
      const confirmModal = document.createElement('div');
      confirmModal.className = 'modal';
      confirmModal.innerHTML = `
        <div class="card">
          <h3>Pesanan Berhasil 🎉</h3>
          <p>Nomor Delivery Order kamu: <strong>${order.id}</strong></p>
          <p>Simpan nomor ini untuk tracking pengiriman.</p>
          <button class="btn-primary" id="toTracking">Lihat Tracking</button>
          <button class="btn-link" id="toDashboard">Kembali ke Dashboard</button>
        </div>`;
      document.body.appendChild(confirmModal);
      confirmModal.querySelector('#toTracking').onclick = ()=>{
        confirmModal.remove();
        location.href='tracking.html';
      };
      confirmModal.querySelector('#toDashboard').onclick = ()=>{
        confirmModal.remove();
        location.href='dashboard.html';
      };
    }); 
  }
  
  document.addEventListener('DOMContentLoaded', function(){ updateBadge(); if(document.getElementById('cartItems')) renderCartSummary(); });
  return { addItem, removeItem, renderCartSummary };
})();