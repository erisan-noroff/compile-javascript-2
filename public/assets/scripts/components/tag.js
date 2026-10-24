import { Button } from './buttons.js';
import Icon from './Icon.js';

export default function Tag(tag) {
    const tagElement = document.createElement('span');
    tagElement.className = 'post-form__tag';
    tagElement.dataset.tag = tag;
    tagElement.textContent = tag;
    
    const close = Button('', 'post-form__tag-icon');
    close.ariaLabel = `Remove tag ${tag}`;
    const icon = Icon('close');
    close.append(icon);
    tagElement.append(close);
    
    return tagElement;
}