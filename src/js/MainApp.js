import InputField from "./InputField";
import SelectField from "./SelectField";
import Converter from "./Converter";

class MainApp {
    /**
     * creates an instance of the MainApp
     * @return {MainApp}
     */
    constructor() {
        this.Converter = new Converter();
        this.currencyInputs = {};
        this.setCurrencyInputs()
            .setResult()
            .setAmount()
            .setButton();
        this.updateCurrencies();
    }
    /**
     * sets the currency inputs
     * @return {MainApp}
     */
    setCurrencyInputs() {
        this.currencyInputs["fromCurrency"] = new SelectField("From");

        this.currencyInputs["toCurrency"] = new SelectField("To");

        return this;
    }
    /**
     * sets the amount
     * @return {MainApp}
     */
    setAmount() {
        this.amount = new InputField("Amount").inputAttribute(
            "placeholder",
            "Enter amount"
        );
        return this;
    }
    /**
     * sets the result
     * @return {MainApp}
     */
    setResult() {
        this.$result = document.createElement("div");
        this.$resultValue = document.createTextNode("No Results");
        this.$result.appendChild(this.$resultValue);
        return this;
    }
    /**
     * sets the button
     * @return {MainApp}
     */
    setButton() {
        this.$button = document.createElement("button");
        this.$button.className = "button";
        this.$button.appendChild(document.createTextNode("Convert"));
        this.$button.addEventListener("click", this.convert.bind(this));

        return this;
    }
    /**
     * determines if the form has any missing value
     * @return {Boolean}
     */
    hasMissingValue() {
        return (
            Object.values(this.currencyInputs).filter(input =>
                this.validateRequired(input)
            ).length || this.validateRequired(this.amount)
        );
    }
    /**
     * validates the value of the input
     * @param  {InputField} $field
     * @return {Boolean}
     */
    validateRequired($field) {
        if ($field.value()) {
            //clear any previously set errors
            $field.clearError();

            return false;
        }

        $field.setError(`field ${$field.label} is required !`);

        return true;
    }
    /**
     * determines if the amount is valid
     * @return { Boolean}
     */
    amountIsInvalid() {
        const number = +this.amount.value();

        if (number) {
            //clear any errors
            this.amount.clearError();
            return false;
        }
        this.amount.setError(
            number === 0 ? "amount must not be 0" : "amount must be numeric"
        );

        return true;
    }
    /**
     * button click event handler for processing the conversion
     * @param  {Event} event
     */
    convert(event) {
        event.preventDefault();

        if (this.hasMissingValue() || this.amountIsInvalid()) {
            return;
        }

        const { toCurrency, fromCurrency } = this.currencyInputs;

        this.updateResult("...converting");
        //disable the button
        this.$button.setAttribute("disabled", true);

        this.Converter.convert(
            this.amount.value(),
            fromCurrency.value(),
            toCurrency.value()
        )
            .then(({ value, to }) => this.updateResult(`${to} ${value}`))
            .catch(error => this.updateResult("something went wrong"))
            .finally(done => this.$button.removeAttribute("disabled", false));
    }
    /**
     * updates the results value
     * @param  {String} value
     */
    updateResult(value) {
        this.$resultValue.data = value;
    }
    /**
     * update the currency values
     */
    updateCurrencies() {
        this.Converter.getCountries().then(this.updateSelectOptions.bind(this));
    }
    /**
     * updates the options for all currency inputs
     * @param  {Object} options.results
     */
    updateSelectOptions({ results }) {
        const fragment = document.createDocumentFragment("div");

        Object.values(results).forEach(country => {
            const option = document.createElement("option");
            option.value = country.currencyId;
            option.text = `${country.name} (${country.currencySymbol})`;
            fragment.appendChild(option);
        });
        //node can't be inserted int two points of the document
        //simultaneously using appendChild,
        this.iterateCurrencyInputs(currency =>
            currency.$input.appendChild(fragment.cloneNode(true))
        );
    }

    /**
     * iterate through all currency inputs by invoking the callback everytime
     * @param  {Function} callback
     */
    iterateCurrencyInputs(callback) {
        Object.values(this.currencyInputs).forEach(curerncyInput => {
            callback(curerncyInput);
        });
    }
}

export default MainApp;
