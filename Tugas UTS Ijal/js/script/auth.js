(function(){
  function findUser(email, pass){
    const baseUsers = typeof dataPengguna !== 'undefined' ? dataPengguna : [];
    const regUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const allUsers = [...baseUsers, ...regUsers];
    return allUsers.find(u => u.email === email && u.password === pass);
  }

  // LOGIN
  const loginForm = document.getElementById('loginForm');
  if(loginForm){
    loginForm.addEventListener('submit', function(e){
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      if(!email || !password){ alert('Email/password harus diisi'); return; }
      const user = findUser(email,password);
      if(!user){ alert('email/password yang anda masukkan salah'); return; }
      localStorage.setItem('sessionUser', JSON.stringify({email:user.email,name:user.name,role:user.role}));
      window.location.href='dashboard.html';
    });
  }

  // REGISTER
  const registerLink = document.getElementById('registerLink');
  if (registerLink) {
    registerLink.addEventListener('click', function (e) {
      e.preventDefault();
      const modal = document.createElement('div');
      modal.className = 'modal';
      modal.innerHTML = `
        <div class="card">
          <h3>Daftar Akun Baru</h3>
          <form id="registerForm">
            <label>Nama Lengkap<input id="r_name" required></label>
            <label>Email<input id="r_email" type="email" required></label>
            <label>Password<input id="r_pass" type="password" required></label>
            <div style="margin-top:12px">
              <button class="btn-primary" type="submit">Daftar</button>
              <button class="btn-link" type="button" id="closeReg">Batal</button>
            </div>
          </form>
        </div>`;
      document.getElementById('modalRoot').appendChild(modal);
      
      modal.querySelector('#closeReg').onclick = ()=>modal.remove();
      modal.querySelector('#registerForm').onsubmit = function(e){
        e.preventDefault();
        const name = document.getElementById('r_name').value;
        const email = document.getElementById('r_email').value;
        const pass = document.getElementById('r_pass').value;
        
        if (!email || !pass) { alert('Lengkapi semua field'); return; }
        
        const regUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        if (regUsers.some(u => u.email === email)) {
          alert('Email sudah terdaftar');
          return;
        }
        regUsers.push({ email, password: pass, name, role: 'User' });
        localStorage.setItem('registeredUsers', JSON.stringify(regUsers));
        
        alert('Pendaftaran berhasil! Silakan login.');
        modal.remove();
      };
    });
  }

  // LUPA PASSWORD
  const forgotLink = document.getElementById('forgotLink');
  if (forgotLink) {
    forgotLink.addEventListener('click', function (e) {
      e.preventDefault();
      const modal = document.createElement('div');
      modal.className = 'modal';
      modal.innerHTML = `
        <div class="card">
          <h3>Lupa Password</h3>
          <form id="forgotForm">
            <label>Masukkan Email<input id="f_email" type="email" required></label>
            <div style="margin-top:12px">
              <button class="btn-primary" type="submit">Kirim</button>
              <button class="btn-link" type="button" id="closeForgot">Batal</button>
            </div>
          </form>
        </div>`;
      document.getElementById('modalRoot').appendChild(modal);
      
      modal.querySelector('#closeForgot').onclick = ()=>modal.remove();
      modal.querySelector('#forgotForm').onsubmit = function(e){
        e.preventDefault();
        const email = document.getElementById('f_email').value.trim();
        const baseUsers = typeof dataPengguna !== 'undefined' ? dataPengguna : [];
        const regUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const allUsers = [...baseUsers, ...regUsers];
        const found = allUsers.find(u => u.email === email);
        if (!found) {
          alert('Email tidak ditemukan');
          return;
        }
        alert(`Simulasi: Password untuk ${email} adalah "${found.password}".\nEmail reset password juga telah dikirim (simulasi).`);
        modal.remove();
      };
    });
  }

  // SESSION DISPLAY & LOGOUT
  const session = localStorage.getItem('sessionUser');
  if(session){
    try{
      const u = JSON.parse(session);
      const el = document.getElementById('userNameDisplay');
      if(el) el.innerText = u.name;
    }catch(e){}
  }

  ['logoutBtn','logoutBtn2','logoutBtn3'].forEach(id=>{
    const el=document.getElementById(id);
    if(el) el.addEventListener('click', function(e){
      e.preventDefault();
      localStorage.removeItem('sessionUser');
      location.href='index.html';
    });
  });
})();