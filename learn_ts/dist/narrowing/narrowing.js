"use strict";
function padLeft(padding, input) {
    if (typeof padding === 'number')
        return new Array(padding + 1).join(' ') + input;
    return padding + input;
}
const padLeftRes = padLeft(1, '21');
console.log(`padLeftRes `, padLeftRes);
//# sourceMappingURL=narrowing.js.map