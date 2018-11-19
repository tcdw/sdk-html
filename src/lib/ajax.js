const ajax = ({
    url,
    data = null,
}) => new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
            resolve(request.responseText);
        } else {
            reject(new Error('An error occurred on the server-side'));
        }
    };
    request.onerror = () => {
        reject(new ReferenceError('An error occurred when connect to the server'));
    };
    if (data) {
        request.setRequestHeader('content-type', 'application/json');
        request.send(JSON.stringify(data));
    } else {
        request.send();
    }
});

export default ajax;
