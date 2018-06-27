/**
 * Object for modeling an html input form element
 */
class InputField {
    /**
     * creates an instance of the InputField
     * @param  {String} label
     * @param  {String} type
     * @return {InputField}
     */
    constructor(label, type = "input") {
        //cache for the root document
        this.label = label;
        this._$root = null;
        this.type = type;
        this.hasError = false;
        this.createInput();
        this.createLabel();
        this.createErrorField();
    }
    /**
     * creates an input label
     */
    createLabel() {
        this.$label = document.createElement("label");
        this.$label.textContent = this.label;
    }
    /**
     * creates an input element
     */
    createInput() {
        this.$input = document.createElement(this.type);
        this.$input.className = "field-input";
    }
    /**
     * creates an error field
     */
    createErrorField() {
        this.$error = document.createElement("div");
        this.$error.className = "field-error";
        this.$errorValue = document.createTextNode("");
        this.$error.appendChild(this.$errorValue);
    }
    /**
     * sets an error's value
     * @param {String} error
     */

    setError(error) {
        this.$error.classList.add("has-error");
        this.$errorValue.data = error;
        this.hasError = true;
    }
    /**
     * clears the error's value
     */
    clearError() {
        if (this.hasError) {
            this.$error.classList.remove("has-error");
            this.$errorValue.data = "";
            this.hasError = false;
        }
    }
    withLabel(label) {
        this.label = label;
        this.createLabel();
        return this;
    }
    /**
     * gets the root element of the input field
     * @return {HtmlElement}
     */
    getRoot() {
        //if the node is cached, return immediately
        if (this._$root) {
            return this._$root;
        }
        //cache it otherwise
        this._$root = document.createElement("div");
        this._$root.className = "field-wrapper";
        this._$root.appendChild(this.$label);
        this._$root.appendChild(this.$input);
        this._$root.appendChild(this.$error);
        return this._$root;
    }
    /**
     * sets the inputs elements attribute
     * @param  {String} key
     * @param  {String} value
     * @return {InputField}
     */
    inputAttribute(key, value) {
        this.$input.setAttribute(key, value);
        return this;
    }
    /**
     * gets the input value
     * @return {Number|String}
     */
    value() {
        return this.$input.value;
    }
}

export default InputField;
