import ButtonInverse from "../ButtonInverse";


type Props = {
    id: number;
    message: string;
    onDialogAnswer: Function;
}

export default function DialogConfirmation({ id, message, onDialogAnswer }: Props) {

    return (
        <div className="dialog-background" onClick={() => onDialogAnswer(false, id)}>
            <div className="dialog-box" onClick={(event) => event.stopPropagation()}>
                <h2>{message}</h2>
                <div className="dialog-btn-container">
                    <div>
                        <ButtonInverse text='Sim' click={() => onDialogAnswer(true, id)} />
                    </div>
                    <div>
                        <ButtonInverse text="Não" click={() => onDialogAnswer(false, id)}/>
                    </div>
                </div>
            </div>
        </div>
    );
}