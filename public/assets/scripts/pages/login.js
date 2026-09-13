import { isAuthenticated, redirectToHomepage } from '../utils/authentication.js';
import { createTextInput } from '../components/form-group.js';
import { Button, ButtonType, setButtonLoading } from '../components/buttons.js';
import { ToastNotification } from '../components/toast-notification.js';
import { apiClient } from '../api/api-client.js';
import formValidation from '../utils/form-validation.js';

function init() {
    if (isAuthenticated()) {
        redirectToHomepage();
        return;
    }
    
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

    const button = Button('sign in', 'btn primary-btn', 'login-btn', ButtonType.Submit);
    const formRow = document.createElement('div');
    formRow.className = 'form-row';

    const checkboxGroup = document.createElement('label');
    checkboxGroup.className = 'checkbox-group';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'remember-me';

    checkboxGroup.append(checkbox, 'Remember me');
    formRow.append(checkboxGroup);
    
    form.append(formRow, button);

    addForgotPasswordButton();
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

function addForgotPasswordButton() {
    const formRow = document.querySelector('.form-row');
    if (!formRow) return;

    const forgotPasswordButton = Button('Forgot password?', 'link-btn');
    formRow.append(forgotPasswordButton);

    forgotPasswordButton.addEventListener('click', () => {
        const email = document.getElementById('email');
        if (!email.value.trim()) {
            ToastNotification.error('Missing email address', 'Insert your email address to reset your password');
            return;
        }

        ToastNotification.success('Password Reset', 'If the account exists, a reset link has been sent to your email');
    });
}

init();