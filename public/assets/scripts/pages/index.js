import { isAuthenticated, redirectToSignUp } from '../utils/authentication.js';
import { apiClient } from '../api/api-client.js';
import { ToastNotification } from '../components/toast-notification.js';
import PostCard from '../components/post-card.js';
import { LoadingSpinner, removeLoadingSpinner } from '../components/loading-spinner.js';
import EmptyState from '../components/empty-state.js';
import TextInput from '../components/form-group.js';
import { Button } from '../components/buttons.js';
import Icon from '../components/Icon.js';

async function init() {
    if (!isAuthenticated()) {
        redirectToSignUp();
        return;
    }

    const main = document.querySelector('main');
    const feed = document.createElement('div');
    feed.className = 'feed';
    main.append(feed);
    const loadingSpinner = LoadingSpinner();
    feed.append(loadingSpinner);

    try {
        await loadingTimeout();

        const searchField = SearchField();
        searchField.classList.add('feed__search');
        feed.append(searchField);
        addSearchEventListener();
        addPaginationEventListener();

        const response = await getPosts();
        const paginationControls = PaginationControls(response.meta);
        feed.append(paginationControls);
        renderPosts(response.data);

    } catch (ex) {
        ToastNotification.error('Loading posts failed', ex.message);
    } finally {
        removeLoadingSpinner();
    }
}

/**
 * Fetches posts from the API.
 * @param {string} [query=''] Search criteria
 * @param {number} [page=1] Page number
 * @returns {Promise<{data: object[], meta: object}>} Posts including author, and pagination meta
 */
async function getPosts(query, page = 1) {
    const api = apiClient();
    const params = new URLSearchParams({_author: 'true', limit: '25', page: page.toString()});
    const endpoint = query ? '/social/posts/search' : '/social/posts';
    if (query)
        params.set('q', query);

    return await api.get(`${endpoint}?${params}`);
}

function SearchField() {
    const search = document.createElement('search');
    search.append(TextInput({
                id: 'search',
                label: 'Search',
                type: 'search',
                placeholder: 'Search by content or title'
            }
        )
    );
    
    return search;
}

function addSearchEventListener() {
    const searchInput = document.getElementById('search');

    let timer;
    searchInput.addEventListener('input', () => {
        clearTimeout(timer);
        timer = setTimeout(async() => {
            const query = searchInput?.value.trim();
            try {
                updateFeed(LoadingSpinner());
                await loadingTimeout();
                const response = await getPosts(query);
                renderResponse(response, 'No matching posts found');
            } catch (ex) {
                ToastNotification.error('Searching for posts failed', ex.message);
            } finally {
                removeLoadingSpinner();
            }
        }, 300);
    });
}

function addPaginationEventListener() {
    const feed = document.querySelector('.feed');
    const searchInput = document.getElementById('search');

    feed.addEventListener('click', async(e) => {
        const pageBtn = e.target.closest('.pagination-btn');
        if (!pageBtn)
            return;
        
        try {
            updateFeed(LoadingSpinner());
            await loadingTimeout();
            const response = await getPosts(searchInput.value.trim(), Number(pageBtn.dataset.pageNumber));
            renderResponse(response);
            window.scrollTo({top: 0});
        } catch (ex) {
            ToastNotification.error('Loading page failed', ex.message);
        } finally {
            removeLoadingSpinner();
        }
    });
}

function loadingTimeout() {
    return new Promise(resolve => setTimeout(resolve, 2000));
}

function updateFeed(...children) {
    const feed = document.querySelector('.feed');
    const searchField = document.querySelector('.feed__search');
    const paginationControls = document.querySelector('.pagination-controls');
    feed.replaceChildren(searchField, ...children, paginationControls);
}

/**
 * @param {object[]} posts Posts from the API response to render into Post Card components
 * @param {string} [emptyMessage='No posts yet'] Empty state message
 */
function renderPosts(posts, emptyMessage = 'No posts yet') {
    if (!posts?.length) {
        updateFeed(EmptyState(emptyMessage));
        return;
    }

    const postCards = [];
    for (let i = 0; i < posts.length; i++)
        postCards.push(PostCard(posts[i]));

    updateFeed(...postCards);
}

function renderResponse(response, emptyMessage) {
    document.querySelector('.pagination-controls').replaceWith(PaginationControls(response.meta));
    renderPosts(response.data, emptyMessage);
}

function PaginationControls(meta) {
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
    lastPageBtn.dataset.pageNumber = meta.pageCount;
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

    paginationControls.append(firstPageBtn, previousPageBtn, ...paginationButtons, nextPageBtn, lastPageBtn);

    return paginationControls;
}

await init();