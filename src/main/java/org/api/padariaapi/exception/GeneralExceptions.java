package org.api.padariaapi.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


public class GeneralExceptions extends RuntimeException {
    private final HttpStatus status;
    public GeneralExceptions(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus(){
        return status;
    }
}
