package com.agenda.agendamento.util;

import com.agenda.agendamento.dto.SchedulingDTO;
import com.agenda.agendamento.entities.Patient;
import com.agenda.agendamento.entities.Professional;
import com.agenda.agendamento.entities.Scheduling;

import java.time.Instant;

public class Factory {

    public static Professional createProfessional(){
        return new Professional(1L, "Dr. Bruno", "Nutricionista");
    }

    public static Patient createPatient(){
        return new Patient(1L, "Joana Silva");
    }

    public static Scheduling createScheduling(){
        return new Scheduling(1L, Instant.parse("2024-05-20T08:00:00Z"), createPatient(), createProfessional());
    }

    public static SchedulingDTO createSchedulingDTO(){
        return new SchedulingDTO(createScheduling());
    }
}
