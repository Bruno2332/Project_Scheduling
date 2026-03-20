package com.agenda.agendamento.controllers;

import com.agenda.agendamento.dto.PatientDTO;
import com.agenda.agendamento.dto.SchedulingDTO;
import com.agenda.agendamento.dto.SchedulingInsertDTO;
import com.agenda.agendamento.services.PatientService;
import com.agenda.agendamento.services.SchedulingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;


@RestController
@RequestMapping(value = "/schedulings")
public class SchedulingController {

    @Autowired
    private SchedulingService service;

    @GetMapping
    public ResponseEntity<Page<SchedulingDTO>> findAll(
            @RequestParam(value = "minDate", defaultValue = "") String minDate,
            @RequestParam(value = "maxDate", defaultValue = "") String maxDate,
            Pageable pageable){
        Page<SchedulingDTO> result = service.findByMoment(minDate, maxDate, pageable);
        return ResponseEntity.ok(result);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<SchedulingDTO> findById(@PathVariable Long id){
        SchedulingDTO dto = service.findById(id);
        return ResponseEntity.ok(dto);
    }

    @PostMapping
    public ResponseEntity<SchedulingInsertDTO> insert(@Valid @RequestBody SchedulingInsertDTO dto){
        dto = service.insert(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(dto);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<SchedulingInsertDTO> update(@PathVariable Long id, @Valid @RequestBody SchedulingInsertDTO dto){
        dto = service.update(id, dto);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
