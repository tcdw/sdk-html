import originalAJAX from './lib/ajax';

let ajax = originalAJAX;

class Pomment {
    constructor({
        server,
        defaultWindow = window,
        defaultURL = '',
        defaultTitle = '',
    }) {
        /** （用户指定的）全局变量对象 */
        this._g = defaultWindow;
        /** （用户指定的）HTML 文档对象 */
        /** 服务器地址 */
        this.server = server;
        /** 默认使用的评论 URL */
        this.defaultURL = defaultURL || (() => {
            const elem = this._g.document.querySelector('link[rel=canonical]');
            if (elem) {
                return elem.href;
            }
            return this._g.document.location.href;
        })();
        /** 默认使用的评论标题 */
        this.defaultTitle = defaultTitle || this._g.document.title;
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
