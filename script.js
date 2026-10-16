document.addEventListener('DOMContentLoaded', () => {
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menu && nav) {
menu.addEventListener('click', () => {
const open = menu.getAttribute('aria-expanded') !== 'true';
menu.setAttribute('aria-expanded', String(open));
nav.classList.toggle('open', open);
});

nav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    menu.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
  });
});

}

document.querySelectorAll('#year').forEach(el => {
el.textContent = new Date().getFullYear();
});

const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
const observer = new IntersectionObserver(entries => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('visible');
observer.unobserve(entry.target);
}
});
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

} else {
revealEls.forEach(el => el.classList.add('visible'));
}

const glow = document.querySelector('.cursor-glow');

if (glow && window.matchMedia('(hover:hover)').matches) {
window.addEventListener('pointermove', e => {
glow.style.left = e.clientX + 'px';
glow.style.top = e.clientY + 'px';
}, { passive: true });
}

const config = [
{
id: 'coloredGrid',
folder: 'assets/images/color',
prefix: 'artwork-',
count: 3,
ext: 'jpg',
label: 'Colored artwork',
kind: 'image'
},
{
id: 'sketchGrid',
folder: 'assets/images/sketch',
prefix: 'sketch-',
count: 3,
ext: 'jpg',
label: 'Sketch / line art',
kind: 'image'
},
{
id: 'timelapseGrid',
folder: 'assets/timelapses',
prefix: 'timelapse-',
count: 2,
ext: 'mp4',
label: 'Art timelapse',
kind: 'video'
},
{
id: 'coverGrid',
folder: 'assets/images/cover',
prefix: 'book-cover-',
count: 1,
ext: 'jpg',
label: 'Book cover artwork',
kind: 'image'
}
];

const lightbox = document.getElementById('lightbox');
const lightboxContent = lightbox?.querySelector('.lightbox-content');
const caption = lightbox?.querySelector('.lightbox-caption');

function showLightbox(src, title, kind) {
if (!lightbox || !lightboxContent) return;

lightboxContent.innerHTML = '';

let media;

if (kind === 'video') {
  media = document.createElement('video');
  media.src = src;
  media.controls = true;
  media.autoplay = true;
  media.playsInline = true;
} else {
  media = document.createElement('img');
  media.src = src;
  media.alt = title;
  media.decoding = 'async';
}

lightboxContent.appendChild(media);

if (caption) caption.textContent = title;

lightbox.classList.add('open');
lightbox.setAttribute('aria-hidden', 'false');
document.body.style.overflow = 'hidden';

}

function closeLightbox() {
if (!lightbox) return;

lightbox.classList.remove('open');
lightbox.setAttribute('aria-hidden', 'true');

if (lightboxContent) lightboxContent.innerHTML = '';

document.body.style.overflow = '';

}

lightbox?.querySelector('.lightbox-close')
?.addEventListener('click', closeLightbox);

lightbox?.addEventListener('click', e => {
if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', e => {
if (e.key === 'Escape') closeLightbox();
});

config.forEach(group => {
const grid = document.getElementById(group.id);
if (!grid) return;

for (let i = 1; i <= group.count; i++) {
  const filename =
    group.prefix + String(i).padStart(2, '0') + '.' + group.ext;

  const src = group.folder + '/' + filename;
  const card = document.createElement('article');

  card.className =
    'art-card ' +
    (group.kind === 'video' ? 'video-card ' : '') +
    (group.id === 'coverGrid' ? 'cover-card' : '');

  const mediaWrap = document.createElement('div');
  mediaWrap.className =
    'art-media placeholder' +
    (group.kind === 'video' ? ' video-media' : '');

  let media;

  function showMissing(message) {
    mediaWrap.classList.add('missing-media');

    let label = mediaWrap.querySelector('.missing-label');

    if (!label) {
      label = document.createElement('div');
      label.className = 'missing-label';

      const symbol = document.createElement('span');
      symbol.className = 'missing-spark';
      symbol.textContent = '✳';

      const title = document.createElement('b');
      const hint = document.createElement('small');

      label.append(symbol, title, hint);
      mediaWrap.appendChild(label);
    }

    label.querySelector('b').textContent = message;
    label.querySelector('small').textContent = filename;
  }

  if (group.kind === 'video') {
    media = document.createElement('video');
    media.src = src;
    media.muted = true;
    media.loop = true;
    media.playsInline = true;
    media.preload = 'metadata';

    media.addEventListener('loadedmetadata', () => {
      mediaWrap.classList.remove('placeholder', 'missing-media');
    });

    media.addEventListener('error', () => {
      showMissing('Check video filename');
    });

    mediaWrap.appendChild(media);
  } else {
    media = document.createElement('img');
    media.src = src;
    media.alt = group.label + ' ' + i;
    media.loading = 'lazy';
    media.decoding = 'async';

    media.addEventListener('load', () => {
      mediaWrap.classList.remove('placeholder', 'missing-media');
      mediaWrap.querySelector('.missing-label')?.remove();
    });

    media.addEventListener('error', () => {
      media.style.display = 'none';
      showMissing('Check image filename');
    });

    mediaWrap.appendChild(media);
  }

  const title = document.createElement('div');
  title.className = 'art-title';

  const name = document.createElement('b');
  name.textContent =
    group.id === 'coverGrid'
      ? 'Book cover artwork'
      : group.label + ' ' + String(i).padStart(2, '0');

  const number = document.createElement('span');
  number.textContent = String(i).padStart(2, '0');

  title.append(name, number);
  card.append(mediaWrap, title);

  card.addEventListener('click', () => {
    if (
      group.kind === 'video' &&
      media.readyState > 0
    ) {
      showLightbox(src, name.textContent, 'video');
    } else if (
      group.kind === 'image' &&
      media.complete &&
      media.naturalWidth > 0
    ) {
      showLightbox(src, name.textContent, 'image');
    }
  });

  grid.appendChild(card);
}

});

if (location.hash) {
setTimeout(() => {
const target = document.querySelector(location.hash);

  if (target) {
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}, 180);

}
})
