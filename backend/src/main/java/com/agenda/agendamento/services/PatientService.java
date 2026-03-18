package com.agenda.agendamento.services;

import com.agenda.agendamento.dto.PatientDTO;
import com.agenda.agendamento.dto.SchedulingDTO;
import com.agenda.agendamento.entities.Patient;
import com.agenda.agendamento.entities.Scheduling;
import com.agenda.agendamento.repositories.PatientRepository;
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

@Service
public class PatientService {

    @Autowired
    private PatientRepository repository;

    @Transactional(readOnly = true)
    public PatientDTO findById(Long id) {
        Patient patient = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Recurso não encontrado"));
        return new PatientDTO(patient);
    }

    @Transactional(readOnly = true)
    public Page<PatientDTO> findAll(Pageable pageable) {
        Page<Patient> result = repository.findAll(pageable);
        return result.map(x -> new PatientDTO(x));
    }

    @Transactional
    public PatientDTO insert(PatientDTO dto) {
        Patient entity = new Patient();
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new PatientDTO(entity);
    }

    @Transactional
    public PatientDTO update(Long id, PatientDTO dto) {
        try {
            Patient entity = repository.getReferenceById(id);
            copyDtoToEntity(dto, entity);
            entity = repository.save(entity);
            return new PatientDTO(entity);
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

    private void copyDtoToEntity(PatientDTO dto, Patient entity) {
        entity.setName(dto.getName());
    }

}
