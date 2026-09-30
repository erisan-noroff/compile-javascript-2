import { isAuthenticated, redirectToSignUp } from '../utils/authentication.js';
import { apiClient } from '../api/api-client.js';
import { ToastNotification } from '../components/toast-notification.js';
import PostCard from '../components/post-card.js';
import { LoadingSpinner, removeLoadingSpinner } from '../components/loading-spinner.js';
import EmptyState from '../components/empty-state.js';

async function init() {
    if (!isAuthenticated()) {
        redirectToSignUp();
        return;
    }
    
    loadingSpinner();
    
    try {
        await new Promise(resolve => setTimeout(resolve, 3000));
        const posts = await getPosts();
        const main = document.querySelector('main');
        const feed = document.createElement('div');
        feed.className = 'feed';
        main.append(feed);
        
        if (!posts?.length) {
            const emptyState = EmptyState('No posts yet.');
            feed.append(emptyState);
            return;
        }
        
        for (let i = 0; i < posts.length; i++) {
            const postCard = PostCard(posts[i]);
            feed.append(postCard);
        }
    } catch (ex) {
        ToastNotification.error('Loading posts failed', ex.message);
    } finally {
        removeLoadingState();
    }
}

async function getPosts(page = 1) {
    const api = apiClient();
    const params = new URLSearchParams({ _author: 'true', limit: '25', page: page.toString() });
    return await api.get(`/social/posts?${params}`);
}

await init();