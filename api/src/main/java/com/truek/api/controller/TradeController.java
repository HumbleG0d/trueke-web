package com.truek.api.controller;

import com.truek.api.request.TradeAccept;
import com.truek.api.request.TradeReject;
import com.truek.api.request.TradeRequest;
import com.truek.api.response.ApiResponse;
import com.truek.api.response.TradeAll;
import com.truek.api.response.TradeRequestResponse;
import com.truek.api.response.TradeResponse;
import com.truek.api.services.trade.TradeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class TradeController {

  private final TradeService tradeService;

  @PostMapping("/trades/request")
  public ResponseEntity<ApiResponse<TradeRequestResponse>> requestTrade(@RequestBody @Valid TradeRequest trade) {
    try {
      var tradeResponse = tradeService.requestTrade(trade);
      return ResponseEntity.ok(new ApiResponse<>( "Solicitud enviada", tradeResponse ));
    }catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>(e.getMessage(),null));
    }
  }

  @GetMapping("/trades/pending")
  public ResponseEntity<ApiResponse<List<TradeAll>>> getPendingTrade() {
    try {
      var pending_trades = tradeService.getTradesPending();
      return ResponseEntity.ok(new ApiResponse<>("Trades pendientes" , pending_trades));
    }catch (Exception e) {
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>(e.getMessage(),null));
    }
  }

  @PostMapping("/trades/accept")
  public ResponseEntity<ApiResponse<TradeResponse>> acceptTrade(@RequestBody @Valid TradeAccept trade) {
    try {
      var trade_accept = tradeService.tradeAccepted(trade);
      return ResponseEntity.ok(new ApiResponse<>("Solicitud accepta", trade_accept));
    }catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>(e.getMessage(),null));
    }
  }

  @PostMapping("/trades/reject")
  public ResponseEntity<ApiResponse<TradeResponse>> rejectTrade(@RequestBody @Valid TradeReject trade) {
    try {
      var trade_reject = tradeService.tradeRejected(trade);
      return ResponseEntity.ok(new ApiResponse<>("Solicitud accepta", trade_reject));
    }catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>(e.getMessage(),null));
    }
  }
}
