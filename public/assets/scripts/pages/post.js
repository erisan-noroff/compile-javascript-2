import { isAuthenticated, redirectToSignIn } from '../utils/authentication.js';
import { LoadingSpinner, loadingTimeout, removeLoadingSpinner } from '../components/loading-spinner.js';
import { apiClient } from '../api/api-client.js';
import { ToastNotification } from '../components/toast-notification.js';
import EmptyState from '../components/empty-state.js';
import PostCard from '../components/post-card.js';

async function init() {
    if (!isAuthenticated()) {
        redirectToSignIn();
        return;
    }
    
    const main = document.querySelector('main');
    const homePageLink = document.createElement('a');
    main.append(homePageLink);
    homePageLink.textContent = 'Back to the feed';
    homePageLink.href = 'index.html';
    const singlePost = document.createElement('div');
    main.append(singlePost);
    singlePost.className = 'single-post';
    const loadingSpinner = LoadingSpinner();
    singlePost.append(loadingSpinner);

    try {
        await loadingTimeout();

        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        const response = await getPost(id);
        renderPost(response.data);
    } catch (ex) {
        ToastNotification.error('Loading post failed', ex.message);
    } finally {
        removeLoadingSpinner();
    }
}

function updateContent(...children) {
    const post = document.querySelector('.single-post');
    post.replaceChildren(...children);
}

async function getPost(id) {
    if (!id || isNaN(id))
        throw new Error('Cannot find a matching post.');
    
    const api = apiClient();
    const params = new URLSearchParams({_author: 'true', _reactions: 'true', _comments: 'true', id: id});
    return await api.get(`/social/posts/${id}?${params}`);
}

function renderPost(post) {
    if (!post) {
        const emptyState = EmptyState('Cannot find a matching post.');
        updateContent(emptyState);
        return;
    }
    
    const postCard = PostCard(post, true, true);
    updateContent(postCard);
}

await init();