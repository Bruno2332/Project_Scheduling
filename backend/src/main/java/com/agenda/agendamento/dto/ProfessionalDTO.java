package com.agenda.agendamento.dto;

import com.agenda.agendamento.entities.Professional;
import com.agenda.agendamento.entities.Scheduling;
import java.util.Set;

public class ProfessionalDTO {

    private Long id;
    private String name;
    private String speciality;


    public ProfessionalDTO(){
    }

    public ProfessionalDTO(Professional entity) {
        id = entity.getId();
        name = entity.getName();
        speciality = entity.getSpeciality();
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSpeciality() {
        return speciality;
    }
}
