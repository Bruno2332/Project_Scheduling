package com.agenda.agendamento.services;

import com.agenda.agendamento.dto.ProfessionalDTO;
import com.agenda.agendamento.dto.SchedulingDTO;
import com.agenda.agendamento.entities.Professional;
import com.agenda.agendamento.entities.Scheduling;
import com.agenda.agendamento.repositories.ProfessionalRepository;
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
public class ProfessionalService {

    @Autowired
    private ProfessionalRepository repository;

    @Transactional(readOnly = true)
    public ProfessionalDTO findById(Long id) {
        Professional professional = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Recurso não encontrado"));
        return new ProfessionalDTO(professional);
    }

    @Transactional(readOnly = true)
    public Page<ProfessionalDTO> findAll(Pageable pageable) {
        Page<Professional> result = repository.findAll(pageable);
        return result.map(x -> new ProfessionalDTO(x));
    }

    @Transactional
    public ProfessionalDTO insert(ProfessionalDTO dto) {
        Professional entity = new Professional();
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new ProfessionalDTO(entity);
    }

    @Transactional
    public ProfessionalDTO update(Long id, ProfessionalDTO dto) {
        try {
            Professional entity = repository.getReferenceById(id);
            copyDtoToEntity(dto, entity);
            entity = repository.save(entity);
            return new ProfessionalDTO(entity);
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

    private void copyDtoToEntity(ProfessionalDTO dto, Professional entity) {
        entity.setName(dto.getName());
        entity.setSpeciality(dto.getSpeciality());
    }
}
