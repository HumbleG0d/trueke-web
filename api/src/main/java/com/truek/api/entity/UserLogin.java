package com.truek.api.entity;

import com.truek.api.request.UserLoginRequest;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users_login")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class UserLogin {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Email
  private String email;

  @NotNull
  private String token;

  public UserLogin(UserLoginRequest loginRequest , String token) {
    this.email = loginRequest.email();
    this.token = token;
  }
}
