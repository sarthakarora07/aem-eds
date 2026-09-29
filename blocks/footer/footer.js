import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  // classify each row defensively: a list of links is the nav row, a row
  // with icons is the social row, everything else stays the legal row
  const topRows = document.createElement('div');
  topRows.className = 'footer-top';
  [...footer.children].forEach((row) => {
    if (row.querySelector('.icon')) {
      row.classList.add('footer-social');
      topRows.append(row);
    } else if (row.querySelector('ul')) {
      row.classList.add('footer-links');
      topRows.append(row);
    } else {
      row.classList.add('footer-legal');
    }
  });
  if (topRows.hasChildNodes()) footer.prepend(topRows);

  block.append(footer);
}
