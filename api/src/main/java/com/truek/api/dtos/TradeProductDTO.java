package com.truek.api.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record TradeProductDTO(
        @NotNull
        Long id,
        @NotBlank
        String name
) {
}
