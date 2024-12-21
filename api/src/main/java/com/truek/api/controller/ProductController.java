package com.truek.api.controller;

import com.truek.api.dtos.ProductDTO;
import com.truek.api.entity.Categories;
import com.truek.api.request.ProductRequest;
import com.truek.api.response.ApiResponse;
import com.truek.api.services.product.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

  @GetMapping("/all/products")
  public ResponseEntity<ApiResponse<List<ProductDTO>>> getAllProducts() {
    try {
      var products = productService.getAllProducts();
      return ResponseEntity.ok(new ApiResponse<>("Productos mostrados", products));
    }catch (Exception e){
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>(null, null));
    }
  }

  @GetMapping("/all/products/by-category")
  public ResponseEntity<ApiResponse<List<ProductDTO>>> getAllProductsByCategory(@RequestParam String category) {
    try {
      var products = productService.getProductsByCategory(category.toUpperCase());
      return ResponseEntity.ok(new ApiResponse<>("Productos mostrados", products));
    }catch (Exception e){
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>(null, null));
    }
  }

}
