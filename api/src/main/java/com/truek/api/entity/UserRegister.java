package com.truek.api.entity;

import com.truek.api.request.UserRegisterRequest;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class UserRegister {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @NotNull
  private String username;

  @Email
  private String email;

  @NotNull
  private String location;

  @NotNull
  private String password;

  public UserRegister(UserRegisterRequest userRegisterRequest , String password) {
    this.email = userRegisterRequest.email();
    this.location = userRegisterRequest.location();
    this.username = userRegisterRequest.username();
    this.password = password;
  }

}
