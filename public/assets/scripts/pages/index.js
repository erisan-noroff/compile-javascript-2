import { isAuthenticated, redirectToSignUp } from '../utils/authentication.js';
import { apiClient } from '../api/api-client.js';
import { ToastNotification } from '../components/toast-notification.js';
import PostCard from '../components/post-card.js';
import { LoadingSpinner, loadingTimeout, removeLoadingSpinner } from '../components/loading-spinner.js';
import EmptyState from '../components/empty-state.js';
import TextInput from '../components/form-group.js';
import PaginationControls from '../components/pagination-controls.js';

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

        const response = await getPosts();
        const paginationControls = PaginationControls(response.meta, pageChangeHandler);
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

async function pageChangeHandler(pageNumber) {
    const searchInput = document.getElementById('search');

    try {
        updateFeed(LoadingSpinner());
        await loadingTimeout();
        const response = await getPosts(searchInput.value.trim(), pageNumber);
        renderResponse(response);
    } catch (ex) {
        ToastNotification.error('Loading page failed', ex.message);
    } finally {
        removeLoadingSpinner();
    }
}

function updateFeed(...children) {
    const feed = document.querySelector('.feed');
    const searchField = document.querySelector('.feed__search');
    const paginationControls = document.querySelector('.pagination-controls');
    feed.replaceChildren(searchField, ...children, paginationControls);
}

/**
 * @param response API response passed on to function that renders Post Cards.
 * @param emptyMessage Message that will be shown if there are no posts to be displayed. Differs from initial page load and search.
 */
function renderResponse(response, emptyMessage) {
    document.querySelector('.pagination-controls').replaceWith(PaginationControls(response.meta, pageChangeHandler));
    renderPosts(response.data, emptyMessage);
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

await init();