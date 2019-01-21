export const updateObject = (oldObject, updatedValues) => {
    return {
        ...oldObject,
        ...updatedValues
    }
}

export const getSafe = (fn, defaultVal) => {
    try {
        return fn();
    } catch (e) {
        return defaultVal
    }
}

export const toTitleCase = (str) => {
    if (str) {
        return str.replace(
            /\b\w+/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        )
    } else {
        return str
    }
}
