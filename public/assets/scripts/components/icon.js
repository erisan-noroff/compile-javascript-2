/**
 * Renders the specified icon from Material Icons
 * @param iconName - The Material Icons ligature name, e.g. 'account_circle'.
 * @returns {HTMLSpanElement} the icon element.
 */
export default function Icon(iconName) {
    const icon = document.createElement('span');
    icon.className = 'material-icons';
    icon.textContent = iconName;
    icon.setAttribute('aria-hidden', 'true');

    return icon;
}