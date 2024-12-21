package com.truek.api.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record UserRegisterDTO(
        @NotNull
        String userName,
        @NotNull
        String location,
        @Email
        String email
) {
}
