import './styles.css'
import { useState } from "react";
import ButtonInverse from '../ButtonInverse';



type Props = {
    onSearch: Function;
    placeholder: string;
}

export default function SearchBar({ onSearch }: Props) {

    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");

    function handleSubmit(event: any) {
        if (event && event.preventDefault) {
            event.preventDefault();
        }

        onSearch(minDate, maxDate);
    }

    function handleResetClick() {
        setMinDate("");
        setMaxDate("");
        onSearch("", ""); // Limpa a busca no pai
    }

    return (
        <div className='container-total'>
            <form className="search-bar" onSubmit={handleSubmit}>
                <p>Data Inicial</p>
                <input
                    value={minDate}
                    type="date"
                    onChange={(e) => setMinDate(e.target.value)}
                />
                <p>Data Final</p>
                <input
                    value={maxDate}
                    type="date"
                    onChange={(e) => setMaxDate(e.target.value)}
                />
            </form>
            <div className='search-container-tbn'>
                <ButtonInverse text="Buscar" click={(e: any) => handleSubmit(e)} />
                <ButtonInverse text="Limpar" click={handleResetClick} />
            </div>
        </div>
    )
}