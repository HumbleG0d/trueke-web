package com.truek.api.dtos;
import com.truek.api.entity.Status;
import jakarta.validation.constraints.NotBlank;

public record ProductDTO(
        @NotBlank
        Long id,
        @NotBlank
        String imageUrl,
        @NotBlank
        String name,
        @NotBlank
        Status status,
        @NotBlank
        String user
) {
}
