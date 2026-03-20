import './styles.css'
import FormDateInput from "../../components/FormDateInput";
import FormSelect from "../../components/FormSelect";
import * as forms from "../../util/forms"
import { useEffect, useState } from 'react';
import ButtonInverse from '../../components/ButtonInverse';
import * as schedulingService from '../../services/scheduling-service'
import * as patientService from '../../services/patient-service'
import * as professionalService from '../../services/professional-service'
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import type { SchedulingInsertDTO } from '../../models/scheduling';
import DialogInfo from '../../components/DialogInfo';



export default function Scheduling() {

    const params = useParams();

    const navigate = useNavigate();

    const [dialogInfoData, setDialogInfoData] = useState({
        visible: false,
        message: ""
    });

    const [formData, setFormData] = useState<any>({
        scheduling_date: {
            value: "",
            id: "scheduling_date",
            name: "scheduling_date",
            type: "date",
            label: "Data do Atendimento"
        },
        professional: {
            value: "",
            id: "professional",
            name: "professional",
            type: "select",
            label: "Profissional",
            options: []
        },
        patient: {
            value: "",
            id: "patient",
            name: "patient",
            type: "select",
            label: "Paciente",
            options: []
        },

    });


    useEffect(() => {
        if (params.id && params.id !== 'create') {
            schedulingService.findById(Number(params.id))
                .then(response => {
                    const date = new Date(response.data.momentScheduling);
                    const offset = date.getTimezoneOffset() * 60000;
                    const formattedDate = new Date(date.getTime() - offset).toISOString().slice(0, 16);

                    const dataToUpdate = {
                        scheduling_date: formattedDate,
                        professional: response.data.professional.id,
                        patient: response.data.patient.id
                    };
                    setFormData(forms.updateAll(formData, dataToUpdate));
                });
        }
    }, [params.id]);


    useEffect(() => {

        professionalService.findAll()
            .then(response => {
                const professionals = response.data.content;

                const selectOptions = professionals.map((p: any) => ({
                    value: p.id,
                    label: `${p.name} - ${p.speciality}`
                }));

                setFormData((prev: any) => ({
                    ...prev,
                    professional: {
                        ...prev.professional,
                        options: selectOptions
                    }
                }));
            })
            .catch(() => console.error("Erro ao carregar profissionais"));
    }, []);

    useEffect(() => {
        patientService.findAll()
            .then(response => {
                const patients = response.data.content;

                const selectOptions = patients.map((p: any) => ({
                    value: p.id,
                    label: p.name
                }));

                setFormData((prev: any) => ({
                    ...prev,
                    patient: {
                        ...prev.patient,
                        options: selectOptions
                    }
                }));
            })
            .catch(() => console.error("Erro ao carregar pacientes"));
    }, []);

    const handleTurnDirty = (name: string) => {
        const newFormData = forms.dirtyAndValidate(formData, name);
        setFormData(newFormData);
    };

    const handleInputChange = (event: any) => {
        const name = event?.target?.name;
        const value = event?.target?.value;

        if (!name) return;

        if (formData[name]) {
            const result = forms.updateAndValidate(formData, name, value);
            setFormData(result);
        }
    };

    function handleDialogInfoClose() {
        setDialogInfoData({ ...dialogInfoData, visible: false })
        window.location.reload();
    }

    function handleSubmit(event: any) {
        event.preventDefault();

        const formDataValidated = forms.dirtyAndValidateAll(formData);
        if (forms.hasAnyInvalid(formDataValidated)) {
            setFormData(formDataValidated);
            return;
        }

        const requestBody: SchedulingInsertDTO = {
            momentScheduling: new Date(formData.scheduling_date.value).toISOString(),
            patientId: Number(formData.patient.value),
            professionalId: Number(formData.professional.value)
        };

        const isEditing = formData.id !== undefined;

        const request = isEditing
            ? schedulingService.updateRequest(requestBody)
            : schedulingService.insertRequest(requestBody);

        request
            .then(() => {
                setFormData({
                    ...formData,
                    id: undefined,
                    scheduling_date: { ...formData.scheduling_date, value: "", dirty: "false" },
                    professional: { ...formData.professional, value: "", dirty: "false" },
                    patient: { ...formData.patient, value: "", dirty: "false" }
                });


                setDialogInfoData({ visible: true, message: "Salvo com sucesso!" });
            })
            .catch(error => {
                const backendErrors = error.response?.data?.errors;
                if (backendErrors) {
                    setFormData(forms.setBackendErrors(formData, backendErrors));
                }
                if (error.response && error.response.status === 409) {
                    setDialogInfoData({
                        visible: true,
                        message: error.response.data.error
                    });
                }
            });
    }



    return (
        <>

            <main>
                <section id="scheduling-section">
                    <form className="psi-form" onSubmit={handleSubmit}>
                        <h1>Agendamento</h1>
                        <div className='form-controls-container psi-card psi-card-secondary mt20'>
                            <FormDateInput
                                {...formData.scheduling_date}
                                onChange={handleInputChange}
                                onTurnDirty={handleTurnDirty}
                            />
                            <FormSelect
                                {...formData.professional}
                                onChange={handleInputChange}
                                onTurnDirty={handleTurnDirty}
                            />
                            <FormSelect
                                {...formData.patient}
                                onChange={handleInputChange}
                                onTurnDirty={handleTurnDirty}
                            />
                            <ButtonInverse click={() => handleSubmit} text='Agendar' />
                        </div>
                    </form>
                </section>
                {
                    dialogInfoData.visible &&
                    <DialogInfo
                        message={dialogInfoData.message}
                        onDialogClose={handleDialogInfoClose}
                    />
                }
            </main >
            <Outlet />
        </>
    )
}