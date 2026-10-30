import { formatDateTime } from '../utils/format-date-time.js';

export default function PostCard(post, singlePostView = false, comments = false) {
    const card = document.createElement(singlePostView ? 'article' : 'li');
    card.classList.add('card', 'post-card');

    if (post?.media) {
        const banner = document.createElement('img');
        card.append(banner);
        banner.className = 'post-card__banner';
        banner.src = post.media.url;
        banner.alt = post.media.alt;
    }

    const byline = Byline(post);
    card.append(byline);

    const content = document.createElement('div');
    card.append(content);
    content.className = 'post-card__content';

    const title = document.createElement(singlePostView ? 'h1' : 'h2');
    content.append(title);
    title.className = 'post-card__title';

    if (singlePostView) {
        title.textContent = post.title;
    } else {
        const link = document.createElement('a');
        title.append(link);
        link.className = 'post-card__link';
        link.href = `post.html?id=${post.id}`;
        link.textContent = post.title;
    }

    const body = document.createElement('p');
    content.append(body);
    body.textContent = post.body;
    body.classList.add('post-card__body');
    if (!singlePostView)
        body.classList.add('post-card__body--clamped');

    const footer = document.createElement('div');
    content.append(footer);
    footer.className = 'post-card__footer';

    if (post.tags.length > 0) {
        const tags = document.createElement('div');
        footer.append(tags);
        tags.className = 'post-card__tags';

        for (let i = 0; i < post.tags.length; i++) {
            const tagElement = document.createElement('div');
            tagElement.className = 'post-card__tag';
            tagElement.textContent = post.tags[i];
            tags.append(tagElement);
        }
    }

    const stats = document.createElement('div');
    footer.append(stats);
    stats.className = 'post-card__stats';

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

    if (comments)
        renderComments(card, post.comments);

    return card;
}

/**
 *
 * @param {object} post Post object from the API response.
 * @returns {HTMLDivElement}
 */
function Byline(post) {
    const byline = document.createElement('div');
    byline.className = 'byline';
    const link = document.createElement('a');
    link.className = 'byline__link';
    link.href = `profile.html?name=${post.author.name}`;
    byline.append(link);

    const avatar = document.createElement('img');
    link.append(avatar);
    avatar.className = 'byline__avatar';
    avatar.src = post.author.avatar.url;
    avatar.alt = '';

    const username = document.createElement('span');
    link.append(username);
    username.textContent = post.author.name;

    const createdDate = document.createElement('time');
    byline.append(createdDate);
    createdDate.className = 'byline__date';
    createdDate.dateTime = post.created;
    createdDate.textContent = formatDateTime(post.created);

    if (post.updated && post.created !== post.updated) {
        const edited = document.createElement('span');
        edited.className = 'byline__date';
        edited.textContent = ' (edited)';
        createdDate.title = `Last edited ${formatDateTime(post.updated)}`;
        byline.append(edited);
    }

    return byline;
}

function renderComments(card, comments) {
    if (!comments?.length)
        return;

    const commentSection = document.createElement('div');
    card.append(commentSection);
    commentSection.className = 'comments';

    const h2 = document.createElement('h2');
    h2.textContent = 'Comments';
    commentSection.append(h2);
    for (let i = 0; i < comments.length; i++) {
        const comment = document.createElement('div');
        comment.className = 'comment';

        const byline = Byline(comments[i]);
        comment.append(byline);

        const body = document.createElement('div');
        body.className = 'comment__body';
        body.textContent = comments[i].body;
        comment.append(body);

        commentSection.append(comment);
    }
}