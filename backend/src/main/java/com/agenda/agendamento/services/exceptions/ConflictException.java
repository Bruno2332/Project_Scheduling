package com.agenda.agendamento.services.exceptions;

public class ConflictException extends RuntimeException{

    public ConflictException(String msg){
        super(msg);
    }
}
