import { useState } from "react";


export default function FormDateInput(props: any) {
    const { 
        label, 
        onTurnDirty, 
        value,
        invalid = "false", 
        dirty = "false", 
        ...inputProps 
    } = props;

    const [isFocused, setIsFocused] = useState(false);

    // AQUI O PULO DO GATO: Se tem valor ou tá focado, vira datetime-local. 
    // Isso mata o problema do dado que sobe do banco não ser reconhecido.
    const type = (isFocused || (value && value.toString().length > 0)) ? "datetime-local" : "text";

    const isFloating = isFocused || (value && value.toString().length > 0) || type === "datetime-local";

    function handleBlur(e: any) {
        setIsFocused(false);
        onTurnDirty(props.name);
        if (props.onBlur) props.onBlur(e);
    }

    function handleFocus() {
        setIsFocused(true);
    }

    return (
        <div className="psi-input-wrapper">
            <label className={`psi-label ${isFloating ? 'floating' : ''}`}>
                {label}
            </label>
            
            <input 
                {...inputProps}
                value={value}
                type={type} // USA A VARIÁVEL DIRETA, SEM STATE
                className='form-controls-input' 
                onFocus={handleFocus}
                onBlur={handleBlur}
                data-invalid={invalid}
                data-dirty={dirty} 
            />
        </div>
    );
}