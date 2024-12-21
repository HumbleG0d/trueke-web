package com.truek.api.exceptions;

public class PasswordMismatchException extends RuntimeException{
  public PasswordMismatchException(String message){
    super(message);
  }
}
