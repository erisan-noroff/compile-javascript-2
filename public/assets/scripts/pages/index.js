import { isAuthenticated, redirectToSignUp } from '../utils/authentication.js';
import { apiClient } from '../api/api-client.js';
import { ToastNotification } from '../components/toast-notification.js';
import { formatDateTime } from '../utils/format-date-time.js';

async function init() {
    if (!isAuthenticated()) {
        redirectToSignUp();
        return;
    }
    
    try {
        const posts = await getPosts();
        console.log(posts[0]);
        for (let i = 0; i < posts.length; i++)
            renderPostCard(posts[i]);
    } catch (ex) {
        ToastNotification.error('Loading posts failed', ex.message);
    }
}

async function getPosts(page = 1) {
    const api = apiClient();
    const params = new URLSearchParams({ _author: 'true', limit: '25', page: page.toString() });
    return await api.get(`/social/posts?${params}`);
}

function renderPostCard(post) {
    const feed = document.querySelector('.feed');
    const card = document.createElement('div');
    card.classList.add('card', 'card--post');
    feed.append(card);
    
    if (post?.media) {
        const banner = document.createElement('img');
        card.append(banner);
        banner.className = 'card__media';
        banner.src = post.media.url;
        banner.alt = post.media.alt;
    }
    
    const byline = document.createElement('div');
    card.append(byline);
    byline.className = 'card__byline';
    
    const content = document.createElement('div');
    card.append(content);
    content.className = 'card__content';
    
    const avatar = document.createElement('img');
    byline.append(avatar);
    avatar.className = 'card__avatar';
    avatar.src = post.author.avatar.url;
    
    const username = document.createElement('p');
    byline.append(username);
    username.textContent = post.author.name;
    
    const createdDate = document.createElement('time');
    byline.append(createdDate);
    createdDate.className = 'card__date';
    createdDate.dateTime = post.created;
    createdDate.textContent = formatDateTime(post.created);
    
    const title = document.createElement('h2');
    content.append(title);
    title.textContent = post.title;
    
    const body = document.createElement('p');
    content.append(body);
    body.className = 'card__body';
    body.textContent = post.body;
    
    const footer = document.createElement('div');
    content.append(footer);
    footer.className = 'card__footer';
    
    if (post.tags.length === 0)
        return;
    
    const tags = document.createElement('div');
    footer.append(tags);
    tags.className = 'card__tags';
    
    for (let i = 0; i < post.tags.length; i++) {
        const tagElement = document.createElement('div');
        tagElement.className = 'card__tag';
        tagElement.textContent = post.tags[i];
        tags.append(tagElement);
    }
    
    const stats = document.createElement('div');
    footer.append(stats);
    stats.className = 'card__stats';
    
    if (post._count.comments > 0) {
        const comments = document.createElement('p');
        stats.append(comments);
        comments.textContent = `${post._count.comments} ${post._count.comments === 1 ? 'comment' : 'comments'}`;
    }
    
    if (post._count.reactions > 0) {
        const reactions = document.createElement('p');
        stats.append(reactions);
        reactions.textContent = `${post._count.reactions} ${post._count.reactions === 1 ? 'reaction' : 'reactions'}`;
    }
    
    const reactions = document.createElement('p');
    stats.append(reactions);
}

await init();