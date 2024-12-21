package com.truek.api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "categories")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Category {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Enumerated(EnumType.STRING)
  private Categories categories;

  @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
  private List<Product> productList;

  public Category(Categories categories) {
    this.categories = categories;
  }
}
