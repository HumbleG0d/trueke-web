package com.truek.api.respository;

import com.truek.api.entity.Category;
import com.truek.api.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
  List<Product> findByCategory(Category category);
}
