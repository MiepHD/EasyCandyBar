<<<<<<<< HEAD:pages/global/scripts/utils.ts
function $$(query: string): any {
========
"use strict";
function $$(query) {
>>>>>>>> 92b47c9e83fa44c6b4df44b28c3877e03713252d:pages/global/scripts/utils.js
    const result = document.querySelectorAll(query);
    switch (result.length) {
        case 0: return undefined;
        case 1: return result[0];
        default: return result;
    }
}
