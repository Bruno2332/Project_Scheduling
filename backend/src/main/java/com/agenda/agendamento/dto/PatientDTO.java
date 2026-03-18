package com.agenda.agendamento.dto;

import com.agenda.agendamento.entities.Patient;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class PatientDTO {

    private Long id;
    private String name;


    public PatientDTO(){
    }

    public PatientDTO(Patient entity) {
        id = entity.getId();
        name = entity.getName();
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
