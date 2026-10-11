import PostCard from '../components/post-card.js';
import EmptyState from '../components/empty-state.js';
import PaginationControls from '../components/pagination-controls.js';

export function updateFeed(...children) {
    const feedList = document.querySelector('.feed__list');
    feedList.replaceChildren(...children);
}

/**
 * @param response API response passed on to function that renders Post Cards.
 * @param pageChangeHandler callback function. Called with the new page number.
 * @param emptyMessage Message that will be shown if there are no posts to be displayed. Differs from initial page load and search.
 */
export function renderResponse(response, pageChangeHandler, emptyMessage) {
    document.querySelector('.pagination-controls').replaceWith(PaginationControls(response.meta, pageChangeHandler));
    renderPosts(response.data, emptyMessage);
}

/**
 * @param {object[]} posts Posts from the API response to render into Post Card components
 * @param {string} [emptyMessage='No posts yet'] Empty state message
 */
export function renderPosts(posts, emptyMessage = 'No posts yet') {
    if (!posts?.length) {
        updateFeed(EmptyState(emptyMessage));
        return;
    }

    const postCards = [];
    for (let i = 0; i < posts.length; i++)
        postCards.push(PostCard(posts[i]));

    updateFeed(...postCards);
}