package com.truek.api.respository;

import com.truek.api.entity.Categories;
import com.truek.api.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
  Optional<Category> findByCategories(Categories categories);
}
