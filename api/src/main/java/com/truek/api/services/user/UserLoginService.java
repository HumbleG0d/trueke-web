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


@Service
@RequiredArgsConstructor
public class UserLoginService implements IUserLoginService {

  private final UserLoginRepository userLoginRepository;
  private final UserRegisterRepository registerRepository;
  private final  AuthenticationManager authenticationManager;
  private final JWTService jwtService;
  @Override
  public UserLoginDTO login(UserLoginRequest userLogin) {
    // 1. Buscar usuario por email

    var existingUser = registerRepository.findByEmail(userLogin.email());
    if (existingUser == null) {
      throw new UsernameNotFoundException("Usuario no encontrado.");
    }
    // 2. Validar credenciales
    Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(userLogin.email(), userLogin.password())
    );

    if (!authentication.isAuthenticated()) {
      throw new IllegalArgumentException("Credenciales incorrectas.");
    }

    // 3. Guardar el login (si es necesario) y generar el JWT

    String token = jwtService.generateToken(userLogin.email());
    userLoginRepository.save(new UserLogin(userLogin , token)); // Guardar login si es necesario
    return new UserLoginDTO(userLogin.email(), token); // Retornar el token JWT
  }
}
