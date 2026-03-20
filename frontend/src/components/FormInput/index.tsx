import { useState } from 'react';

export default function FormInput(props: any) {

    const {
        label,
        validation,
        message,
        options,
        invalid = "false",
        dirty = "false",
        onTurnDirty,
        onTurnClean,
        value,
        formatter,
        ...inputProps
    } = props;

    const [isFocused, setIsFocused] = useState(false);
    const isFloating = isFocused || (value && value.toString().length > 0);

    function handleBlur() {
        setIsFocused(false);
        onTurnDirty(props.name);
    }

    function handleFocus() {
        setIsFocused(true);
        if (props.onTurnClean) {
            props.onTurnClean(props.name);
        }
    }

    return (
        <div className="psi-input-wrapper">
            <label className={`psi-label ${isFloating ? 'floating' : ''}`}>
                {label}
            </label>

            <input
                {...inputProps}
                value={value}
                className='form-controls-input'
                onFocus={handleFocus}
                onBlur={handleBlur}
                data-invalid={invalid}
                data-dirty={dirty}
            />
            
        </div>
    );
}