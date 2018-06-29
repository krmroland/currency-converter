import Http from "./Http";

class Converter {
    /**
     * creates an instance of the converter
     */
    constructor() {
        this.http = new Http("https://free.currencyconverterapi.com/api/v5/");
    }
    /**
     * gets all the available currencies
     * @return {Promise}
     */
    getCurrencies() {
        return this.http.get("currencies");
    }
    /**
     * converts a given amount from one currency to another
     * @param  {String} from
     * @param  {String} to
     * @return {Promise}
     */
    convert(from, to) {
        const key = from + "_" + to;
        return new Promise((resolve, reject) => {
            return this.http
                .get(`convert?q=${key}&compact=ultra`)
                .then(result =>
                    resolve({
                        from,
                        to,
                        rate: result[key]
                    })
                )
                .catch(error => reject(error));
        });
    }
}
export default Converter;
