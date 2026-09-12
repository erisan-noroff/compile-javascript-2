/**
 * Button type enum for form buttons
 */
export const ButtonType = {
    Button: 'button',
    Submit: 'submit'
}

/**
 * Button
 * @param {string} text - Button text to display
 * @param {string} [className=''] - Class name(s) to be added
 * @param {string} [id=''] - ID prefix for button
 * @param {('button'|'submit'|'reset')} [type=ButtonType.Button] - Button type (button, submit)
 * @returns {HTMLButtonElement} - HTML button element
 */
export function Button(text, className = '', id='', type = ButtonType.Button) {
    const button = document.createElement('button');
    button.type = type;
    if (className) button.className = className;
    if (id) button.id = id;
    button.textContent = text;
    return button;
}