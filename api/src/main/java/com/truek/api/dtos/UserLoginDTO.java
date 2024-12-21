package com.truek.api.dtos;

import com.truek.api.response.UserRegisterResponse;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record UserLoginDTO(
        UserRegisterResponse userLogin,
        @NotNull
        String token
) {
}
