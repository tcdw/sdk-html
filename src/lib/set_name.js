function setName(object, name) {
    try {
        // eslint-disable-next-line no-param-reassign
        object[Symbol.toStringTag] = name;
    } catch (e) {
        if (process.env.NODE_ENV !== 'production') {
            console.warn('This environment does not support Symbol.toStringTag. Ignored.');
        }
    }
    return name;
}

export default setName;
