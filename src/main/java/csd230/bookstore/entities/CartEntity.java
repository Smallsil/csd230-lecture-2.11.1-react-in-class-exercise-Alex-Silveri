package csd230.bookstore.entities;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

@Entity
@Table(name = "carts")
public class CartEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
    @JoinTable(name = "cart_products",
            uniqueConstraints = {})  // Empty array - NO unique constraint
    private Set<ProductEntity> products = new HashSet<>();

    public CartEntity() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Set<ProductEntity> getProducts() { return products; }
    public void setProducts(Set<ProductEntity> products) { this.products = products; }

    public void addProduct(ProductEntity product) {
        this.products.add(product);
    }

    public void removeProduct(Long productId) {
        this.products.removeIf(p -> Objects.equals(p.getId(), productId));
    }
}