import Icon from './icon.js';

const TOAST_TYPES = {
    success: {
        id: 'toast-success',
        modifier: 'toast--success',
        icon: 'check',
        altText: 'success alert'
    },
    error: {
        id: 'toast-error',
        modifier: 'toast--danger',
        icon: 'close',
        altText: 'error alert'
    }
}

export const ToastNotification = {
    /**
     * Display success toast message
     * @param {string} title - Toast title
     * @param {string} message - Toast message
     */
    success(title, message) {
        displayToast('success', title, message);
    },
    /**
     * Display error toast message
     * @param {string} title - Toast title
     * @param {string} message - Toast message
     */
    error(title, message) {
        displayToast('error', title, message);
    },
    /**
     * Display API generic error message
     */
    apiGenericError() {
        displayToast('error', 'Server error', 'Something went wrong. Please refresh the page.');
    }
}

function displayToast(type, title, message) {
    // Avoids same toast from being displayed multiple times if the user spam clicks a button that triggers it.
    removeToastIfAlreadyExists();

    const main = document.querySelector('main');
    const toast = document.createElement('div');
    toast.classList.add('toast', `${TOAST_TYPES[type].modifier}`);
    toast.id = TOAST_TYPES[type].id;
    main.prepend(toast);

    const toastIndicator = document.createElement('span');
    toastIndicator.classList.add('toast__indicator');
    toast.append(toastIndicator);

    const toastContent = document.createElement('div');
    toastContent.classList.add('toast__content');
    toast.append(toastContent);

    const toastIconContainer = document.createElement('span');
    toastIconContainer.classList.add('toast__icon');

    const toastIcon = Icon(TOAST_TYPES[type].icon);
    toastIconContainer.append(toastIcon);
    toastContent.append(toastIconContainer);

    const toastText = document.createElement('div');
    toastText.classList.add('toast__text');
    toastContent.append(toastText);

    const toastTitle = document.createElement('p');
    toastTitle.classList.add('toast__title');
    toastTitle.innerText = title;
    toastText.append(toastTitle);

    const toastMessage = document.createElement('p');
    toastMessage.classList.add('toast__body');
    toastMessage.innerText = message;
    toastText.append(toastMessage);

    const toastCloseBtn = document.createElement('button');
    toastCloseBtn.id = 'close-toast';
    toastCloseBtn.classList.add('toast__close');
    toastCloseBtn.ariaLabel = 'Dismiss notification';
    toast.append(toastCloseBtn);
    const toastCloseIcon = Icon('close');
    toastCloseBtn.append(toastCloseIcon);
    addCloseBtnEventListener(type);

    // Hovering or focusing the notification resets the timer of 5 seconds before it gets dismissed.
    let timer;
    const pauseTimer = () => clearTimeout(timer);
    const resumeTimer = () => { timer = setTimeout(() => toast.remove(), 5000); };
    resumeTimer();
    
    toast.addEventListener('mouseenter', pauseTimer);
    toast.addEventListener('focusin', pauseTimer);
    toast.addEventListener('mouseleave', resumeTimer);
    toast.addEventListener('focusout', resumeTimer);
}

function addCloseBtnEventListener(type) {
    const closeToastBtn = document.getElementById('close-toast');
    if (closeToastBtn) {
        closeToastBtn.addEventListener('click', () => {
            document.getElementById(TOAST_TYPES[type].id)?.remove();
        });
    }
}

function removeToastIfAlreadyExists() {
    Object.values(TOAST_TYPES).forEach(({ id }) => document.getElementById(id)?.remove());
}