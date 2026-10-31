import { Button } from './buttons.js';

/**
 * Reusable Menu component with navigation links and/or buttons.
 * @param {toggleLabel} string Value for aria-label (accessibility).
 * @param {toggleIcon} string Icon to be displayed for opening/closing the menu. 
 * @returns {HTMLDivElement} the menu element with menu items that are showns on toggle.
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