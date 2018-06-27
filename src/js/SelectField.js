import InputField from "./InputField";

class SelectField extends InputField {
    constructor(label) {
        super(label, "select");
        //add a default  option
        this.$input.add(this.createOption("--select--"));
    }
    createOption(text, value = "") {
        const option = document.createElement("option");
        option.text = text;
        option.value = value;
        return option;
    }
}

export default SelectField;
