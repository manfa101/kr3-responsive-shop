// Минимальный JS: модальное окно, мобильное меню и фильтры каталога.
// Без JS сайт тоже работает: меню и фильтры просто всегда раскрыты.

// ---------- Модальное окно <dialog> ----------
document.querySelectorAll('[data-modal-open]').forEach(function (button) {
  button.addEventListener('click', function () {
    var modal = document.getElementById(button.dataset.modalOpen);
    if (modal) {
      modal.showModal();
    }
  });
});

// Закрытие по клику на затемнённый фон
document.querySelectorAll('dialog.modal').forEach(function (modal) {
  modal.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.close();
    }
  });
});

// ---------- Кнопки-переключатели (меню и фильтры) ----------
// Кнопка с aria-expanded управляет блоком из aria-controls
function setupToggle(button, target, openClass, openText, closedText) {
  function setOpen(isOpen) {
    button.setAttribute('aria-expanded', String(isOpen));
    target.classList.toggle(openClass, isOpen);
    if (openText) {
      button.textContent = isOpen ? openText : closedText;
    }
  }

  button.addEventListener('click', function () {
    setOpen(button.getAttribute('aria-expanded') !== 'true');
  });

  // Esc закрывает блок и возвращает фокус на кнопку
  target.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      setOpen(false);
      button.focus();
    }
  });

  return setOpen;
}

// Мобильное меню
var menuButton = document.querySelector('.menu-toggle');
var nav = document.getElementById('site-nav');
if (menuButton && nav) {
  var setMenu = setupToggle(menuButton, nav, 'site-nav--open');

  // Esc на самой кнопке тоже закрывает меню
  menuButton.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      setMenu(false);
    }
  });

  // При переходе на десктопную ширину сбрасываем состояние меню
  window.matchMedia('(min-width: 1024px)').addEventListener('change', function () {
    setMenu(false);
  });
}

// Фильтры каталога на мобильном
var filtersButton = document.querySelector('.filters__toggle');
var filters = document.querySelector('.filters');
if (filtersButton && filters) {
  setupToggle(filtersButton, filters, 'filters--open', 'Скрыть фильтры', 'Показать фильтры');
}
