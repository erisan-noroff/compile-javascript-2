/**
 * Returns a loading spinner component
 * @returns {HTMLDivElement}
 */
export function LoadingSpinner() {
    const loadingState = document.createElement('div');
    loadingState.className = 'loading-state';
    
    const text = document.createElement('p');
    text.textContent = 'Fetching data...';
    loadingState.append(text);
    
    const spinner = document.createElement('div');
    spinner.className = 'loading-state__spinner';
    loadingState.append(spinner);
    
    return loadingState;
}

export function loadingTimeout() {
    return new Promise(resolve => setTimeout(resolve, 2000));
}

export function removeLoadingSpinner() {
    document.querySelector('.loading-state')?.remove();
}