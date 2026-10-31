import { isAuthenticated, redirectToSignIn } from '../utils/authentication.js';
import Icon from './icon.js';
import Menu from './menu.js';

const header = document.querySelector('header');

/**
 * Builds the profile menu with navigation links.
 * @returns {HTMLDivElement} the menu element.
 */
function createProfileMenu() {
    return Menu({
            variant: 'profile',
            toggleLabel: 'Profile menu',
            toggleIcon: Icon('account_circle'),
            items: [
                { label: 'View Profile', url: 'profile.html' },
                {
                    label: 'Sign Out',
                    onClick: () => {
                        localStorage.removeItem('auth_token');
                        redirectToSignIn();
                }
            }
        ]
    });
}

const logo = document.createElement('a');
logo.className = 'logo';
logo.textContent = 'compile';
logo.href = 'index.html';
logo.ariaLabel = 'Compile home page';
header.append(logo);

if (isAuthenticated()) {
    const profileActions = document.createElement('div');
    profileActions.className = 'profile-actions';
    header.append(profileActions);
    const createPostLink = document.createElement('a');
    createPostLink.className = 'create-post-link';
    createPostLink.href = 'create-post.html';
    createPostLink.setAttribute('aria-label', 'Create post');
    createPostLink.title = 'Create post';
    createPostLink.append(Icon('create'));
    profileActions.append(createPostLink);
    profileActions.append(createProfileMenu());
}
