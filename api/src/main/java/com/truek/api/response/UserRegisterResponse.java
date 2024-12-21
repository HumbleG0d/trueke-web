package com.truek.api.response;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record UserRegisterResponse(
        @NotNull
        Long id,
        @NotNull
        String userName,
        @NotNull
        String location,
        @Email
        String email
) {
}
