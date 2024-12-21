package com.truek.api.request;

import jakarta.validation.constraints.NotNull;

public record TradeRequest(
        @NotNull
        Long productOfferedId,
        @NotNull
        Long productRequestedId
) {
}
