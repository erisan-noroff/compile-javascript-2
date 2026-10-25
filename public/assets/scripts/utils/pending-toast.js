import { ToastNotification } from '../components/toast-notification.js';

export function setPendingToast(type, title, msg) {
    sessionStorage.setItem('pending-toast', JSON.stringify({type, title, msg}));
}

/** Displays pending toast notification, if any, and removes it from session storage to avoid repeating. */
export function showPendingToast() {
    const pendingToast = sessionStorage.getItem('pending-toast');
    if (!pendingToast)
        return;

    sessionStorage.removeItem('pending-toast');
    const {type, title, msg} = JSON.parse(pendingToast);

    ToastNotification[type]?.(title, msg);
}