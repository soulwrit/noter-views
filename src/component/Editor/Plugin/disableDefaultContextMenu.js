const returnFalse = function preventContextMenu(e) {
    e.preventDefault();
    return false;
};
export const disableContextMenu = () => {
    document.body.addEventListener('contextmenu', returnFalse, false);
};
export const releaseContextMenu = () => {
    document.body.removeEventListener('contextmenu', returnFalse, false);
};
