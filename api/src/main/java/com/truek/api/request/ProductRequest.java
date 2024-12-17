package com.truek.api.request;

import com.truek.api.entity.Categories;
import com.truek.api.entity.Status;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;

public record ProductRequest(
        @NotBlank
        MultipartFile image,
        @NotBlank
        String name,
        @NotBlank
        Status status,
        @NotBlank
        Categories categories,
        @NotNull
        String description
) {
}
