/**
 * Creates an anchor link to the home page with "Back to the feed" text.
 * @returns {HTMLAnchorElement} Link ready to be appended to the DOM.
 */
export default function BackToFeedLink() {
    const homePageLink = document.createElement('a');
    homePageLink.textContent = 'Back to the feed';
    homePageLink.href = 'index.html';
    
    return homePageLink;
}