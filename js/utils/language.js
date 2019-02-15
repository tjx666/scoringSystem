export const StringUtil = {
    isNumberStr(numberStr) {
        if (!numberStr) return false;
        const type = typeof numberStr;
        if (type !== 'string') throw new TypeError(`The first argument of isNumberStr must be string type! but you pass ${type}!`)
        return /^\d+(\.\d+)?$/.test(numberStr);
    }
}

// console.log(StringUtil.isNumberStr('22.1'))