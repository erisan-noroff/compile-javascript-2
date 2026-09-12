import { isAuthenticated, redirectToSignUp } from '../utils/authentication.js';

function init() {
    if (!isAuthenticated()) {
        redirectToSignUp();
        return;
    }
}

init();