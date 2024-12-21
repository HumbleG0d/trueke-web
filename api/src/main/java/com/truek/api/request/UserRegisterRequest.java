package com.truek.api.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record UserRegisterRequest(
        @NotNull
        String username,
        @Email
        String email,
        @NotNull
        String location,
        @NotNull
        String password,
        @NotNull
        String confirmPassword
) {
}
