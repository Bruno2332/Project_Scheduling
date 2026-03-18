package com.agenda.agendamento.repositories;

import com.agenda.agendamento.entities.Scheduling;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;

public interface SchedulingRepository extends JpaRepository<Scheduling, Long> {

    Page<Scheduling> findByMomentSchedulingBetween(Instant start, Instant end, Pageable pageable);
}
