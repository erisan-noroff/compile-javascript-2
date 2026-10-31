import { Button } from './buttons.js';

/**
 * Reusable Menu component with navigation links and/or buttons.
 * @param {string} toggleLabel Value for aria-label (accessibility).
 * @param {string} toggleIcon Icon to be displayed for opening/closing the menu.
 * @param {Object} items Menu Item(s) to be rendered. Use an array when defining multiple menu items.
 * Each passed to {@link MenuItem}.
 * @returns {HTMLDivElement} the menu element with menu items that are shows on toggle.
 */
export default function Menu({toggleLabel, toggleIcon, items}) {
    const menu = document.createElement('div');
    menu.className = 'menu';
    
    const toggleBtn = Button('', `menu__toggle`);
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.setAttribute('aria-label', toggleLabel);
    toggleBtn.append(toggleIcon);
    
    const menuItems = document.createElement('ul');
    menuItems.className = 'menu__items';
    menuItems.hidden = true;
    menuItems.append(...items.map(MenuItem));
    
    menu.append(toggleBtn, menuItems);
    
    function setIsOpen(isOpen) {
        menu.classList.toggle('is-open', isOpen);
        menuItems.hidden = !isOpen;
        toggleBtn.setAttribute('aria-expanded', isOpen.toString());
    }

    toggleBtn.addEventListener('click', () => {
        setIsOpen(menuItems.hidden)
    });
    
    menuItems.addEventListener('click', (event) => {
        if (event.target.closest('.menu__item'))
            setIsOpen(false);
    });
    
    document.addEventListener('click', (event) => {
        if (!menu.contains(event.target))
            setIsOpen(false);
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape')
            setIsOpen(false);
    });
    
    return menu;
}

/**
 * 
 * @param {string} label Text to be displayed
 * @param {string} [url] URL for links. Specifying a URL renders a link instead of a button.
 * @param {string} modifier Modifier styling for class menu__item--<modifier>
 * @param {EventListener} onClick Function to trigger when a user clicks the button.
 * @returns {HTMLLIElement} List menu item with link or button.
 */
export function MenuItem({label, url, modifier, onClick}) {
    const menuItem = document.createElement('li');
    const actionItem = document.createElement(url ? 'a' : 'button');
    actionItem.className = modifier ? `menu__item menu__item--${modifier}` : 'menu__item';
    actionItem.textContent = label;
    if (url) {
        actionItem.href = url;
    } else {
        actionItem.type = 'button';
        actionItem.addEventListener('click', onClick);
    }
    
    menuItem.append(actionItem);
    return menuItem;
}