import { createOptimizedPicture } from '../../scripts/aem.js';

let carouselCount = 0;

function goToSlide(block, index) {
  const slides = [...block.querySelectorAll('.carousel-slide')];
  const indicators = [...block.querySelectorAll('.carousel-indicator')];
  const total = slides.length;
  if (!total) return;
  const newIndex = ((index % total) + total) % total;
  block.currentSlide = newIndex;

  slides.forEach((slide, i) => {
    const active = i === newIndex;
    slide.classList.toggle('carousel-slide-active', active);
    slide.setAttribute('aria-hidden', String(!active));
    slide.querySelectorAll('a').forEach((a) => { a.tabIndex = active ? 0 : -1; });
  });

  indicators.forEach((indicator, i) => {
    const active = i === newIndex;
    indicator.setAttribute('aria-selected', String(active));
    indicator.tabIndex = active ? 0 : -1;
    indicator.classList.toggle('carousel-indicator-active', active);
  });
}

function pauseAutoplay(block) {
  clearInterval(block.autoplayTimer);
  const track = block.querySelector('.carousel-slides');
  if (track) track.setAttribute('aria-live', 'polite');
}

function resumeAutoplay(block) {
  const delay = parseInt(block.dataset.autoplayDelay, 10);
  if (!delay || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  clearInterval(block.autoplayTimer);
  const track = block.querySelector('.carousel-slides');
  if (track) track.setAttribute('aria-live', 'off');
  block.autoplayTimer = setInterval(() => {
    goToSlide(block, block.currentSlide + 1);
  }, delay);
}

export default function decorate(block) {
  carouselCount += 1;
  const id = `carousel-${carouselCount}`;
  const rows = [...block.children];
  const total = rows.length;

  const ul = document.createElement('ul');
  ul.className = 'carousel-slides';
  ul.setAttribute('aria-live', 'off');

  const indicatorsList = document.createElement('ol');
  indicatorsList.className = 'carousel-indicators';
  indicatorsList.setAttribute('role', 'tablist');
  indicatorsList.setAttribute('aria-label', 'Choose a slide to display');

  rows.forEach((row, i) => {
    const li = document.createElement('li');
    li.className = 'carousel-slide';
    li.id = `${id}-slide-${i}`;
    li.setAttribute('role', 'group');
    li.setAttribute('aria-roledescription', 'slide');
    li.setAttribute('aria-label', `Slide ${i + 1} of ${total}`);

    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'carousel-slide-image';
      else div.className = 'carousel-slide-body';
    });

    ul.append(li);

    const title = li.querySelector('h1, h2, h3, h4, h5, h6');
    const label = title ? title.textContent.trim() : `Slide ${i + 1}`;

    const indicator = document.createElement('li');
    indicator.className = 'carousel-indicator';
    indicator.id = `${id}-indicator-${i}`;
    indicator.setAttribute('role', 'tab');
    indicator.setAttribute('aria-controls', li.id);
    indicator.setAttribute('aria-label', `Slide ${i + 1}`);
    indicator.textContent = label;
    indicator.addEventListener('click', () => goToSlide(block, i));
    indicatorsList.append(indicator);
  });

  indicatorsList.addEventListener('keydown', (e) => {
    const items = [...indicatorsList.children];
    const current = items.indexOf(document.activeElement);
    let next;
    if (e.key === 'ArrowRight') next = (current + 1) % items.length;
    else if (e.key === 'ArrowLeft') next = (current - 1 + items.length) % items.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = items.length - 1;
    else return;
    e.preventDefault();
    items[next].focus();
    goToSlide(block, next);
  });

  const actions = document.createElement('div');
  actions.className = 'carousel-actions';

  const prevButton = document.createElement('button');
  prevButton.type = 'button';
  prevButton.className = 'carousel-action carousel-action-previous';
  prevButton.setAttribute('aria-label', 'Previous');
  prevButton.addEventListener('click', () => goToSlide(block, block.currentSlide - 1));

  const nextButton = document.createElement('button');
  nextButton.type = 'button';
  nextButton.className = 'carousel-action carousel-action-next';
  nextButton.setAttribute('aria-label', 'Next');
  nextButton.addEventListener('click', () => goToSlide(block, block.currentSlide + 1));

  actions.append(prevButton, nextButton);

  const controls = document.createElement('div');
  controls.className = 'carousel-controls';
  controls.append(indicatorsList, actions);

  block.id = id;
  block.setAttribute('role', 'region');
  block.setAttribute('aria-roledescription', 'carousel');
  block.dataset.autoplayDelay = '5000';
  block.textContent = '';
  block.append(ul, controls);

  ul.querySelectorAll('picture > img').forEach((img) => {
    img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [
      { media: '(min-width: 600px)', width: '1600' },
      { width: '750' },
    ]));
  });

  block.currentSlide = 0;
  goToSlide(block, 0);

  block.addEventListener('mouseenter', () => pauseAutoplay(block));
  block.addEventListener('mouseleave', () => resumeAutoplay(block));
  block.addEventListener('focusin', () => pauseAutoplay(block));
  block.addEventListener('focusout', () => resumeAutoplay(block));

  resumeAutoplay(block);
}
