package com.truek.api.respository;

import com.truek.api.entity.Categories;
import com.truek.api.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
  Optional<Category> findByCategories(Categories categories);
}
