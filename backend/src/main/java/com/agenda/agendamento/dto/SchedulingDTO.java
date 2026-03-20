package com.agenda.agendamento.dto;

import com.agenda.agendamento.entities.Patient;
import com.agenda.agendamento.entities.Professional;
import com.agenda.agendamento.entities.Scheduling;

import java.time.Instant;

public class SchedulingDTO {

    private Long id;
    private Instant momentScheduling;
    private PatientDTO patient;
    private ProfessionalDTO professional;


    public SchedulingDTO(){
    }

    public SchedulingDTO(Scheduling entity){
        id = entity.getId();
        momentScheduling = entity.getMomentScheduling();
        patient = new PatientDTO(entity.getPatient());
        professional = new ProfessionalDTO(entity.getProfessional());
    }

    public Long getId() {
        return id;
    }

    public Instant getMomentScheduling() {
        return momentScheduling;
    }

    public PatientDTO getPatient() {
        return patient;
    }

    public ProfessionalDTO getProfessional() {
        return professional;
    }
}
