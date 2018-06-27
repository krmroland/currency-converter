class Http {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    get(url) {
        return this.fetch(url);
    }
    fetch(url, method = "get") {
        url = this.baseUrl + url;
        return new Promise((resolve, reject) => {
            return fetch(url, { method })
                .then(response => {
                    return response
                        .json()
                        .then(data => resolve(data))
                        .catch(error => reject(url));
                })
                .catch(error => reject(error));
        });
    }
}

export default Http;
