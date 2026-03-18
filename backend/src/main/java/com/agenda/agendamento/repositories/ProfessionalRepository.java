package com.agenda.agendamento.repositories;

import com.agenda.agendamento.entities.Professional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfessionalRepository extends JpaRepository<Professional, Long> {
}
