function $$(query) {
    const result = document.querySelectorAll(query);
    switch (result.length) {
        case 0: return undefined;
        case 1: return result[0];
        default: return result;
    }
}