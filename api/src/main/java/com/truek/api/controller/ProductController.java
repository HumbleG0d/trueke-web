package com.truek.api.controller;

import com.truek.api.dtos.ProductDTO;
import com.truek.api.request.ProductRequest;
import com.truek.api.response.ApiResponse;
import com.truek.api.services.product.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ProductController {
  private final ProductService productService;

  @PostMapping(value = "add/product" , consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<ApiResponse<ProductDTO>> addProduct(@ModelAttribute ProductRequest productRequest) {
    try {
      ProductDTO productDTO = productService.addProduct(productRequest);
      return ResponseEntity.ok(new ApiResponse<>("producto añadido", productDTO));
    }catch (Exception e){
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>(e.getMessage(), null));
    }
  }
}
