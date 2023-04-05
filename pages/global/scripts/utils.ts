/**
 * Shortcut for querySelectorAll.
 * Note: Returns no array if there's only one
 * @returns NodeListOf<Element> | undefined | Element
 */
function $$(query: string): any {
    const result = document.querySelectorAll(query);
    switch (result.length) {
        case 0: return undefined;
        case 1: return result[0];
        default: return result;
    }
}