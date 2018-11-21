interface Comment {
    id: number;
    name: string;
    emailHashed: string;
    website: string;
    content: string;
    parent: number;
    byAdmin: boolean;
    createdAt: Date;
    edited: boolean;
}

interface CommentResults {
    url: string;
    locked: boolean;
    content: Comment[];
}

interface SubmitResults {
    id: number;
    name: string;
    email: string;
    website: string;
    parent: number;
    content: string;
    editKey: string;
    createdAt: Date;
};

declare class Pomment {
    constructor({ server, defaultGlobal, defaultDocument, defaultURL, defaultTitle, }: {
        server: string;
        defaultGlobal?: Window;
        defaultDocument?: Document;
        defaultURL?: string;
        defaultTitle?: string;
    });

    listComments({ url, }?: {
        url?: string;
    }): Promise<CommentResults>;

    submitComment({ title, url, parent, name, email, website, content, receiveEmail, responseKey, }: {
        title?: string;
        url?: string;
        parent?: number;
        name: string;
        email: string;
        website: string;
        content: string;
        receiveEmail: boolean;
        responseKey?: string;
    }): Promise<SubmitResults>;

    editComment({ url, id, editKey, content, }: {
        url?: string;
        id: number;
        editKey: string;
        content: string;
    }): Promise<void>
}

export default Pomment;
