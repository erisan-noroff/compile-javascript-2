import { isAuthenticated, redirectToHomepage } from '../utils/authentication.js';
import { createTextInput } from '../components/form-group.js';
import { Button, ButtonType } from '../components/buttons.js';

function init() {
    if (isAuthenticated()) {
        redirectToHomepage();
        return;
    }
    
    const form = document.querySelector('form.stack');
    const FormFields = [
        {id: 'email', label: 'email', type: 'email', placeholder: 'john.doe@stud.noroff.no', autocomplete: 'email' },
        { id: 'username', label: 'username', placeholder: 'CompileRuleZ', autocomplete: 'username' },
        { id: 'password', label: 'password', placeholder: 'Enter your password', type: 'password', autocomplete: 'new-password' },
        { id: 'confirm-password', label: 'confirm password', placeholder: 'Re-enter your password', type: 'password', autocomplete: 'new-password' }
    ]
    
    form.append(...FormFields.map(createTextInput));
    
    const button = Button('register account', 'primary-btn', 'register-btn', ButtonType.Submit);
    form.append(button);
}

init();