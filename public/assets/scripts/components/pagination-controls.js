import { Button } from './buttons.js';
import Icon from './Icon.js';

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
 * @param pageChangeHandler Callback function from the parent caller. The parent caller decides what happens on page
 *     change.
 * @returns {HTMLDivElement}
 */
export default function PaginationControls(meta, pageChangeHandler) {
    const paginationControls = document.createElement('div');
    paginationControls.className = 'pagination-controls';

    const firstPageBtn = Button('First', 'pagination-btn pagination-btn--desktop-only');
    firstPageBtn.disabled = !!meta.isFirstPage;
    firstPageBtn.dataset.pageNumber = '1';
    const firstPageIcon = Icon('first_page');
    firstPageBtn.prepend(firstPageIcon);

    const previousPageBtn = Button('Back', 'pagination-btn');
    previousPageBtn.disabled = !!meta.isFirstPage;
    previousPageBtn.dataset.pageNumber = meta.previousPage;
    const previousPageIcon = Icon('chevron_left');
    previousPageBtn.prepend(previousPageIcon);

    const nextPageBtn = Button('Next', 'pagination-btn');
    nextPageBtn.disabled = !!meta.isLastPage;
    nextPageBtn.dataset.pageNumber = meta.nextPage;
    const nextPageIcon = Icon('chevron_right');
    nextPageBtn.append(nextPageIcon);

    const lastPageBtn = Button('Last', 'pagination-btn pagination-btn--desktop-only');
    lastPageBtn.disabled = !!meta.isLastPage;
    lastPageBtn.dataset.pageNumber = meta.pageCount.toString();
    const lastPageIcon = Icon('last_page');
    lastPageBtn.append(lastPageIcon);

    let start = Math.max(1, meta.currentPage - 2);
    let end = start + 4;

    if (end > meta.pageCount) {
        end = meta.pageCount;
        start = Math.max(1, end - 4);
    }

    const paginationButtons = [];
    for (let i = start; i <= end; i++) {
        const pageNumberString = i.toString();
        const pageBtn = Button(pageNumberString, 'pagination-btn pagination-btn--page-num');
        pageBtn.dataset.pageNumber = pageNumberString;

        if (meta.currentPage === i) {
            pageBtn.classList.add('pagination-btn--current-page');
            pageBtn.setAttribute('aria-current', 'page');
        }

        paginationButtons.push(pageBtn);
    }

    paginationControls.addEventListener('click', async(e) => {
        const pageBtn = e.target.closest('.pagination-btn');
        if (!pageBtn)
            return;

        const pageNumber = pageBtn.dataset.pageNumber;
        paginationControls.querySelector('.pagination-btn--current-page')?.classList.remove('pagination-btn--current-page');
        paginationControls.querySelector(`.pagination-btn--page-num[data-page-number="${pageNumber}"]`)?.classList.add('pagination-btn--current-page');
        window.scrollTo({top: 0});

        pageChangeHandler(Number(pageNumber));
    });

    paginationControls.append(firstPageBtn, previousPageBtn, ...paginationButtons, nextPageBtn, lastPageBtn);

    return paginationControls;
}