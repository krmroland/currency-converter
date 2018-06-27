import Http from "./Http";

class Converter {
    constructor() {
        currencies: [];
        this.http = new Http("https://free.currencyconverterapi.com/api/v5/");
    }
    getCountries() {
        return this.http.get("countries");
    }
    convert(amount, from, to) {
        const key = from + "_" + to;
        return new Promise((resolve, reject) => {
            return this.http
                .get(`convert?q=${key}&compact=ultra`)
                .then(result =>
                    resolve({
                        from,
                        to,
                        amount,
                        value: result[key] * amount
                    })
                )
                .catch(error => reject(error));
        });
    }
}
export default Converter;
