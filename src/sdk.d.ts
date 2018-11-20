interface CommentEntry {
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
    content: CommentEntry[];
}

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
}

export default Pomment;
