package com.buzzbuy.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import com.buzzbuy.exception.UserException;
import com.buzzbuy.exception.ErrorDetails;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserException.class)
    public ResponseEntity<ErrorDetails> userExceptionHandler(UserException ue, WebRequest req) {
        ErrorDetails err = new ErrorDetails(LocalDateTime.now(), req.getDescription(false), ue.getMessage());
        // Return 409 Conflict (or 400 Bad Request) instead of 500 Internal Server Error
        return new ResponseEntity<>(err, HttpStatus.CONFLICT);
    }
    
    // You can add a generic handler for other exceptions as well
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDetails> otherExceptionHandler(Exception e, WebRequest req) {
        ErrorDetails err = new ErrorDetails(LocalDateTime.now(), req.getDescription(false), e.getMessage());
        return new ResponseEntity<>(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}