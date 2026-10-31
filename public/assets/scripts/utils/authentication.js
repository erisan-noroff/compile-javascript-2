/**
 * Checks whether the user is currently authenticated.
 * @returns {boolean} True if a valid auth token exists in localStorage.
 */
export function isAuthenticated() {
    const token = localStorage.getItem('auth_token');
    return !!token;
}

/**
 * Redirects the user to the registration page. Called on every page's init() function.
 */
export function redirectToSignUp() {
    window.location.replace('register.html');
}

/**
 * Redirects the user to the sign in page. Called on sign out.
 */
export function redirectToSignIn() {
    window.location.replace('login.html');
}

/**
 * Redirects the user to the home page. Called on successful log in or if the user is already logged in and tries to access log in page.
 */
export function redirectToHomepage() {
    window.location.replace('index.html');
}

/**
 * Checks whether the current username matches the signed in user
 */
export function isCurrentUser(name) {
    return name === localStorage.getItem('name');
}