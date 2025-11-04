const ui = (function(){
  function openAddStock(){
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `<div class=\"card\"><h3>Tambah Stok Baru</h3>
      <form id=\"addStockForm\"> 
        <label>Kode<input id=\"f_kode\" required></label>
        <label>Nama<input id=\"f_nama\" required></label>
        <label>Jenis<input id=\"f_jenis\"></label>
        <label>Edisi<input id=\"f_edisi\"></label>
        <label>Stok<input type=\"number\" id=\"f_stok\" value=\"1\"></label>
        <label>Harga<input type=\"number\" id=\"f_harga\" value=\"0\"></label>
        <label>Cover (path)<input id=\"f_cover\" value=\"img/buku1.jpg\"></label>
        <div style=\"margin-top:12px\"><button class=\"btn-primary\" type=\"submit\">Tambah</button> <button type=\"button\" id=\"closeModal\" class=\"btn-link\">Batal</button></div>
      </form></div>`;
    const root = document.getElementById('modalRoot') || document.body;
    root.appendChild(modal);
    modal.querySelector('#closeModal').onclick = ()=>modal.remove();
    modal.querySelector('#addStockForm').onsubmit = function(e){
      e.preventDefault();
      const item = {
        kodeBarang:document.getElementById('f_kode').value,
        namaBarang:document.getElementById('f_nama').value,
        jenisBarang:document.getElementById('f_jenis').value,
        edisi:document.getElementById('f_edisi').value,
        stok:parseInt(document.getElementById('f_stok').value)||0,
        harga:parseInt(document.getElementById('f_harga').value)||0,
        cover:document.getElementById('f_cover').value||'img/buku1.jpg'
      };
      if(typeof dataKatalogBuku !== 'undefined'){
        dataKatalogBuku.push(item);
        if(window.katalog && katalog.renderGrid) katalog.renderGrid();
        showToast('Stok baru ditambahkan');
      }
      modal.remove();
    };
  }

  function showToast(msg, time=2500){
    const root = document.getElementById('toastRoot') || document.body;
    const t = document.createElement('div'); t.className='toast'; t.innerText=msg;
    root.appendChild(t);
    setTimeout(()=>{ t.style.opacity=0; setTimeout(()=>t.remove(),300); }, time);
  }

  function toggleCart(){ location.href='checkout.html'; }
  return { openAddStock, showToast, toggleCart };
})();
