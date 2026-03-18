package com.agenda.agendamento.services;

import com.agenda.agendamento.dto.SchedulingDTO;
import com.agenda.agendamento.entities.Professional;
import com.agenda.agendamento.entities.Scheduling;
import com.agenda.agendamento.repositories.PatientRepository;
import com.agenda.agendamento.repositories.ProfessionalRepository;
import com.agenda.agendamento.repositories.SchedulingRepository;
import com.agenda.agendamento.services.exceptions.ConflictException;
import com.agenda.agendamento.services.exceptions.DatabaseException;
import com.agenda.agendamento.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
public class SchedulingService {

    @Autowired
    private SchedulingRepository repository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private ProfessionalRepository professionalRepository;

    @Transactional(readOnly = true)
    public SchedulingDTO findById(Long id) {
        Scheduling scheduling = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Recurso não encontrado"));
        return new SchedulingDTO(scheduling);
    }

    @Transactional(readOnly = true)
    public Page<SchedulingDTO> findByMoment(String minDate, String maxDate, Pageable pageable) {
        Instant min = (minDate.isBlank()) ? Instant.parse("2000-01-01T00:00:00Z") : Instant.parse(minDate.trim());
        Instant max = (maxDate.isBlank()) ? Instant.parse("2100-01-01T00:00:00Z") : Instant.parse(maxDate.trim());
        Page<Scheduling> result = repository.findByMomentSchedulingBetween(min, max, pageable);
        return result.map(x -> new SchedulingDTO(x));
    }

    @Transactional
    public SchedulingDTO insert(SchedulingDTO dto) {
        Scheduling entity = new Scheduling();
        Professional professional = professionalRepository.getReferenceById(dto.getProfessionalId());
        conflictScheduling(professional.getId(), dto);
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new SchedulingDTO(entity);
    }

    @Transactional
    public SchedulingDTO update(Long id, SchedulingDTO dto) {
        try {
            Scheduling entity = repository.getReferenceById(id);
            Professional professional = professionalRepository.getReferenceById(dto.getProfessionalId());
            conflictScheduling(professional.getId(), dto);
            copyDtoToEntity(dto, entity);
            entity = repository.save(entity);
            return new SchedulingDTO(entity);
        }
        catch(EntityNotFoundException e) {
            throw new ResourceNotFoundException("Recurso não encontrado");
        }
    }

    @Transactional(propagation = Propagation.SUPPORTS)
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Recurso não encontrado");
        }
        try {
            repository.deleteById(id);
        }
        catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Falha de integridade referencial");
        }
    }

    private void copyDtoToEntity(SchedulingDTO dto, Scheduling entity) {
        entity.setMomentScheduling(dto.getMomentScheduling());
        entity.setPatient(patientRepository.getReferenceById(dto.getPatientId()));
        entity.setProfessional(professionalRepository.getReferenceById(dto.getProfessionalId()));
    }

    private void conflictScheduling(Long id, SchedulingDTO dto){
        Professional entity = professionalRepository.getReferenceById(id);
        for (Scheduling sch : entity.getSchedulings()){
            if (sch.getMomentScheduling().equals(dto.getMomentScheduling())){
                throw new ConflictException("Este horário não está disponível");
            }
        }
    }
}
