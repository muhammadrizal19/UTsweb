const katalog = (function(){
  function formatRupiah(n){ return 'Rp '+(n||0).toLocaleString('id-ID'); }
  function renderGrid(){
    const grid = document.getElementById('katalogGrid');
    if(!grid) return;
    grid.innerHTML = '';
    if(typeof dataKatalogBuku === 'undefined'){ grid.innerHTML='<p>Tidak ada katalog.</p>'; return; }
    dataKatalogBuku.forEach(item=>{
      const card = document.createElement('article'); card.className='katalog-item';
      card.innerHTML = `<img src="${item.cover}" alt="${item.namaBarang}"/>
        <h4>${item.namaBarang}</h4>
        <div class="meta">${item.jenisBarang} • Edisi ${item.edisi}</div>
        <div class="meta">Stok: ${item.stok} • ${formatRupiah(item.harga)}</div>
        <div style="margin-top:auto;display:flex;gap:8px;">
          <button class="btn-primary addCart">Tambah ke Keranjang</button>
          <button class="btn-secondary editBtn">Edit</button>
        </div>`;
      grid.appendChild(card);
      card.querySelector('.addCart').addEventListener('click', function(){ cart.addItem(item.kodeBarang, 1); ui.showToast('Buku ditambahkan ke keranjang'); });
      card.querySelector('.editBtn').addEventListener('click', function(){
        const m = document.createElement('div'); m.className='modal';
        m.innerHTML = `<div class="card"><h3>Edit Buku</h3>
          <label>Nama<input id="e_nama" value="${item.namaBarang}"></label>
          <label>Stok<input id="e_stok" type="number" value="${item.stok}"></label>
          <label>Harga<input id="e_harga" type="number" value="${item.harga}"></label>
          <div style="margin-top:12px"><button class="btn-primary" id="saveEdit">Simpan</button> <button id="closeEdit" class="btn-link">Batal</button></div>
        </div>`;
        document.getElementById('modalRoot').appendChild(m);
        m.querySelector('#closeEdit').onclick = ()=>m.remove();
        m.querySelector('#saveEdit').onclick = ()=>{
          item.namaBarang = document.getElementById('e_nama').value;
          item.stok = parseInt(document.getElementById('e_stok').value)||0;
          item.harga = parseInt(document.getElementById('e_harga').value)||0;
          katalog.renderGrid(); m.remove(); ui.showToast('Data buku diperbarui');
        };
      });
    });
  }
  document.addEventListener('DOMContentLoaded', renderGrid);
  return { renderGrid };
})();
