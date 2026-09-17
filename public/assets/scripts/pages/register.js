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

    const form = document.querySelector('form.stack');
    const FormFields = [
        {
            id: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'john.doe@stud.noroff.no',
            required: true,
            autocomplete: 'email'
        },
        {
            id: 'username', label: 'Username', placeholder: 'CompileRuleZ', required: true, autocomplete: 'username'
        },
        {
            id: 'password',
            label: 'Password',
            placeholder: 'Enter your password',
            type: 'password',
            required: true,
            autocomplete: 'new-password'
        },
        {
            id: 'confirm-password',
            label: 'Confirm Password',
            placeholder: 'Re-enter your password',
            type: 'password',
            required: true,
            autocomplete: 'new-password'
        },
        {
            id: 'avatar',
            label: 'Profile Image URL (optional)',
            placeholder: 'https://image.example.com/image.png',
            type: 'text'
        },
        {
            id: 'banner',
            label: 'Profile Banner URL (optional)',
            placeholder: 'https://image.example.com/image.png',
            type: 'text'
        }
    ];

    form.append(...FormFields.map(createTextInput));

    const button = Button('register account', 'btn primary-btn', 'register-btn', ButtonType.Submit);
    form.append(button);

    addSubmitEventListener();
}

// Redirect user to login.html and display a success Toast Notification
function signUpSuccessful() {
    sessionStorage.setItem('showSignUpSuccess', 'true');
    location.replace(new URL('login.html', location.href));
}

function addSubmitEventListener() {
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', async(e) => {
        const isValid = formValidation(e);
         if (!isValid) return;

        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const avatar = document.getElementById('avatar').value;
        const banner = document.getElementById('banner').value;

        const submitBtn = form.querySelector('#register-btn');
        setButtonLoading(submitBtn, true);

        const api = apiClient();

        try {
            await new Promise(resolve => setTimeout(resolve, 3000));
            const body = {name: username, email: email, password: password};
            if (avatar) body.avatar = { url: avatar, alt: ''};
            if (banner) body.banner = { url: banner, alt: ''};
            await api.post('/auth/register', body);
            signUpSuccessful();
        } catch (ex) {
            ToastNotification.error('Registration failed', ex.message);
        } finally {
            setButtonLoading(submitBtn, false);
        }
    });
}

init();