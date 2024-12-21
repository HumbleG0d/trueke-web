package com.truek.api.dtos;
import com.truek.api.entity.Status;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ProductDTO(
        @NotBlank
        Long id,
        @NotBlank
        String imageUrl,
        @NotBlank
        String name,
        @NotBlank
        Status status,
        @NotNull
        Long user_id,
        @NotBlank
        String user
) {
}
