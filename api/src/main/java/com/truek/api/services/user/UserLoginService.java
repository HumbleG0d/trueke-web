package com.truek.api.services.user;


import com.truek.api.dtos.UserLoginDTO;
import com.truek.api.entity.UserLogin;
import com.truek.api.jwt.services.JWTService;
import com.truek.api.request.UserLoginRequest;
import com.truek.api.respository.UserLoginRepository;
import com.truek.api.respository.UserRegisterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class UserLoginService implements IUserLoginService {

  private final UserLoginRepository userLoginRepository;
  private final UserRegisterRepository registerRepository;
  private final  AuthenticationManager authenticationManager;
  private final JWTService jwtService;
  @Override
  public UserLoginDTO login(UserLoginRequest userLogin) {
    var existingUser = registerRepository.findByEmail(userLogin.email());
    if (existingUser == null) {
      throw new UsernameNotFoundException("Usuario no encontrado.");
    }

    //Verificar si el usuario ya tiene una sesión activa
    Optional<UserLogin> existingLogin = userLoginRepository.findByEmail(userLogin.email());
    if (existingLogin.isPresent()) {
      userLoginRepository.delete(existingLogin.get());
    }

    //Validar credenciales
    Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(userLogin.email(), userLogin.password())
    );

    if (!authentication.isAuthenticated()) {
      throw new IllegalArgumentException("Credenciales incorrectas.");
    }

    //Generar el JWT y guardar el login
    String token = jwtService.generateToken(userLogin.email());
    userLoginRepository.save(new UserLogin(userLogin, token));
    return new UserLoginDTO(userLogin.email(), token);
  }
}
