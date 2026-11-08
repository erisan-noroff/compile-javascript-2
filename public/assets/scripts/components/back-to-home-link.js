/**
 * Creates an anchor link to the home page with "Back to home" text.
 * @returns {HTMLAnchorElement} Link ready to be appended to the DOM.
 */
export default function BackToHomeLink() {
    const homePageLink = document.createElement('a');
    homePageLink.textContent = 'Back to home';
    homePageLink.href = 'index.html';
    
    return homePageLink;
}