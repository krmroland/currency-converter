import InputField from "./InputField";
import SelectField from "./SelectField";
import Converter from "./Converter";

class MainApp {
    constructor() {
        this.Converter = new Converter();
        this.currencyInputs = {};
        this.setCurrencyInputs()
            .setResult()
            .setAmount()
            .setButton();
        this.updateCurrencies();
    }

    setCurrencyInputs() {
        this.currencyInputs["fromCurrency"] = new SelectField("From");

        this.currencyInputs["toCurrency"] = new SelectField("To");

        return this;
    }
    setAmount() {
        this.amount = new InputField("Amount").inputAttribute(
            "placeholder",
            "Enter amount"
        );
        return this;
    }
    setResult() {
        this.$result = document.createElement("div");
        this.$resultValue = document.createTextNode("No Results");
        this.$result.appendChild(this.$resultValue);
        return this;
    }
    setButton() {
        this.$button = document.createElement("button");
        this.$button.className = "button";
        this.$button.appendChild(document.createTextNode("Convert"));
        this.$button.addEventListener("click", this.convert.bind(this));

        return this;
    }
    hasMissingValue() {
        return (
            Object.values(this.currencyInputs).filter(input =>
                this.validateRequired(input)
            ).length && this.validateRequired(this.amount)
        );
    }
    validateRequired($field) {
        if ($field.value()) {
            //clear any previously set errors
            $field.clearError();

            return false;
        }

        $field.setError(`field ${$field.label} is required !`);

        return true;
    }
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
    convert(event) {
        event.preventDefault();

        if (this.hasMissingValue() || this.amountIsInvalid()) {
            return;
        }
        const { toCurrency, fromCurrency } = this.currencyInputs;
        this.Converter.convert(
            this.amount.value(),
            fromCurrency.value(),
            toCurrency.value()
        ).then(result => this.updateResult(result));
    }
    updateResult({ value, to }) {
        this.$resultValue.data = `${to} ${value}`;
    }

    updateCurrencies() {
        this.Converter.getCountries().then(this.updateSelectOptions.bind(this));
    }
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

    iterateCurrencyInputs(callback) {
        Object.values(this.currencyInputs).forEach(curerncyInput => {
            callback(curerncyInput);
        });
    }
}

export default MainApp;
