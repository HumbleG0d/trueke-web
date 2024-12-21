package com.truek.api.services.user;


import com.truek.api.dtos.UserLoginDTO;
import com.truek.api.entity.UserLogin;
import com.truek.api.jwt.services.JWTService;
import com.truek.api.request.UserLoginRequest;
import com.truek.api.response.UserRegisterResponse;
import com.truek.api.respository.UserLoginRepository;
import com.truek.api.respository.UserRegisterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class UserLoginService implements IUserLoginService {

  private final UserLoginRepository userLoginRepository;
  private final UserRegisterRepository registerRepository;
  private final AuthenticationManager authenticationManager;
  private final JWTService jwtService;

  @Override
  public UserLoginDTO login(UserLoginRequest userLogin) {
    var existingUser = registerRepository.findByEmail(userLogin.email());

    Optional<UserLogin> existingLogin = userLoginRepository.findByEmail(userLogin.email());
    String token = jwtService.generateToken(userLogin.email());

    if (existingLogin.isPresent()) {
      UserLogin userLoginSession = existingLogin.get();
      userLoginSession.setToken(token);
      userLoginRepository.save(userLoginSession);
    } else {
      userLoginRepository.save(new UserLogin(userLogin, token));
    }

    Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(userLogin.email(), userLogin.password())
    );

    if (!authentication.isAuthenticated()) {
      throw new IllegalArgumentException("Credenciales incorrectas.");
    }

    UserRegisterResponse userRegisterResponse = new UserRegisterResponse(
            existingUser.getId(),
            existingUser.getUsername(),
            existingUser.getLocation(),
            existingUser.getEmail()
    );

    return new UserLoginDTO(userRegisterResponse, token);
  }
}