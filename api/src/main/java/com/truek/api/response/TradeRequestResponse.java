package com.truek.api.response;

import com.truek.api.entity.TradeStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record TradeRequestResponse(
        @NotBlank
        String message,
        @NotNull
        Long trade_id,
        @NotBlank
        TradeStatus status_trade
) {
}
