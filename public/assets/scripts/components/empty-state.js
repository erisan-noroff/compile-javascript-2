export default function EmptyState(message) {
    const emptyFeed = document.createElement('p');
    emptyFeed.className = 'empty-state';
    emptyFeed.textContent = message;
    return emptyFeed;
}