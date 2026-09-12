/**
 * Creates a form group with text input and corresponding label
 * @param {object} input
 * @param {string} input.id
 * @param {string} input.label
 * @param {string} input.placeholder
 * @param {AutoFill} input.autocomplete - https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete
 * @returns {HTMLDivElement} the form group div element.
 */
export function createTextInput({ id, label, placeholder = '', type = 'text', autocomplete}) {
    const formGroupElement = document.createElement('div');
    formGroupElement.className = 'form-group';
    
    const labelElement = document.createElement('label');
    labelElement.htmlFor = id;
    labelElement.textContent = label;
    
    const inputElement = document.createElement('input');
    inputElement.type = type;
    inputElement.id = id;
    inputElement.placeholder = placeholder;
    inputElement.autocomplete = autocomplete;
    inputElement.className = 'text-input';
    
    formGroupElement.append(labelElement, inputElement);
    
    return formGroupElement;
}