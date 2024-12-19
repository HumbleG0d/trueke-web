package com.truek.api.services.product;

import com.truek.api.cloudinary.CloudinaryService;
import com.truek.api.dtos.ProductDTO;
import com.truek.api.entity.Categories;
import com.truek.api.entity.Category;
import com.truek.api.entity.Product;
import com.truek.api.entity.UserLogin;
import com.truek.api.request.ProductRequest;
import com.truek.api.respository.CategoryRepository;
import com.truek.api.respository.ProductRepository;
import com.truek.api.respository.UserLoginRepository;
import com.truek.api.respository.UserRegisterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService implements IProductService {
  private final ProductRepository productRepository;
  private final CloudinaryService cloudinaryService;
  private final UserRegisterRepository userRegisterRepository;
  private final UserLoginRepository userLoginRepository;
  private final CategoryRepository categoryRepository;

  @Override
  public ProductDTO addProduct(ProductRequest productRequest) {
    String imageUrl = cloudinaryService.upload(productRequest.image());
    var email = getEmail();
    UserLogin user = userLoginRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    var product = productRepository.save(createProduct(productRequest , user , imageUrl));
    var user_name =userRegisterRepository.findByEmail(email).getUsername();
    return toProductDTO(product , user_name );
  }

  private String getEmail(){
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    return authentication.getName();
  }


  private Product createProduct(ProductRequest productRequest, UserLogin user, String imageUrl) {
    // Buscar categoría existente por nombre o ID
    Category category = categoryRepository.findByCategories(productRequest.categories())
            .orElseGet(() -> {
              // Si no existe, crear una nueva
              Category newCategory = new Category();
              newCategory.setCategories(productRequest.categories());
              return categoryRepository.save(newCategory); // Guardar y retornar la nueva categoría
            });

    // Crear el producto
    var product = new Product(productRequest, user, imageUrl);
    product.setCategory(category); // Asocia la categoría al producto

    return product;
  }

  private ProductDTO toProductDTO(Product product , String user) {
    return new ProductDTO(
      product.getId(),
            product.getImageUrl(),
            product.getName(),
            product.getStatus(),
            user
    );
  }

  @Override
  public List<ProductDTO> getAllProducts() {
    return productRepository.findAll().stream().map(product -> toProductDTO(product , userRegisterRepository.findByEmail(product.getUser().getEmail()).getUsername())).collect(Collectors.toList());
  }

  @Override
  public List<ProductDTO> getProductsByCategory(String category) {
    var category_name = categoryRepository.findByCategories(Categories.valueOf(category));
    return productRepository.findByCategory(category_name.get()).stream().map(product -> toProductDTO(product , userRegisterRepository.findByEmail(product.getUser().getEmail()).getUsername())).collect(Collectors.toList());
  }


}
