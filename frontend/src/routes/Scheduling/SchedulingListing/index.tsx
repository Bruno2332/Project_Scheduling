import { useEffect, useState } from "react";
import type { SchedulingDTO } from "../../../models/scheduling";
import editIcon from '../../../assets/editar.svg';
import removeIcon from '../../../assets/remover.svg';
import * as schedulingService from '../../../services/scheduling-service'
import SearchBar from "../../../components/SearchBar";
import { useNavigate } from "react-router-dom";
import DialogInfo from "../../../components/DialogInfo";
import DialogConfirmation from "../../../components/DialogConfirmation";
import ButtonInverse from "../../../components/ButtonInverse";


type QueryParams = {
    page: number;
    minDate: string;
    maxDate: string;
}

export default function SchedulingListing() {

    const navigate = useNavigate();

    const [dialogInfoData, setDialogInfoData] = useState({
        visible: false,
        message: "Operação com sucesso"
    })

    const [dialogConfirmationData, setDialogConfirmationData] = useState({
        visible: false,
        id: 0,
        message: "Tem certeza?"
    })

    const [isLastPage, setIsLastPage] = useState(false);

    const [schedulings, setSchedulings] = useState<SchedulingDTO[]>([]);

    const [queryParams, setQueryParams] = useState<QueryParams>({
        page: 0,
        minDate: "",
        maxDate: ""
    });

    function handleSearch(min: string, max: string) {
        setSchedulings([]);
        setQueryParams({
            ...queryParams,
            page: 0,
            minDate: min ? min + "T00:00:00Z" : "",
            maxDate: max ? max + "T23:59:59Z" : ""
        });
    }

    function handleNextPageClick() {
        setQueryParams({ ...queryParams, page: queryParams.page + 1 })
    }

    function handleDialogInfoClose() {
        setDialogInfoData({ ...dialogInfoData, visible: false })
    }

    function handleUpdateClick(id: number) {
        navigate(`/${id}`);
        window.scrollTo(0, 0);
    }

    function handleDeleteClick(id: number) {
        setDialogConfirmationData({ ...dialogConfirmationData, id: id, visible: true })
    }

    function handleDialogConfirmationAnswer(answer: boolean, id: number) {
        if (answer) {
            schedulingService.deleteById(id)
                .then(() => {
                    setSchedulings([]);
                    setQueryParams({ ...queryParams, page: 0 })
                })
                .catch(error => {
                    setDialogInfoData({
                        visible: true,
                        message: error.response.data.error
                    })
                });
        }
        setDialogConfirmationData({ ...dialogConfirmationData, visible: false })
    }

    useEffect(() => {
        schedulingService.findPageRequest(queryParams.page, queryParams.minDate, queryParams.maxDate)
            .then(response => {
                const nextPage = response.data.content;
                setSchedulings(schedulings.concat(nextPage));
                setIsLastPage(response.data.last);
            })
    }, [queryParams])

    return (
        <main>
            <section>
                <div className='search-bar-container'>

                    <SearchBar placeholder='Data inicial' onSearch={handleSearch} />

                </div>
                <table className="table mt20">
                    <thead>
                        <tr>
                            <th>Data do Atendimento</th>
                            <th>Paciente</th>
                            <th>Profissional</th>
                            <th>Especialidade</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            schedulings.map((item => (
                                <tr key={item.id}>
                                    <td>{item.momentScheduling ? (
                                        <>
                                            {/* Pega a Data: DD/MM/AAAA */}
                                            {new Date(item.momentScheduling).toLocaleDateString('pt-BR')}
                                            <br />
                                            {/* Pega a Hora: HH:mm (os primeiros 5 caracteres do tempo local) */}
                                            {new Date(item.momentScheduling).toLocaleTimeString('pt-BR').substring(0, 5)}
                                        </>
                                    ) : (
                                        '-'
                                    )}</td>
                                    <td>{item.patient?.name}</td>
                                    <td>{item.professional?.name}</td>
                                    <td>{item.professional?.speciality}</td>
                                    <td>

                                        <img onClick={() => handleUpdateClick(item.id)} className='listing-icon' src={editIcon} alt="Editar" />
                                    </td>
                                    <td>
                                        <img onClick={() => handleDeleteClick(item.id)} className='listing-icon' src={removeIcon} alt="Remover" />

                                    </td>
                                </tr>
                            )))}
                    </tbody>
                </table>
                <div className="btn-load-more-contaienr">
                    {
                        !isLastPage &&
                        <ButtonInverse text="Carregar mais" click={handleNextPageClick} />
                    }
                </div>

                {
                    dialogInfoData.visible &&
                    <DialogInfo
                        message={dialogInfoData.message}
                        onDialogClose={handleDialogInfoClose}
                    />
                }
                {
                    dialogConfirmationData.visible &&
                    <DialogConfirmation
                        id={dialogConfirmationData.id}
                        message={dialogConfirmationData.message}
                        onDialogAnswer={handleDialogConfirmationAnswer}
                    />
                }
            </section>
        </main>
    );
}