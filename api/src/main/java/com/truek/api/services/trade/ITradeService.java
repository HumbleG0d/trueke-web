package com.truek.api.services.trade;

import com.truek.api.request.TradeAccept;
import com.truek.api.request.TradeReject;
import com.truek.api.request.TradeRequest;
import com.truek.api.response.TradeAll;
import com.truek.api.response.TradeRequestResponse;
import com.truek.api.response.TradeResponse;

import java.util.List;

public interface ITradeService {
  TradeRequestResponse requestTrade(TradeRequest tradeRequest);
  List<TradeAll> getTradesPending();
  TradeResponse tradeAccepted(TradeAccept tradeAccept);
  TradeResponse tradeRejected(TradeReject tradeReject);
}
