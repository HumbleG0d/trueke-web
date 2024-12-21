package com.truek.api.request;

import jakarta.validation.constraints.NotNull;

public record TradeAccept(
        @NotNull
        Long trade_id,
        @NotNull
        Long productAcceptedId
) {
}
