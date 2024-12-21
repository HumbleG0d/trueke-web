package com.truek.api.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record UserLoginDTO(
        @Email
        String email,
        @NotNull
        String token
) {
}
