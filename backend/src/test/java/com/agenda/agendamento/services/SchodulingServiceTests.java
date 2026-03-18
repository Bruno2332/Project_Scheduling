package com.agenda.agendamento.services;

import com.agenda.agendamento.dto.SchedulingDTO;
import com.agenda.agendamento.entities.Patient;
import com.agenda.agendamento.entities.Professional;
import com.agenda.agendamento.entities.Scheduling;
import com.agenda.agendamento.repositories.PatientRepository;
import com.agenda.agendamento.repositories.ProfessionalRepository;
import com.agenda.agendamento.repositories.SchedulingRepository;
import com.agenda.agendamento.services.exceptions.ConflictException;
import com.agenda.agendamento.services.exceptions.DatabaseException;
import com.agenda.agendamento.services.exceptions.ResourceNotFoundException;
import com.agenda.agendamento.util.Factory;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import static org.mockito.Mockito.*;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@ExtendWith(SpringExtension.class)
public class SchodulingServiceTests {

    @InjectMocks
    private SchedulingService service;

    @Mock
    private SchedulingRepository repository;

    @Mock
    private ProfessionalRepository professionalRepository;

    @Mock
    private PatientRepository patientRepository;

    private long existsId;
    private long nonExistsId;
    private long dependentId;
    private Page<Scheduling> page;
    private Scheduling scheduling;
    private SchedulingDTO dto;
    private Professional professional;
    private Patient patient;
    private Instant equalDate;

    @BeforeEach
    void setUp() throws Exception{
        existsId = 1L;
        nonExistsId = 1000L;
        dependentId = 2L;
        scheduling = Factory.createScheduling();
        dto = Factory.createSchedulingDTO();
        professional = Factory.createProfessional();
        patient = Factory.createPatient();
        equalDate = Instant.parse("2024-05-20T08:00:00Z");
        page = new PageImpl<>(List.of(scheduling));

        when(repository.getReferenceById(existsId)).thenReturn(scheduling);
        when(repository.getReferenceById(nonExistsId)).thenThrow(EntityNotFoundException.class);
        when(professionalRepository.getReferenceById(existsId)).thenReturn(professional);
        when(professionalRepository.getReferenceById(nonExistsId)).thenThrow(EntityNotFoundException.class);
        when(repository.findByMomentSchedulingBetween(ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any())).thenReturn(page);
        when(repository.save(ArgumentMatchers.any())).thenReturn(Factory.createScheduling());
        when(repository.findById(existsId)).thenReturn(Optional.of(scheduling));
        when(repository.findById(nonExistsId)).thenReturn(Optional.empty());
        doNothing().when(repository).deleteById(existsId);
        doThrow(DataIntegrityViolationException.class).when(repository).deleteById(dependentId);
        when(repository.existsById(existsId)).thenReturn(true);
        when(repository.existsById(nonExistsId)).thenReturn(false);
        when(repository.existsById(dependentId)).thenReturn(true);
    }

    @Test
    public void findByIdShouldReturnSchedulingDTOWhenExistsId(){
        dto = service.findById(existsId);
        Assertions.assertNotNull(dto);
    }

    @Test
    public void findByIdShouldThrowResourceNotFoundExceptionWhenNotExistsId(){
        Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            service.findById(nonExistsId);
        });
    }

    @Test
    public void findAllPagedShouldReturnPage(){
        Pageable pageable = PageRequest.of(0, 10);
        Page<SchedulingDTO> result = service.findByMoment("", "", pageable);
        Assertions.assertNotNull(result);
    }

    @Test
    public void insertProductShouldReturnSchedulingDTOWhenBodyValid(){
        SchedulingDTO result = service.insert(dto);
        Assertions.assertNotNull(result);
        Assertions.assertEquals(result.getMomentScheduling(), dto.getMomentScheduling());
    }

    @Test
    public void insertShouldThrowConflictExceptionWhenScheduleIsTaken() {
        scheduling.setMomentScheduling(equalDate);
        professional.getSchedulings().add(scheduling);
        Assertions.assertThrows(ConflictException.class, () -> {
            service.insert(dto);
        });
    }

    @Test
    public void updateShouldUpdateWhenExistsId(){
        SchedulingDTO result = service.update(existsId, dto);
        Assertions.assertNotNull(result);
    }

    @Test
    public void updateShouldThrowResourceNotFoundExceptionWhenNotExistsId(){
        Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            service.update(nonExistsId, dto);
        });
    }

    @Test
    public void deleteShouldThrowDatabaseExceptionWhenDependentId(){
        Assertions.assertThrows(DatabaseException.class, () -> {
            service.delete(dependentId);
        });
    }

    @Test
    public void deleteShouldThrowResourceNotFoundExceptionWhenIdDoesNotExist(){
        Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            service.delete(nonExistsId);
        });
    }

    @Test
    public void deleteShouldNothingWhenIdExists(){
        Assertions.assertDoesNotThrow(() -> {
            service.delete(existsId);
        });

        Mockito.verify(repository, Mockito.times(1)).deleteById(existsId);
    }

}
