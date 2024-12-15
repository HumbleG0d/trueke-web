package com.truek.api.jwt.services;

import com.truek.api.entity.User;
import com.truek.api.entity.UserLogin;
import com.truek.api.entity.UserRegister;
import com.truek.api.respository.UserLoginRepository;
import com.truek.api.respository.UserRegisterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MyUserDetailsService implements UserDetailsService {
  private final UserRegisterRepository userRegisterRepository;

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

    Optional<UserRegister> userOptional = Optional.ofNullable(userRegisterRepository.findByEmail(email));
    if (userOptional.isEmpty()) {
      System.out.println("User not found");
      throw new UsernameNotFoundException("User not found");
    }

    return new User(userOptional.get());
  }
}

