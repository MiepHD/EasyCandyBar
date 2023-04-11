/**
 * Shortcut for querySelectorAll.
 * Note: Returns no array if there's only one
 * @returns NodeListOf<Element> | undefined | Element
 */
function $n(query: string): any {
    return document.querySelectorAll(query);
}
function $$(query: string): any {
    return document.querySelector(query);
}