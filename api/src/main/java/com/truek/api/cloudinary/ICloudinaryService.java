package com.truek.api.cloudinary;

import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

public interface ICloudinaryService {
  String upload(MultipartFile file);
}
