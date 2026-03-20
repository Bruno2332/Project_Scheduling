import type { PatientDTO } from "./patient"
import type { ProfessionalDTO } from "./professional"

export type SchedulingDTO = {
    id: number,
    momentScheduling: string,
    patient: PatientDTO,
    professional: ProfessionalDTO
}

export type SchedulingInsertDTO = {
    id?: number,
    momentScheduling: string,
    patientId: number
    professionalId: number
}