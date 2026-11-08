import { isAuthenticated, isCurrentUser, redirectToHomepage, redirectToSignUp } from '../utils/authentication.js';
import { loadingTimeout, removeLoadingSpinner } from '../components/loading-spinner.js';
import { ToastNotification } from '../components/toast-notification.js';
import { apiClient } from '../api/api-client.js';
import { setPendingToast } from '../utils/pending-toast.js';
import validateForm from '../utils/validate-form.js';
import { Button, ButtonType, setButtonLoading } from '../components/buttons.js';
import { getTags } from '../components/tags-input.js';
import PostForm from '../components/post-form.js';

async function init() {
    if (!isAuthenticated()) {
        redirectToSignUp();
        return;
    }
    
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    
    try {
        const response = await getPost(id);
        if (!isCurrentUser(response.data.author.name)) {
            setPendingToast('error', 'Access Denied', 'You can only edit your own posts');
            redirectToHomepage();
            return;
        }
        
        const formCard = document.querySelector('.form-card');
        const form = PostForm(response.data);
        formCard.append(form);
        const button = Button('Save Changes', 'button button--primary', 'post-edit-save-button', ButtonType.Submit);
        form.append(button);
    } catch (ex) {
        ToastNotification.error('Loading post failed', ex.message);
    } finally {
        removeLoadingSpinner();
    }
    
    addSubmitEventListener();
}

async function getPost(id) {
    if (!id || isNaN(id)) {
        setPendingToast('error', 'Post not found', 'Cannot find a matching post.');
        redirectToHomepage();
    }

    const api = apiClient();
    const params = new URLSearchParams({_author: 'true'});
    return await api.get(`/social/posts/${id}?${params}`);
}

function addSubmitEventListener() {
    const form = document.querySelector('form.stack');
    if (!form) return;

    form.addEventListener('submit', async(e) => {
        const isValid = validateForm(e);
        if (!isValid) return;

        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const banner = document.getElementById('banner').value;

        const submitButton = form.querySelector('#post-edit-save-button');
        setButtonLoading(submitButton, true);

        const api = apiClient();

        try {
            await loadingTimeout();
            const body = {
                title: title,
                body: content,
                tags: getTags()
            };

            if (banner)
                body.media = { url: banner, alt: '' }

            const params = new URLSearchParams(window.location.search);
            const id = params.get('id');
            await api.put(`/social/posts/${id}`, body);
            setPendingToast('success', 'Post Updated', 'Post updated successfully.');
            window.location.replace(`post.html?id=${id}`);
        } catch (ex) {
            ToastNotification.error('Failed to update post', ex.message);
        } finally {
            setButtonLoading(submitButton, false);
        }
    });
}

await init();