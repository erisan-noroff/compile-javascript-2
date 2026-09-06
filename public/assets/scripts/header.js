/**
 * Renders the specified icon from Material Icons
 * @param iconClass - The Material Icons ligature name, e.g. 'account_circle'.
 * @returns {HTMLSpanElement} the icon element.
 */
function renderIcon(iconClass) {
    const icon = document.createElement('span');
    icon.className = 'material-icons';
    icon.textContent = iconClass;

    return icon;
}

/**
 * Builds the list items for the profile menu dropdown.
 * @returns {HTMLLIElement[]} the list items, in display order.
 */
function navigationLinks() {
    const profileItem = document.createElement('li');
    const profileLink = document.createElement('a');
    profileLink.className = 'profile-menu__item';
    profileLink.href = '#';
    profileLink.textContent = 'View Profile';
    profileItem.append(profileLink);

    const signOutItem = document.createElement('li');
    const signOutLink = document.createElement('a');
    signOutLink.className = 'profile-menu__item';
    signOutLink.href = '#';
    signOutLink.textContent = 'Sign Out';
    signOutItem.append(signOutLink);

    return [profileItem, signOutItem];
}

const header = document.querySelector('header');
const container = document.createElement('div');
container.className = 'container';
header.append(container);

/**
 * Builds the profile menu. Menu closes on the chevron, outside click or on Escape key.
 * @returns {HTMLDivElement} the menu element.
 */
function createProfileMenu() {
    const profileMenu = document.createElement('div');
    profileMenu.className = 'profile-menu';

    const toggle = document.createElement('button');
    toggle.className = 'profile-menu__toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Profile menu');

    const expandIcon = renderIcon('expand_more');
    toggle.append(renderIcon('account_circle'), expandIcon);

    const menuItems = document.createElement('ul');
    menuItems.className = 'profile-menu__items';
    menuItems.hidden = true;
    menuItems.append(...navigationLinks());

    profileMenu.append(toggle, menuItems);

    function setMenuOpen(isOpen) {
        profileMenu.classList.toggle('is-open', isOpen);
        menuItems.hidden = !isOpen;
        toggle.setAttribute('aria-expanded', isOpen.toString());
        expandIcon.textContent = isOpen ? 'expand_less' : 'expand_more';
    }

    toggle.addEventListener('click', () => {
        setMenuOpen(menuItems.hidden);
    });

    document.addEventListener('click', (event) => {
        if (!profileMenu.contains(event.target)) {
            setMenuOpen(false);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            setMenuOpen(false);
        }
    });

    return profileMenu;
}

// Placeholder. To be replaced by authentication implementation.
const userIsLoggedIn = true;

const logo = document.createElement('p');
logo.className = 'logo';
logo.textContent = 'compile';
container.append(logo);

if (userIsLoggedIn)
    container.append(createProfileMenu());
