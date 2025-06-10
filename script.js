// Botão de tema
const themeBtn = document.getElementById('themeBtn');
const logoImg = document.querySelector('.navbar-brand img');


// Ao carregar a página, aplica o tema salvo
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    if (!document.body.classList.contains('bg-dark')) toggleTheme();
  } else if (savedTheme === 'light') {
    if (document.body.classList.contains('bg-dark')) toggleTheme();
  }
});


// Função para alternar tema claro/escuro
function toggleTheme() {
  const body = document.body;
  const icon = themeBtn.querySelector('img');
  const isDark = body.classList.toggle('bg-dark');
  body.classList.toggle('text-white', isDark);
  
  if (isDark) {
    icon.src = './assets/images/icon-sun.svg';
    icon.alt = 'Mudar para tema claro';
    
    if (logoImg) logoImg.src = './assets/images/logo-dark.svg';
    localStorage.setItem('theme', 'dark');
  } else {
    icon.src = './assets/images/icon-moon.svg';
    icon.alt = 'Mudar para tema escuro';
    
    if (logoImg) logoImg.src = './assets/images/logo.svg';
    localStorage.setItem('theme', 'light');
  }
}

themeBtn.addEventListener('click', toggleTheme);

// Importa o data.json
let extensionsData = [];
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    extensionsData = data;
    renderData(getFilteredData());
});


// Função para adicionar listeners aos botões Remove
function addRemoveListeners() {
  const list = document.getElementById('extensionsList');
  if (!list) return;
  list.querySelectorAll('.btn.border').forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      extensionsData.splice(idx, 1);
      renderData(getFilteredData());
    });
  });

  // Atualiza o isActive ao clicar no switch
  list.querySelectorAll('.form-check-input.custom-switch-red').forEach((input, idx) => {
    input.addEventListener('change', () => {
      const filtered = getFilteredData();
      const ext = filtered[idx];
      if (ext) {
        ext.isActive = input.checked;
        
        // Atualiza o extensionsData real
        const realIdx = extensionsData.findIndex(e => e.name === ext.name);
        if (realIdx !== -1) {
          extensionsData[realIdx].isActive = input.checked;
        }
      }
      renderData(getFilteredData());
    });
  });
}

// Função para obter o filtro selecionado
function getCurrentFilter() {
  const checked = document.querySelector('input[name="extensionFilter"]:checked');
  if (!checked) return 'All';
  return checked.nextElementSibling.textContent.trim();
}

// Função para filtrar os dados conforme o filtro selecionado
function getFilteredData() {
  const filter = getCurrentFilter();
  if (filter === 'Active') {
    return extensionsData.filter(ext => ext.isActive);
  } else if (filter === 'Inactive') {
    return extensionsData.filter(ext => !ext.isActive);
  }
  return extensionsData;
}

// Atualiza a renderização ao trocar o filtro
const filterRadios = document.querySelectorAll('input[name="extensionFilter"]');
filterRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    renderData(getFilteredData());
  });
});

// Função para renderizar os cards de extensões
function renderData(data) {
  const list = document.getElementById('extensionsList');
  if (!list) return;
  list.innerHTML = '';
  data.forEach((ext) => {
    const checked = ext.isActive ? 'checked' : '';
    const card = document.createElement('div');
    card.className = 'col';
    card.innerHTML = `
      <div class="card h-100 w-100 rounded-4 shadow">
        <div class="d-flex align-items-start p-3">
          <img src="${ext.logo}" alt="${ext.name}">
          <div class="card-body py-0">
            <h5 class="card-title fw-bolder">${ext.name}</h5>
            <p class="card-text">${ext.description}</p>
          </div>
        </div>
        <div class="card-footer bg-transparent border-0 px-3 pb-3 pt-0 d-flex justify-content-between align-items-center">
          <button type="button" class="btn border rounded-5 fw-semibold">Remove</button>
          <div class="form-check form-switch m-0 p-0">
            <input class="form-check-input custom-switch-red" type="checkbox" role="switch" id="${ext.name + 'switch'}" ${checked}>
          </div>
        </div>
      </div>
    `;
    list.appendChild(card);
  });
  addRemoveListeners();
}


