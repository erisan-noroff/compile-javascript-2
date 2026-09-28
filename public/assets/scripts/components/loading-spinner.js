export function loadingSpinner() {
    const main = document.querySelector('main');
    const loadingState = document.createElement('div');
    loadingState.className = 'loading-state';
    main.append(loadingState);
    
    const text = document.createElement('p');
    text.textContent = 'Fetching data...';
    loadingState.append(text);
    
    const spinner = document.createElement('div');
    spinner.className = 'loading-state__spinner';
    loadingState.append(spinner);
}

export function removeLoadingState() {
    document.querySelector('.loading-state')?.remove();
}