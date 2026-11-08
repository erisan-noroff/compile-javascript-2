import { isAuthenticated, redirectToHomepage } from '../utils/authentication.js';
import { TextInput } from '../components/text-inputs.js';
import { Button, ButtonType, setButtonLoading } from '../components/buttons.js';
import { ToastNotification } from '../components/toast-notification.js';
import { apiClient } from '../api/api-client.js';
import validateForm from '../utils/validate-form.js';
import { showPendingToast } from '../utils/pending-toast.js';
import { loadingTimeout } from '../components/loading-spinner.js';

function init() {
    if (isAuthenticated()) {
        redirectToHomepage();
        return;
    }

    showPendingToast();
    
    const form = document.querySelector('form.stack');
    const formFields = [
        {
            id: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'john.doe@stud.noroff.no',
            required: true,
            autocomplete: 'email'
        },
        {
            id: 'password',
            label: 'Password',
            placeholder: 'Enter your password',
            type: 'password',
            required: true,
            autocomplete: 'current-password'
        }
    ];

    form.append(...formFields.map(TextInput));

    const button = Button('sign in', 'button button--primary', 'login-button', ButtonType.Submit);
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
        const isValid = validateForm(e);
        if (!isValid) return;
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMeIsChecked = document.getElementById('remember-me').checked;

        const submitButton = form.querySelector('#login-button');
        setButtonLoading(submitButton, true);

        const api = apiClient();

        try {
            await loadingTimeout();
            const response = await api.post('/auth/login', {email: email, password: password});
            if (!response.data?.accessToken || !response.data?.name) {
                ToastNotification.apiGenericError();
                return;
            }
            
            if (rememberMeIsChecked) {
                localStorage.setItem('auth_token', response.data.accessToken);
                localStorage.setItem('name', response.data.name);
            } else {
                sessionStorage.setItem('auth_token', response.data.accessToken);
                sessionStorage.setItem('name', response.data.name);
            }
            
            redirectToHomepage();
        } catch (ex) {
            ToastNotification.error('Login failed', ex.message);
        } finally {
            setButtonLoading(submitButton, false);
        }
    });
}

function addForgotPasswordButton() {
    const formRow = document.querySelector('.form-row');
    if (!formRow) return;

    const forgotPasswordButton = Button('Forgot password?', 'link-button');
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