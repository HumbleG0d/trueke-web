package com.truek.api.response;

import com.truek.api.dtos.TradeProductDTO;
import com.truek.api.entity.TradeStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record TradeAll(
        @NotNull
        Long trade_id,
        @NotBlank
        TradeStatus status_trade,
        @NotNull
        TradeProductDTO productOffered,
        @NotNull
        TradeProductDTO productRequest,
        @NotBlank
        LocalDateTime trade_date
) {
}
