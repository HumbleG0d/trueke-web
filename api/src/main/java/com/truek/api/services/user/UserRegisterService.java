package com.truek.api.services.user;

import com.truek.api.dtos.UserRegisterDTO;
import com.truek.api.entity.UserRegister;
import com.truek.api.exceptions.PasswordMismatchException;
import com.truek.api.request.UserRegisterRequest;
import com.truek.api.respository.UserRegisterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserRegisterService implements IUserRegisterService {

  private final UserRegisterRepository userRegisterRepository;
  private final BCryptPasswordEncoder passwordEncoder;

  @Override
  public UserRegisterDTO register(UserRegisterRequest userRegisterRequest) {
    var user_register = Optional
            .ofNullable(userRegisterRepository.findByEmail(userRegisterRequest.email()))
            .orElseGet(() -> createUser(userRegisterRequest));

    var user_saved = userRegisterRepository.save(user_register);

    return convertUserRegisterToUserRegisterDTO(user_saved);
  }

  private UserRegister createUser(UserRegisterRequest userRegisterRequest) {
    // Verificar que las contraseñas coincidan
    if (!userRegisterRequest.password().equals(userRegisterRequest.confirmPassword())) {
      throw new PasswordMismatchException("Las contraseñas no coinciden");
    }

    // Encriptar la contraseña
    String encryptedPassword = passwordEncoder.encode(userRegisterRequest.password());

    // Crear el objeto UserRegister con la contraseña encriptada
    return new UserRegister(userRegisterRequest , encryptedPassword);
  }

  private UserRegisterDTO convertUserRegisterToUserRegisterDTO(UserRegister userRegister) {
    return new UserRegisterDTO(
            userRegister.getUsername(),
            userRegister.getLocation(),
            userRegister.getEmail()
    );
  }
}

