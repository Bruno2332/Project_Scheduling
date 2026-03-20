import './styles.css'

type Props = {
    text: string;
    click: Function;
}

export default function ButtonInverse({ text, click }: Props) {

    return (
        <div className='psi-container-btn' >
            <button className='psi-base-btn psi-inverse-btn' onClick={() => click()}>
                {text}
            </button>
        </div>

    );
}