import { isAuthenticated, redirectToSignUp } from '../utils/authentication.js';
import formValidation from '../utils/form-validation.js';
import { Button, ButtonType, setButtonLoading } from '../components/buttons.js';
import { apiClient } from '../api/api-client.js';
import { ToastNotification } from '../components/toast-notification.js';
import { loadingTimeout } from '../components/loading-spinner.js';
import { getTags } from '../components/tags-input.js';
import { setPendingToast } from '../utils/pending-toast.js';
import PostForm from '../components/post-form.js';

function init() {
    if (!isAuthenticated()) {
        redirectToSignUp();
        return;
    }
    
    const formCard = document.querySelector('.form-card');
    const form = PostForm();
    formCard.append(form);
    const button = Button('Create Post', 'btn primary-btn', 'post-create-btn', ButtonType.Submit);
    form.append(button);
    
    addSubmitEventListener();
}

function addSubmitEventListener() {
    const form = document.querySelector('form.stack');
    if (!form) return;

    form.addEventListener('submit', async(e) => {
        const isValid = formValidation(e);
        if (!isValid) return;

        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const banner = document.getElementById('banner').value;
        
        const submitBtn = form.querySelector('#post-create-btn');
        setButtonLoading(submitBtn, true);

        const api = apiClient();

        try {
            loadingTimeout();
            const body = {
                title: title,
                body: content,
                tags: getTags()
            };
            
            if (banner)
                body.media = { url: banner, alt: '' }
            
            const response = await api.post('/social/posts', body);
            setPendingToast('success', 'Post Created', 'Post created successfully.');
            window.location.replace(`/post.html?id=${response.data.id}`);
        } catch (ex) {
            ToastNotification.error('Failed to create post', ex.message);
        } finally {
            setButtonLoading(submitBtn, false);
        }
    });
}

init();