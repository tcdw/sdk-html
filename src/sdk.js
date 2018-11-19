import originalAJAX from './lib/ajax';

let ajax = originalAJAX;

class Pomment {
    constructor() {
        this.a = 42;
    }

    static setAJAXHandler(func) {
        if (process.env.NODE_ENV === 'production') {
            throw new Error('This function is not avaliable in production build');
        }
        ajax = func;
        return ajax;
    }
}

export default Pomment;
