const oldConsoleLog = console.log;
console.log = (message) => {
    const error = new Error();
    const stack = error.stack.split('\n');
    const lastFunction = stack[2].trim().split(' ')[1];
    oldConsoleLog(`${lastFunction}: ${message}`);
}
function $$(query) {
    const result = document.querySelectorAll(query);
    switch (result.length) {
        case 0: return undefined;
        case 1: return result[0];
        default: return result;
    }
}