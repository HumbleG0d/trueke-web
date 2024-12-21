package com.truek.api.entity;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class User implements UserDetails {

  private final UserRegister userRegister;

  public User(UserRegister userRegister) {
    this.userRegister = userRegister;
  }


  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return Collections.singleton(new SimpleGrantedAuthority("USER"));
  }

  @Override
  public String getPassword() {
    return userRegister.getPassword();
  }

  @Override
  public String getUsername() {
    return userRegister.getEmail();
  }
}
