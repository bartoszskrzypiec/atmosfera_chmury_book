function openFormulaModal(targetId){
  var template = document.getElementById(targetId);
  var overlay = document.getElementById('modal-overlay');
  var panel = document.getElementById('modal-body');
  if(!template || !overlay || !panel) return;
  panel.innerHTML = '';
  panel.appendChild(template.content.cloneNode(true));
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeFormulaModal(){
  var overlay = document.getElementById('modal-overlay');
  if(!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('click', function(e){
  var trigger = e.target.closest('[data-modal-target]');
  if(trigger){
    openFormulaModal(trigger.getAttribute('data-modal-target'));
    return;
  }
  if(e.target.closest('[data-modal-close]') || e.target.id === 'modal-overlay'){
    closeFormulaModal();
  }
});

document.addEventListener('keydown', function(e){
  if(e.key !== 'Escape') return;
  closeFormulaModal();
  if(window.__hideVecTip) window.__hideVecTip();
});

document.addEventListener('DOMContentLoaded', function(){
  var vecEls = document.querySelectorAll('.vec[data-tip]');
  if(!vecEls.length) return;

  var tip = document.createElement('div');
  tip.className = 'vec-tooltip';
  tip.id = 'vec-tooltip';
  document.body.appendChild(tip);

  var current = null;

  function showTip(el){
    if(current && current !== el) current.setAttribute('aria-expanded', 'false');
    current = el;
    el.setAttribute('aria-expanded', 'true');
    el.setAttribute('aria-describedby', 'vec-tooltip');
    tip.textContent = el.getAttribute('data-tip');
    tip.style.display = 'block';
    var r = el.getBoundingClientRect();
    var tipRect = tip.getBoundingClientRect();
    var left = r.left + r.width / 2 - tipRect.width / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - tipRect.width - 8));
    var top = r.top - tipRect.height - 8;
    if(top < 8) top = r.bottom + 8;
    tip.style.left = left + 'px';
    tip.style.top = top + 'px';
  }

  function hideTip(){
    tip.style.display = 'none';
    if(current){
      current.setAttribute('aria-expanded', 'false');
      current.removeAttribute('aria-describedby');
      current = null;
    }
  }

  // Udostępniane globalnie, żeby handler Escape (wyżej) mógł zamknąć też tooltip.
  window.__hideVecTip = hideTip;

  vecEls.forEach(function(el){
    // Nadawane z JS, nie w HTML — inaczej trzeba by edytować 272 spany w 22 plikach.
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.setAttribute('aria-expanded', 'false');

    // Hover tylko dla myszy — na dotyku pointerenter potrafi zdublować tap.
    el.addEventListener('pointerenter', function(e){
      if(e.pointerType === 'mouse') showTip(el);
    });
    el.addEventListener('pointerleave', function(e){
      if(e.pointerType === 'mouse') hideTip();
    });

    // Dotyk i klik: przełącznik.
    el.addEventListener('click', function(e){
      e.stopPropagation();
      if(current === el) hideTip(); else showTip(el);
    });

    // Klawiatura: span z role="button" nie dostaje clicku z Entera sam z siebie.
    el.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        if(current === el) hideTip(); else showTip(el);
      }
    });

    el.addEventListener('focus', function(){ showTip(el); });
    el.addEventListener('blur', hideTip);
  });

  document.addEventListener('click', function(e){
    if(!e.target.closest('.vec[data-tip]')) hideTip();
  });

  // Tooltip jest pozycjonowany fixed z getBoundingClientRect — po scrollu
  // odkleiłby się od symbolu, więc chowamy zamiast przeliczać.
  window.addEventListener('scroll', hideTip, {passive: true});
  window.addEventListener('resize', hideTip);
});

/* ------------------------------------------------------------------
   Widgety 3D — widoczny komunikat zamiast pustego prostokąta.

   sky3d.js to moduł ES. Przy otwarciu strony prosto z dysku (file://)
   przeglądarka w ogóle go nie wczyta, więc ta kontrola musi żyć
   w zwykłym skrypcie. interactive.js ładuje się na każdej stronie
   z widgetem i wykonuje przed odroczonym modułem — więc
   window.__sky3dPokazBrak jest gotowe, zanim sky3d.js ruszy.

   sky3d.js sam woła __sky3dPokazBrak przy braku WebGL i błędzie
   shadera; wartownik poniżej dokłada przypadek, którego moduł nie
   zgłosi, bo się nie wczytał (host.dataset.sky3d wtedy puste).
   Zdanie właściwe rozdziału w .viz3d__fallback > span zostaje —
   dopisujemy tylko linię z powodem.
   ------------------------------------------------------------------ */
var SKY3D_POWODY = {
  file: {
    tytul: 'Widget 3D nie uruchamia się z pliku na dysku',
    czemu: 'Strona jest otwarta spod adresu file://, a przeglądarka nie wczytuje '
         + 'stamtąd silnika 3D. Otwórz książkę przez lokalny serwer — na przykład '
         + 'rozszerzeniem „Live Server” w VS Code.'
  },
  siec: {
    tytul: 'Nie udało się wczytać silnika 3D',
    czemu: 'Plik assets/sky3d.js albo three.js nie doładował się. Reszta rozdziału '
         + 'jest kompletna bez widgetu.'
  },
  webgl: {
    tytul: 'Ten widget potrzebuje WebGL',
    czemu: 'Przeglądarka nie udostępnia WebGL-a.'
  },
  shader: {
    tytul: 'Karta graficzna odrzuciła ten widget',
    czemu: 'Sterownik nie skompilował shadera sceny. W konsoli jest pełny komunikat.'
  }
};

function sky3dPokazBrak(host, powod){
  var box = SKY3D_POWODY[powod] || SKY3D_POWODY.siec;
  var fb = host.querySelector('.viz3d__fallback');
  if(fb){
    var mocny = fb.querySelector('strong');
    if(mocny) mocny.textContent = box.tytul;
    var czemu = fb.querySelector('.viz3d__why');
    if(!czemu){
      czemu = document.createElement('span');
      czemu.className = 'viz3d__why';
      if(mocny && mocny.nextSibling) fb.insertBefore(czemu, mocny.nextSibling);
      else fb.appendChild(czemu);
    }
    czemu.textContent = box.czemu;
  }
  host.classList.add('no-webgl');
}
// Udostępniane globalnie — woła je też sky3d.js (moduł) przy braku WebGL / shaderze.
window.__sky3dPokazBrak = sky3dPokazBrak;

function sky3dPrzeglad(){
  var hosty = document.querySelectorAll('.viz3d');
  for(var i = 0; i < hosty.length; i++){
    // Pusty dataset = moduł ES w ogóle się nie wykonał (najczęściej file://).
    if(!hosty[i].dataset.sky3d){
      sky3dPokazBrak(hosty[i], location.protocol === 'file:' ? 'file' : 'siec');
    }
  }
}

window.addEventListener('load', function(){
  sky3dPrzeglad();
  // Drugi przebieg: widget daleko pod ekranem inicjalizuje się z opóźnieniem.
  setTimeout(sky3dPrzeglad, 1200);
});
