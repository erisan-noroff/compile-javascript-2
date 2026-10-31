export function formatDateTime(isoString) {
    if (!isoString)
        return;
    
    return new Date(isoString).toLocaleString('en-GB', {
        day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
}

export function formatShortDate(isoString) {
    if (!isoString)
        return;
    
    return new Date(isoString).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short'
    });
}