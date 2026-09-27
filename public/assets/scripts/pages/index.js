import { isAuthenticated, redirectToSignUp } from '../utils/authentication.js';
import { apiClient } from '../api/api-client.js';
import { ToastNotification } from '../components/toast-notification.js';
import { Postcard } from '../components/postcard.js';

async function init() {
    if (!isAuthenticated()) {
        redirectToSignUp();
        return;
    }
    
    try {
        const posts = await getPosts();
        const feed = document.querySelector('.feed');
        for (let i = 0; i < posts.length; i++) {
            const postcard = Postcard(posts[i]);
            feed.append(postcard);
        }
    } catch (ex) {
        ToastNotification.error('Loading posts failed', ex.message);
    }
}

async function getPosts(page = 1) {
    const api = apiClient();
    const params = new URLSearchParams({ _author: 'true', limit: '25', page: page.toString() });
    return await api.get(`/social/posts?${params}`);
}

await init();