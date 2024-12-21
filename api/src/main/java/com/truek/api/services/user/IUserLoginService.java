package com.truek.api.services.user;

import com.truek.api.dtos.UserLoginDTO;
import com.truek.api.request.UserLoginRequest;

public interface IUserLoginService {
  UserLoginDTO login(UserLoginRequest userLogin);
}
