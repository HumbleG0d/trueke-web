package com.truek.api.services.trade;

import com.truek.api.dtos.TradeProductDTO;
import com.truek.api.entity.Product;
import com.truek.api.entity.Trade;
import com.truek.api.entity.TradeStatus;
import com.truek.api.entity.UserLogin;
import com.truek.api.request.TradeAccept;
import com.truek.api.request.TradeReject;
import com.truek.api.request.TradeRequest;
import com.truek.api.response.TradeAll;
import com.truek.api.response.TradeRequestResponse;
import com.truek.api.response.TradeResponse;
import com.truek.api.respository.ProductRepository;
import com.truek.api.respository.TradeRepository;
import com.truek.api.respository.UserLoginRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TradeService implements ITradeService {

  private final TradeRepository tradeRepository;
  private final ProductRepository productRepository;
  private final UserLoginRepository userRepository;

  @Override
  public TradeRequestResponse requestTrade(TradeRequest tradeRequest) {
    Long authenticatedUserId = getAuthenticatedUserId();

    Product offeredProduct = productRepository.findById(tradeRequest.productOfferedId())
            .orElseThrow(() -> new IllegalArgumentException("El producto ofrecido no existe."));

    Product requestedProduct = productRepository.findById(tradeRequest.productRequestedId())
            .orElseThrow(() -> new IllegalArgumentException("El producto solicitado no existe."));

    if (offeredProduct.getUser().getId().equals(requestedProduct.getUser().getId())) {
      throw new IllegalArgumentException("No puedes intercambiar productos contigo mismo.");
    }

    if (!offeredProduct.getUser().getId().equals(authenticatedUserId)) {
      throw new SecurityException("No tienes permiso para ofrecer este producto.");
    }

    Trade trade = new Trade();
    trade.setProductOffered(offeredProduct);
    trade.setProductRequested(requestedProduct);
    trade.setRequesterUser(offeredProduct.getUser());
    trade.setReceiverUser(requestedProduct.getUser());
    trade.setStatus(TradeStatus.PENDIENTE);
    trade.setCreatedAt(LocalDateTime.now());

    tradeRepository.save(trade);

    return new TradeRequestResponse( "Solicitud enviada",trade.getId(), trade.getStatus());
  }

  @Override
  public List<TradeAll> getTradesPending() {
    Long authenticatedUserId = getAuthenticatedUserId();

    List<Trade> trades = tradeRepository.findByReceiverUser_Id(authenticatedUserId);

    return trades.stream().map(trade ->
            new TradeAll(trade.getId(),
                    trade.getStatus(),
                    new TradeProductDTO(trade.getProductOffered().getId(), trade.getProductOffered().getName()),
                    new TradeProductDTO(trade.getProductRequested().getId(), trade.getProductRequested().getName()),
                    trade.getCreatedAt())
    ).toList();
  }

  @Override
  public TradeResponse tradeAccepted(TradeAccept tradeAccept) {
    Long authenticatedUserId = getAuthenticatedUserId();

    Trade trade = tradeRepository.findById(tradeAccept.trade_id())
            .orElseThrow(() -> new IllegalArgumentException("El trueque no existe."));

    if (!trade.getReceiverUser().getId().equals(authenticatedUserId)) {
      throw new SecurityException("No tienes permiso para aceptar este trueque.");
    }

    Product acceptedProduct = productRepository.findById(tradeAccept.productAcceptedId())
            .orElseThrow(() -> new IllegalArgumentException("El producto seleccionado no existe."));

    if (!acceptedProduct.getUser().getId().equals(trade.getRequesterUser().getId())) {
      throw new IllegalArgumentException("El producto aceptado no pertenece al usuario que solicitó el trueque.");
    }

    UserLogin user1 = trade.getRequesterUser();
    UserLogin user2 = trade.getReceiverUser();

    trade.getProductOffered().setUser(user2);
    trade.getProductRequested().setUser(user1);

    productRepository.save(trade.getProductOffered());
    productRepository.save(trade.getProductRequested());

    trade.setStatus(TradeStatus.ACEPTADO);
    tradeRepository.save(trade);

    return new TradeResponse("Trueke realizado", trade.getStatus());
  }

  @Override
  public TradeResponse tradeRejected(TradeReject tradeReject) {
    Long authenticatedUserId = getAuthenticatedUserId();

    // Validar que el trueque existe
    Trade trade = tradeRepository.findById(tradeReject.trade_id())
            .orElseThrow(() -> new IllegalArgumentException("El trueque no existe."));

    if (!trade.getReceiverUser().getId().equals(authenticatedUserId)) {
      throw new SecurityException("No tienes permiso para rechazar este trueque.");
    }

    trade.setStatus(TradeStatus.RECHAZADO);
    tradeRepository.save(trade);

    return new TradeResponse("Trueke rechazado", trade.getStatus());
  }

  private Long getAuthenticatedUserId() {
    String authenticatedUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
    return userRepository.findByEmail(authenticatedUserEmail)
            .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado."))
            .getId();
  }
}