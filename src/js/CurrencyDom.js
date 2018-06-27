class CurrencyDom {
    constructor($rootNode, app) {
        this.$rootNode = $rootNode;
        this.app = app;
    }
    render() {
        //create the output

        //don't append repetitively to the  dom since that will increase reflow,
        //(https://developers.google.com/speed/docs/insights/browser-reflow)
        const fragment = document.createDocumentFragment("div");

        // create a row for the currency select boxes

        const $currencies = document.createElement("div");

        $currencies.className = "row";

        this.app.iterateCurrencyInputs(input => {
            $currencies.appendChild(input.getRoot());
        });

        fragment.appendChild($currencies);

        //amount
        const $div = document.createElement("div");
        $div.className = "conversion";
        $div.appendChild(this.app.amount.$input);
        $div.appendChild(this.app.$button);
        fragment.appendChild($div);

        //append error for amount error
        const $amountError = document.createElement("div");
        $amountError.appendChild(this.app.amount.$error);
        $amountError.className = "amount-error";
        fragment.appendChild($amountError);

        //add the result
        this.app.$result.className = "result";

        fragment.appendChild(this.app.$result);

        //append everything to the dom
        this.$rootNode.appendChild(fragment);
    }
}
export default CurrencyDom;
