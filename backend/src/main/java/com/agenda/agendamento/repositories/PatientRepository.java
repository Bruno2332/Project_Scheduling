package com.agenda.agendamento.repositories;

import com.agenda.agendamento.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {
}
