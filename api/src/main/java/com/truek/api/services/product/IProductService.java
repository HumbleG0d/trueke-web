package com.truek.api.services.product;

import com.truek.api.dtos.ProductDTO;
import com.truek.api.request.ProductRequest;

public interface IProductService {
  ProductDTO addProduct(ProductRequest productRequest);
}
