package com.truek.api.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record UserLoginRequest(
        @Email
        String email,
        @NotNull
        String password
) {
}
