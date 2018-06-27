import InputField from "./InputField";
/**
 * represents the SelectHtmlElement
 * @extends {InputField}
 */
class SelectField extends InputField {
    /**
     * creates an instance of the select field
     * @param  {String} label
     * @return {SelectField}
     */
    constructor(label) {
        super(label, "select");
        //add a default  option
        this.$input.add(SelectField.createOption("--select--"));
    }
    /**
     * Creates an option on the select field
     * @param  {String|Number} text
     * @param  {String|number} value
     * @return {Option}
     */
    static createOption(text, value = "") {
        const option = document.createElement("option");
        option.text = text;
        option.value = value;
        return option;
    }
}

export default SelectField;
