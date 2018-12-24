declare const ajax: ({ url, data, }: {
    url: string;
    data?: object;
}) => Promise<string>;

export default ajax;
