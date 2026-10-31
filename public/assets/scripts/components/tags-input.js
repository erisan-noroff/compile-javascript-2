import Tag from './tag.js';

export function TagsInput(initialTags = []) {
    const formGroupElement = document.createElement('div');
    formGroupElement.className = 'form-group';

    const labelElement = document.createElement('label');
    labelElement.htmlFor = 'tags';
    labelElement.textContent = 'Tags (optional)';

    const helperText = document.createElement('p');
    helperText.className = 'post-form__tag-helper';
    helperText.id = 'tags-helper';
    helperText.textContent = 'Separated by space';

    const tagsElement = document.createElement('div');
    tagsElement.className = 'post-form__tags';

    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.id = 'tags';
    inputElement.className = 'post-form__tags-field';
    inputElement.setAttribute('aria-describedby', 'tags-helper');
    const placeholderValue = 'typescript css react';
    tagsElement.append(inputElement);
    
    for (let i = 0; i < initialTags.length; i++)
        addTag(initialTags[i]);
    
    inputElement.placeholder = initialTags.length ? '' : placeholderValue;
    formGroupElement.append(labelElement, helperText, tagsElement);

    tagsElement.addEventListener('click', (e) => {
        const button = e.target.closest('.post-form__tag-icon');
        if (!button)
            return;

        button.closest('.post-form__tag').remove();
        updatePlaceholder();
    });

    function updatePlaceholder() {
        inputElement.placeholder = getTags().length ? '' : placeholderValue;
    }

    function addTag(value) {
        const tag = value.trim().toLowerCase();
        if (!tag || getTags().includes(tag)) return;

        inputElement.before(Tag(tag));
        updatePlaceholder();
    }

    inputElement.addEventListener('keydown', (e) => {
        if (e.key === ' ') {
            e.preventDefault();
            addTag(inputElement.value);
            inputElement.value = '';
            return;
        }

        if (e.key === 'Backspace' && inputElement.value === '') {
            e.preventDefault();
            const lastTag = inputElement.previousElementSibling;
            if (!lastTag)
                return;

            lastTag.remove();
            inputElement.value = lastTag.dataset.tag;
            updatePlaceholder();
        }
    });

    return formGroupElement;
}

export function getTags() {
    return Array.from(
        document.querySelectorAll('.post-form__tag'),
        (tagElement) => tagElement.dataset.tag
    );
}