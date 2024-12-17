package com.truek.api.cloudinary;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class CloudinaryService implements ICloudinaryService{

  private final Cloudinary cloudinary;

  @Override
  public String upload(MultipartFile file) {
    try {
      var uploadResult = this.cloudinary.uploader().upload(file.getBytes() , ObjectUtils.emptyMap());
      return (String) uploadResult.get("url");
    }catch (IOException e){
      throw new RuntimeException(e);
    }
  }
}