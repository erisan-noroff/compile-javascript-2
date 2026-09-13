import { redirectToHomepage } from '../utils/authentication.js';
import { createTextInput } from '../components/form-group.js';
import { Button, ButtonType, setButtonLoading } from '../components/buttons.js';
import { ToastNotification } from '../components/toast-notification.js';
import { apiClient } from '../api/api-client.js';
import formValidation from '../utils/form-validation.js';

function init() {
    if (sessionStorage.getItem('showSignUpSuccess')) {
        ToastNotification.success('Account Created', 'Sign in to get started.');
        sessionStorage.removeItem('showSignUpSuccess');
    }
    
    const form = document.querySelector('form.stack');
    const FormFields = [
        {
            id: 'email',
            label: 'email',
            type: 'email',
            placeholder: 'john.doe@stud.noroff.no',
            required: true,
            autocomplete: 'email'
        },
        {
            id: 'password',
            label: 'password',
            placeholder: 'Enter your password',
            type: 'password',
            required: true,
            autocomplete: 'current-password'
        }
    ];

    form.append(...FormFields.map(createTextInput));

    const button = Button('sign in', 'primary-btn', 'login-btn', ButtonType.Submit);
    form.append(button);

    addSubmitEventListener();
}

function addSubmitEventListener() {
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', async(e) => {
        const isValid = formValidation(e);
        if (!isValid) return;
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const submitBtn = form.querySelector('#login-btn');
        setButtonLoading(submitBtn, true);

        const api = apiClient();

        try {
            await new Promise(resolve => setTimeout(resolve, 3000));
            const response = await api.post('/auth/login', {email: email, password: password});
            if (!response.accessToken) {
                ToastNotification.apiGenericError();
                return;
            }
            
            localStorage.setItem('auth_token', response.accessToken);
            redirectToHomepage();
        } catch (ex) {
            ToastNotification.error('Login failed', ex.message);
        } finally {
            setButtonLoading(submitBtn, false);
        }
    });
}

init();