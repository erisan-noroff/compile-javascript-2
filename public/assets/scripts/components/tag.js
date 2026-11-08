import { Button } from './buttons.js';
import Icon from './icon.js';

export default function Tag(tag) {
    const tagElement = document.createElement('span');
    tagElement.className = 'post-form__tag';
    tagElement.dataset.tag = tag;
    tagElement.textContent = tag;
    
    const closeButton = Button('', 'post-form__tag-icon');
    closeButton.ariaLabel = `Remove tag ${tag}`;
    const icon = Icon('close');
    closeButton.append(icon);
    tagElement.append(closeButton);
    
    return tagElement;
}