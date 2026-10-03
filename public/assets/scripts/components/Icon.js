/**
 * Renders the specified icon from Material Icons
 * @param iconClass - The Material Icons ligature name, e.g. 'account_circle'.
 * @returns {HTMLSpanElement} the icon element.
 */
export default function Icon(iconClass) {
    const icon = document.createElement('span');
    icon.className = 'material-icons';
    icon.textContent = iconClass;

    return icon;
}