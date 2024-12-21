package com.truek.api.cloudinary;

import com.cloudinary.Cloudinary;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
@RequiredArgsConstructor
public class CloudinaryConfig {

  @Bean
  public Cloudinary cloudinary() {
    Map config = new HashMap();
    config.put("cloud_name", "");
    config.put("api_key", "");
    config.put("api_secret", "");
    config.put("secure", true);

    return new Cloudinary(config);
  }
}
