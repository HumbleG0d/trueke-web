package com.truek.api.respository;

import com.truek.api.entity.Trade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TradeRepository extends JpaRepository<Trade, Long> {
  List<Trade> findByReceiverUser_Id(Long authenticatedUserId);
}
