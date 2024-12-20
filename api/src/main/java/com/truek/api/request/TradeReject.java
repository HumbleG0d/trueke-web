package com.truek.api.request;

import jakarta.validation.constraints.NotNull;

public record TradeReject(
        @NotNull
        Long trade_id
) {
}
