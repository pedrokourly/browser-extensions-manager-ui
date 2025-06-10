// Variáveis dos botões de filtro (radios)
const filterAllInput = document.getElementById('filterAll');
const filterActiveInput = document.getElementById('filterActive');
const filterInactiveInput = document.getElementById('filterInactive');

const filterAllLabel = document.querySelector('label[for="filterAll"]');
const filterActiveLabel = document.querySelector('label[for="filterActive"]');
const filterInactiveLabel = document.querySelector('label[for="filterInactive"]');
const checkedRadio = document.querySelector('input[name="extensionFilter"]:checked');

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
  // Troca o ícone do tema
  if (isDark) {
    icon.src = './assets/images/icon-sun.svg';
    icon.alt = 'Mudar para tema claro';
    themeBtn.classList.add('bg-light');
    themeBtn.classList.remove('bg-secondary');
    // Troca o logo para o modo dark
    if (logoImg) logoImg.src = './assets/images/logo-dark.svg';
    localStorage.setItem('theme', 'dark');
  } else {
    icon.src = './assets/images/icon-moon.svg';
    icon.alt = 'Mudar para tema escuro';
    themeBtn.classList.remove('bg-light');
    themeBtn.classList.add('bg-secondary');
    // Troca o logo para o modo light
    if (logoImg) logoImg.src = './assets/images/logo.svg';
    localStorage.setItem('theme', 'light');
  }
}

themeBtn.addEventListener('click', toggleTheme);


