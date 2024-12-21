package com.truek.api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "trades")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Trade {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "product_offered_id")
  private Product productOffered;

  @ManyToOne
  @JoinColumn(name = "product_requested_id")
  private Product productRequested;

  @ManyToOne
  @JoinColumn(name = "requester_user_id")
  private UserLogin requesterUser;

  @ManyToOne
  @JoinColumn(name = "receiver_user_id")
  private UserLogin receiverUser;

  @Enumerated(value = EnumType.STRING)
  private TradeStatus status;

  private LocalDateTime createdAt;
}