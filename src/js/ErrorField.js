class ErrorField {
    constructor() {
        this.isSet = false;
        this.$wrapper = document.createElement("div");
        this.$wrapper.className = "field-error";
        this.$value = document.createTextNode("");
        this.$wrapper.appendChild(this.$value);
    }
    getRoot() {
        return this.$wrapper;
    }
    set(error) {
        this.$wrapper.classList.add("has-error");
        this.$value.data = error;
        this.hasError = true;
    }
    clear() {
        if (this.isSet) {
            this.$wrapper.classList.remove("has-error");
            this.$value.data = "";
            this.isSet = false;
        }
    }
}

export default ErrorField;
