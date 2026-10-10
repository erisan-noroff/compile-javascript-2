import { isAuthenticated, redirectToSignUp } from '../utils/authentication.js';
import { LoadingSpinner, loadingTimeout, removeLoadingSpinner } from '../components/loading-spinner.js';
import { ToastNotification } from '../components/toast-notification.js';
import { apiClient } from '../api/api-client.js';

async function init() {
    if (!isAuthenticated()) {
        redirectToSignUp();
        return;
    }

    const main = document.querySelector('main');
    const homePageLink = document.createElement('a');
    main.append(homePageLink);
    homePageLink.textContent = 'Back to the feed';
    homePageLink.href = 'index.html';
    
    const profile = document.createElement('div');
    main.append(profile);
    
    const loadingSpinner = LoadingSpinner();
    profile.append(loadingSpinner);

    try {
        await loadingTimeout();

        const params = new URLSearchParams(window.location.search);
        const name = localStorage.getItem('name') ?? params.get('name');
        const profile = await getProfile(name);
    } catch (ex) {
        ToastNotification.error('Loading post failed', ex.message);
    } finally {
        removeLoadingSpinner();
    }
}

async function getProfile(name) {
    if (!name)
        throw new Error('Cannot find a matching profile.');

    const api = apiClient();
    return await api.get(`/social/profiles/${name}`);
}

await init();