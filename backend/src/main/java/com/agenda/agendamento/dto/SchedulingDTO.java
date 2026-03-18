package com.agenda.agendamento.dto;

import com.agenda.agendamento.entities.Scheduling;

import java.time.Instant;

public class SchedulingDTO {

    private Long id;
    private Instant momentScheduling;
    private Long patientId;
    private Long professionalId;

    public SchedulingDTO(){
    }

    public SchedulingDTO(Scheduling entity){
        id = entity.getId();
        momentScheduling = entity.getMomentScheduling();
        patientId = entity.getPatient().getId();
        professionalId = entity.getProfessional().getId();
    }

    public Long getId() {
        return id;
    }

    public Instant getMomentScheduling() {
        return momentScheduling;
    }

    public Long getPatientId() {
        return patientId;
    }

    public Long getProfessionalId() {
        return professionalId;
    }
}
