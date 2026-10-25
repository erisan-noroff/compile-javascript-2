import { TextArea, TextInput } from './form-group.js';
import { TagsInput } from './tags-input.js';

export default function PostForm(post={}) {
    const form = document.createElement('form');
    form.className = 'stack';
    
    const title = {
        id: 'title',
        label: 'Title',
        placeholder: 'Share what you\'re building',
        required: true,
        value: post.title ?? ''
    };

    const content = {
        id: 'content',
        label: 'Content',
        placeholder: 'We’re eager to hear more about it',
        maxLength: 280,
        required: true,
        value: post.body ?? ''
    };

    const banner = {
        id: 'banner',
        label: 'Banner Image URL (optional)',
        placeholder: 'https://image.example.com/image.png',
        value: post.media?.url ?? ''
    };
    
    form.append(
        TextInput(title),
        TextArea(content),
        TextInput(banner),
        TagsInput()
    );
    
    return form;
}