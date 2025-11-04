(function(){
  function renderTracking(data){
    const root = document.getElementById('trackingResult');
    root.innerHTML = '';
    if(!data){ root.innerHTML = '<p>Data tidak ditemukan.</p>'; return; }

    const card = document.createElement('div');
    card.className='card';
    let timelineHtml = '<ul>';
    (data.timeline||[]).forEach(t=>{
      timelineHtml += `<li><strong>${t.tgl}</strong> — ${t.kegiatan}</li>`;
    });
    timelineHtml += '</ul>';

    card.innerHTML = `
      <h3>Nama Pemesan: ${data.namaPemesan || data.nama}</h3>
      <p>Tanggal Kirim: ${data.tglKirim || '-'} • Ekspedisi: ${data.ekspedisi || 'Belum ditentukan'} • Paket: ${data.jenisPaket || '-'}</p>
      <p>Total: ${data.total || '-'}</p>
      <h4>Status: ${data.status || 'Pesanan Diterima'}</h4>
      <div class="progress"><div class="progress-bar" style="width:${statusPercent(data.status)}%"></div></div>
      <h4>Timeline</h4>
      ${timelineHtml}`;
    root.appendChild(card);
  }

  function statusPercent(s){
    if(!s) return 20;
    if(s==='Diterima') return 10;
    if(s==='Diproses') return 40;
    if(s==='Dikirim') return 70;
    if(s==='Sampai') return 100;
    return 20;
  }

  const btn = document.getElementById('doSearch');
  if(btn){
    btn.addEventListener('click', function(){
      const no = document.getElementById('doInput').value.trim();
      if(!no){ alert('Masukkan nomor Delivery Order'); return; }

      // Cek dari dataTracking (dummy)
      let found = (typeof dataTracking!=='undefined' && dataTracking[no]) ? dataTracking[no] : null;

      // Jika tidak ada di dataTracking, cek localStorage orders
      if(!found){
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const match = orders.find(o => o.id === no);
        if(match){
          found = {
            namaPemesan: match.nama,
            total: match.total,
            status: 'Pesanan Diterima',
            timeline: [
              {tgl: new Date().toLocaleDateString('id-ID'), kegiatan: 'Pesanan diterima'},
              {tgl: '-', kegiatan: 'Menunggu konfirmasi admin'}
            ]
          };
        }
      }

      if(!found){ alert('Nomor Delivery Order tidak ditemukan'); return; }
      renderTracking(found);
    });
  }
})();