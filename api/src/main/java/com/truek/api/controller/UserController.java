package com.truek.api.controller;

import com.truek.api.dtos.UserLoginDTO;
import com.truek.api.dtos.UserRegisterDTO;
import com.truek.api.request.UserLoginRequest;
import com.truek.api.request.UserRegisterRequest;
import com.truek.api.response.ApiResponse;
import com.truek.api.services.user.UserLoginService;
import com.truek.api.services.user.UserRegisterService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
  private final UserRegisterService userRegisterService;
  private final UserLoginService userLoginService;

  @PostMapping("/register/user")
  public ResponseEntity<ApiResponse<UserRegisterDTO>> register(@RequestBody @Valid UserRegisterRequest userRegisterRequest) {
   try {
     UserRegisterDTO userRegisterDTO = userRegisterService.register(userRegisterRequest);
     return ResponseEntity.ok(new ApiResponse<>("Usuario registrado", userRegisterDTO));
   }catch (Exception e){
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>(e.getMessage(), null));
   }
  }

  @PostMapping("/login/user")
  public ResponseEntity<ApiResponse<UserLoginDTO>> login(@RequestBody @Valid UserLoginRequest userLoginRequest) {
    try {
      UserLoginDTO userLoginDTO = userLoginService.login(userLoginRequest);
      return ResponseEntity.ok(new ApiResponse<>("Usuario logueado", userLoginDTO));
    }catch (Exception e){
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>(e.getMessage(), null));
    }
  }

}
