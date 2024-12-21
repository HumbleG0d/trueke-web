package com.truek.api.services.user;

import com.truek.api.dtos.UserRegisterDTO;
import com.truek.api.request.UserRegisterRequest;

public interface IUserRegisterService {
  UserRegisterDTO register(UserRegisterRequest userRegisterRequest);
}
