import originalAJAX from './lib/ajax';

let ajax = originalAJAX;

class Pomment {
    constructor({
        server,
        defaultGlobal = window,
        defaultDocument = document,
        defaultURL = '',
        defaultTitle = '',
    }) {
        /** （用户指定的）全局变量对象 */
        this._g = defaultGlobal;
        /** （用户指定的）HTML 文档对象 */
        this._d = defaultDocument;
        /** 服务器地址 */
        this.server = server;
        /** 默认使用的评论 URL */
        this.defaultURL = defaultURL || this._d.querySelector('link[rel=canonical]');
        /** 默认使用的评论标题 */
        this.defaultTitle = defaultTitle;
    }

    async listComments({
        url = this.defaultTitle,
    }) {
        const result = await ajax({
            url: `${this.server}/v2/list`,
            data: {
                url,
            },
        });
        return JSON.parse(result);
    }

    static setAJAXHandler(func) {
        if (process.env.NODE_ENV === 'production') {
            throw new Error('This function is not avaliable in production build');
        }
        ajax = func;
        return ajax;
    }
}

if (process.env.NODE_ENV !== 'production') {
    console.warn('[Pomment]', 'You are running the development build of Pomment SDK! '
    + 'Please switch to the production build before use in production.');
}

export default Pomment;
