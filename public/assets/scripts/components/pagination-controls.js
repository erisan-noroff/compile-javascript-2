import { Button } from './buttons.js';
import Icon from './icon.js';

/**
 * @typedef {object} meta
 * @property {boolean} isFirstPage
 * @property {boolean} isLastPage
 * @property {number} currentPage
 * @property {number|null} previousPage
 * @property {number|null} nextPage
 * @property {number} pageCount
 * @property {number} totalCount
 */
/**
 * Pagination controls with First, Back, page numbers, Next and Last
 * @param {object} meta Pagination meta from the API response
 * @param pageChangeHandler Callback function from the parent caller. The parent caller decides what happens on page change.
 * @returns {HTMLDivElement}
 */
export default function PaginationControls(meta, pageChangeHandler) {
    const paginationControls = document.createElement('div');
    paginationControls.className = 'pagination-controls';
    
    const firstPageButton = PaginationButton('first_page', 'First', 'First page', true);
    firstPageButton.disabled = !!meta.isFirstPage;
    firstPageButton.dataset.pageNumber = '1';
    
    const previousPageButton = PaginationButton('chevron_left', 'Back', 'Previous page');
    previousPageButton.disabled = !!meta.isFirstPage;
    previousPageButton.dataset.pageNumber = meta.previousPage;
    
    const nextPageButton = PaginationButton('chevron_right', 'Next', 'Next page');
    nextPageButton.disabled = !!meta.isLastPage;
    nextPageButton.dataset.pageNumber = meta.nextPage;
    
    const lastPageButton = PaginationButton('last_page', 'Last', 'Last page', true);
    lastPageButton.disabled = !!meta.isLastPage;
    lastPageButton.dataset.pageNumber = meta.pageCount.toString();
    
    let start = Math.max(1, meta.currentPage - 2);
    let end = start + 4;

    if (end > meta.pageCount) {
        end = meta.pageCount;
        start = Math.max(1, end - 4);
    }

    const paginationButtons = [];
    for (let i = start; i <= end; i++) {
        const pageNumberString = i.toString();
        const pageButton = Button(pageNumberString, 'pagination-button pagination-button--page-num');
        pageButton.dataset.pageNumber = pageNumberString;

        if (meta.currentPage === i) {
            pageButton.classList.add('pagination-button--current-page');
            pageButton.setAttribute('aria-current', 'page');
        }

        paginationButtons.push(pageButton);
    }

    paginationControls.addEventListener('click', async(e) => {
        const pageButton = e.target.closest('.pagination-button');
        if (!pageButton)
            return;

        const pageNumber = pageButton.dataset.pageNumber;
        paginationControls.querySelector('.pagination-button--current-page')?.classList.remove('pagination-button--current-page');
        paginationControls.querySelector(`.pagination-button--page-num[data-page-number="${pageNumber}"]`)?.classList.add('pagination-button--current-page');
        window.scrollTo({top: 0});

        pageChangeHandler(Number(pageNumber));
    });

    paginationControls.append(firstPageButton, previousPageButton, ...paginationButtons, nextPageButton, lastPageButton);

    return paginationControls;
}

function PaginationButton(icon, text, ariaLabel, desktopOnly = false) {
    const paginationButton = Button('', 'pagination-button');
    paginationButton.classList.toggle('pagination-button--desktop-only', desktopOnly);
    paginationButton.setAttribute('aria-label', ariaLabel);
    
    const pageButtonIcon = Icon(icon);
    paginationButton.append(pageButtonIcon);
    
    const pageButtonLabel = document.createElement('span');
    pageButtonLabel.className = 'pagination-button__label';
    pageButtonLabel.textContent = text;
    paginationButton.append(pageButtonLabel);
    
    return paginationButton;
}