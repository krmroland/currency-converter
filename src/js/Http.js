/**
 * Covinient wrapper around the fetch api
 */
class Http {
    /**
     * creates an instance of the Http class
     * @param  {String} baseUrl The base url
     */
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    /**
     * makes a get request to the base url given a url
     * @param  {String} url
     * @return {Promise}
     */
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
