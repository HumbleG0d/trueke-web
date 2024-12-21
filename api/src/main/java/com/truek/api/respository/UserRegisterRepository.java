package com.truek.api.respository;

import com.truek.api.entity.UserRegister;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRegisterRepository extends JpaRepository<UserRegister, Long> {
  UserRegister findByEmail(String email);
}
