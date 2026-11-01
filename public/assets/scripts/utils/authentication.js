/** Returns the authentication token for the signed in user from local or session storage. */
export function getStoredToken() {
    return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
}

/** Returns the signed in username from local or session storage. */
export function getStoredName() {
    return localStorage.getItem('name') || sessionStorage.getItem('name');
}

/**
 * Checks whether the user is currently authenticated.
 * @returns {boolean} True if a valid auth token exists in local or session storage.
 */
export function isAuthenticated() {
    const token = getStoredToken();
    return !!token;
}

/** Redirects the user to the registration page. Called on every page's init() function. */
export function redirectToSignUp() {
    window.location.replace('register.html');
}

/** Redirects the user to the sign in page. Called on sign out */
export function redirectToSignIn() {
    window.location.replace('login.html');
}

/** Redirects the user to the home page. Called on successful log in or if the user is already logged in and tries to access log in page. */
export function redirectToHomepage() {
    window.location.replace('index.html');
}

/** Checks whether the current username matches the signed in user */
export function isCurrentUser(name) {
    return name === getStoredName();
}