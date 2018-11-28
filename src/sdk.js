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
        this.defaultURL = defaultURL || (() => {
            const elem = this._d.querySelector('link[rel=canonical]');
            if (elem) {
                return elem.href;
            }
            return this._d.location;
        })();
        /** 默认使用的评论标题 */
        this.defaultTitle = defaultTitle;
        /** 管理员密码的 hash */
        this._password = null;
    }

    async listComments({
        url = this.defaultURL,
    } = {}) {
        const result = JSON.parse(await ajax({
            url: `${this.server}/v2/list`,
            data: {
                url,
            },
        }));
        for (let i = 0; i < result.content.length; i += 1) {
            result.content[i].createdAt = new Date(result.content[i].createdAt);
        }
        return result;
    }

    async submitComment({
        title = this.defaultTitle,
        url = this.defaultURL,
        parent = -1,
        name,
        email,
        website,
        content,
        receiveEmail,
        responseKey = null,
    }) {
        const result = JSON.parse(await ajax({
            url: `${this.server}/v2/submit`,
            data: {
                title,
                url,
                parent,
                name,
                email,
                website,
                content,
                receiveEmail,
                responseKey,
            },
        }));
        result.createdAt = new Date(result.createdAt);
        return result;
    }

    async editComment({
        url = this.defaultURL,
        id,
        editKey,
        content,
    }) {
        await ajax({
            url: `${this.server}/v2/edit`,
            data: {
                url,
                id,
                editKey,
                content,
            },
        });
    }

    async deleteComment({
        url = this.defaultURL,
        id,
        editKey,
    }) {
        await ajax({
            url: `${this.server}/v2/delete`,
            data: {
                url,
                id,
                editKey,
            },
        });
    }

    login(password) {
        if (typeof password !== 'string') {
            throw new TypeError('Password should be string');
        }
        if (!password) {
            this._password = null;
            return;
        }
        this._password = password;
    }

    logout() {
        this._password = null;
    }

    async deleteCommentAdmin({
        url = this.defaultURL,
        id,
    }) {
        await ajax({
            url: `${this.server}/v2/manage/delete`,
            data: {
                url,
                id,
                token: this._password,
            },
        });
    }

    async editCommentAdmin({
        url = this.defaultURL,
        id,
        content,
    }) {
        await ajax({
            url: `${this.server}/v2/manage/edit`,
            data: {
                url,
                id,
                content,
                token: this._password,
            },
        });
    }

    async getThreadsAdmin() {
        const result = await ajax({
            url: `${this.server}/v2/manage/list-thread`,
            data: {
                token: this._password,
            },
        });
        return result;
    }

    async submitCommentAdmin({
        title = this.defaultTitle,
        url = this.defaultURL,
        parent = -1,
        content,
        receiveEmail,
    }) {
        const result = JSON.parse(await ajax({
            url: `${this.server}/v2/manage/submit`,
            data: {
                title,
                url,
                parent,
                content,
                receiveEmail,
                token: this._password,
            },
        }));
        result.createdAt = new Date(result.createdAt);
        return result;
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
