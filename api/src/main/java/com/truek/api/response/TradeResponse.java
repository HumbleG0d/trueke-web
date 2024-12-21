package com.truek.api.response;

import com.truek.api.entity.TradeStatus;
import jakarta.validation.constraints.NotBlank;

public record TradeResponse(
        @NotBlank
        String message,
        @NotBlank
        TradeStatus status_trade
) {
}
