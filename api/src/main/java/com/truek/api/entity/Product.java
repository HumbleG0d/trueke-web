package com.truek.api.entity;

import com.truek.api.request.ProductRequest;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "products")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Product {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @NotNull
  private String imageUrl;

  @NotNull
  private String name;

  @Enumerated(EnumType.STRING)
  private Status status;

  @ManyToOne
  @JoinColumn(name = "user_id" , nullable = false)
  private UserLogin user;

  @ManyToOne
  @JoinColumn(name = "category_id" , nullable = false)
  private Category category;

  private String description;

  public Product(ProductRequest productRequest , UserLogin user , String imageUrl) {
    this.imageUrl = imageUrl;
    this.user = user;
    this.name = productRequest.name();
    this.status = productRequest.status();
    this.description = productRequest.description();
  }
}
