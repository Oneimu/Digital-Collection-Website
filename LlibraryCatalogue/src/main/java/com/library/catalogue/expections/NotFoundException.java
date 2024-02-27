package com.library.catalogue.expections;

public class NotFoundException extends RuntimeException {

    private String code = "05";

    public NotFoundException(){
        super();
    }

    public NotFoundException(String message){
        super(message);
    }

    public NotFoundException(String message, Throwable cause){
        super(message, cause);
    }

}