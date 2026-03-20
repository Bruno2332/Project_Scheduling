import { useState } from "react";

export default function FormSelect(props: any) {
    const {
        label,
        name,
        value,
        validation, 
        message,
        options = [], 
        invalid = "false",
        dirty = "false",
        onTurnDirty,
        onTurnClean,
        ...selectProps
    } = props;

    const [isFocused, setIsFocused] = useState(false);

   
    const isFloating = isFocused || (value && value.toString().length > 0);

    function handleBlur() {
        setIsFocused(false);
        onTurnDirty(name);
    }

    function handleFocus() {
        setIsFocused(true);
        if (onTurnClean) {
            onTurnClean(name);
        }
    }

    return (
        <div className="psi-input-wrapper">
            <label className={`psi-label ${isFloating ? 'floating' : ''}`}>
                {label}
            </label>

            <select
                {...selectProps}
                name={name}
                value={value}
                className="form-controls-input form-select-container"
                onFocus={handleFocus}
                onBlur={handleBlur}
                data-invalid={invalid}
                data-dirty={dirty}
                
            >
                <option value="" disabled hidden></option> 
                {options && options.map((opt: any) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}