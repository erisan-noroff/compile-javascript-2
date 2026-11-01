import { Button } from './buttons.js';
import Icon from './icon.js';
import { apiClient } from '../api/api-client.js';
import { setPendingToast } from '../utils/pending-toast.js';
import { ToastNotification } from './toast-notification.js';

let modal;

function deletePostConfirmation() {
    const modal = document.createElement('dialog');
    modal.className = 'confirmation-modal';

    const header = document.createElement('div');
    header.className = 'confirmation-modal__row';

    const message = document.createElement('p');
    message.textContent = 'Are you sure you want to delete this post?';
    header.append(message);

    const actions = document.createElement('div');
    actions.className = 'confirmation-modal__row';

    const closeBtn = Button('', 'confirmation-modal__close');
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.append(Icon('close'));
    closeBtn.addEventListener('click', () => modal.close());
    header.append(closeBtn);

    const cancelBtn = Button('Cancel', 'btn secondary-btn');
    cancelBtn.autofocus = true;
    cancelBtn.addEventListener('click', () => modal.close());

    const confirmationBtn = Button('Delete', 'btn danger-btn');
    confirmationBtn.addEventListener('click', async() => {
        modal.close();
        await deletePost(modal.dataset.postId);
    });

    actions.append(cancelBtn, confirmationBtn);
    modal.append(header, actions);

    return modal;
}

export default function openDeletePostConfirmation(postId) {
    if (!modal) {
        modal = deletePostConfirmation();
        document.body.append(modal);
    }

    modal.dataset.postId = postId;
    modal.showModal();
}

async function deletePost(postId) {
    console.log(postId);
    if (!postId || isNaN(postId))
        return;

    try {
        const api = apiClient();
        await api.delete(`/social/posts/${postId}`);

        const card = document.getElementById(`post-${postId}`);
        if (!card) {
            setPendingToast('success', 'Post deleted', 'Your post has been successfully deleted');
            window.location.replace('index.html');
        } else {
            card.remove();
            ToastNotification.success('Post deleted', 'Your post has been successfully deleted');
        }
    } catch (ex) {
        ToastNotification.error('Failed to delete post', ex.message);
    }
}