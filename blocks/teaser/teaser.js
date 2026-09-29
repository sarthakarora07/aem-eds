import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const content = document.createElement('div');
  content.className = 'teaser-content';
  let image;

  [...block.children].forEach((row) => {
    [...row.children].forEach((cell) => {
      const picture = cell.querySelector('picture');
      const isImageCell = picture && cell.children.length === 1 && cell.textContent.trim() === '';
      if (isImageCell) {
        image = cell;
      } else {
        content.append(...cell.childNodes);
      }
    });
  });

  const heading = content.querySelector('h1, h2, h3, h4, h5, h6');
  const firstChild = content.firstElementChild;
  if (heading && firstChild && firstChild !== heading && firstChild.tagName === 'P') {
    firstChild.classList.add('teaser-pretitle');
  }

  block.textContent = '';
  if (image) {
    image.className = 'teaser-image';
    block.append(image);
  }
  if (content.hasChildNodes()) block.append(content);

  block.querySelectorAll('picture > img').forEach((img) => {
    img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [
      { media: '(min-width: 600px)', width: '1200' },
      { width: '750' },
    ]));
  });
}
