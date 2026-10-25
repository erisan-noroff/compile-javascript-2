/**
 * Creates a form group with text input and corresponding label
 * @param {object} input
 * @param {string} input.id
 * @param {string} input.label
 * @param {string} input.placeholder
 * @param {boolean} [input.required]
 * @param {AutoFill} [input.autocomplete] - https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete
 * @param {string} [input.value]
 * @returns {HTMLDivElement} the form group div element.
 */
export function TextInput({ id, label, placeholder = '', type = 'text', required = false, autocomplete = 'off', value}) {
    const formGroupElement = document.createElement('div');
    formGroupElement.className = 'form-group';
    
    const labelElement = document.createElement('label');
    labelElement.htmlFor = id;
    labelElement.textContent = label;
    
    const inputElement = document.createElement('input');
    inputElement.type = type;
    inputElement.id = id;
    inputElement.placeholder = placeholder;
    inputElement.required = required;
    inputElement.autocomplete = autocomplete;
    inputElement.value = value;
    inputElement.className = 'text-input';
    
    formGroupElement.append(labelElement, inputElement);
    
    return formGroupElement;
}

/**
 * Creates a form group with textarea input and corresponding label
 * @param {object} input
 * @param {string} input.id
 * @param {string} input.label
 * @param {string} input.placeholder
 * @param {number|null} input.maxLength
 * @param {boolean} [input.required]
 * @param {string} [input.value]
 * @returns {HTMLDivElement} the form group div element.
 */
export function TextArea({ id, label, placeholder = '', maxLength = null, required = false, value}) {
    const formGroupElement = document.createElement('div');
    formGroupElement.className = 'form-group';

    const labelElement = document.createElement('label');
    labelElement.htmlFor = id;
    labelElement.textContent = label;

    const textAreaElement = document.createElement('textarea');
    textAreaElement.id = id;
    textAreaElement.placeholder = placeholder;
    textAreaElement.required = required;
    textAreaElement.value = value;
    textAreaElement.classList.add('text-input', 'textarea-input');
    if (maxLength)
        textAreaElement.maxLength = maxLength;

    formGroupElement.append(labelElement, textAreaElement);

    return formGroupElement;
}