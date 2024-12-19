package com.truek.api.services.product;

import com.truek.api.dtos.ProductDTO;
import com.truek.api.request.ProductRequest;

import java.util.List;

public interface IProductService {
  ProductDTO addProduct(ProductRequest productRequest);
  List<ProductDTO> getAllProducts();
  List<ProductDTO> getProductsByCategory(String category);
}
