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
    config.put("cloud_name", "ddpyeo0eo");
    config.put("api_key", "328954552365168");
    config.put("api_secret", "Lt3w_i-Cg57OrBoIvuef790VZ3A");
    config.put("secure", true);

    return new Cloudinary(config);
  }
}
