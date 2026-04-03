package csd230.bookstore.controllers;

import csd230.bookstore.entities.PublicationEntity;
import csd230.bookstore.entities.CartEntity;
import csd230.bookstore.entities.ProductEntity;
import csd230.bookstore.repositories.BookRepository;
import csd230.bookstore.repositories.CartRepository;
import csd230.bookstore.repositories.LipstickRepository;
import csd230.bookstore.repositories.MagazineRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rest/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    private final CartRepository cartRepository;
    private final BookRepository bookRepository;
    private final MagazineRepository magazineRepository;
    private final LipstickRepository lipstickRepository;
    private CartEntity cart;

    public CartController(CartRepository cartRepository,
                          BookRepository bookRepository,
                          MagazineRepository magazineRepository,
                          LipstickRepository lipstickRepository) {
        this.cartRepository = cartRepository;
        this.bookRepository = bookRepository;
        this.magazineRepository = magazineRepository;
        this.lipstickRepository = lipstickRepository;

        if (cartRepository.count() == 0) {
            cart = new CartEntity();
            cartRepository.save(cart);
        } else {
            cart = cartRepository.findAll().get(0);
        }
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getCart() {
        Map<String, Object> response = new HashMap<>();
        response.put("products", cart.getProducts());
        response.put("total", cart.getProducts().stream()
                .mapToDouble(p -> {
                    if (p instanceof PublicationEntity) {
                        return ((PublicationEntity) p).getPrice();
                    }
                    return 0.0;
                })
                .sum());
        response.put("count", cart.getProducts().size());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/add/{id}")
    public ResponseEntity<Map<String, Object>> addToCart(@PathVariable Long id, @RequestParam String type) {
        System.out.println("=== ADD TO CART ===");
        System.out.println("Requested ID: " + id);
        System.out.println("Requested Type: " + type);

        ProductEntity product = null;

        switch (type.toLowerCase()) {
            case "book":
                product = bookRepository.findById(id).orElse(null);
                System.out.println("Found book: " + (product != null ? product.getId() : "null"));
                break;
            case "magazine":
                product = magazineRepository.findById(id).orElse(null);
                System.out.println("Found magazine: " + (product != null ? product.getId() : "null"));
                break;
            case "lipstick":
                product = lipstickRepository.findById(id).orElse(null);
                System.out.println("Found lipstick: " + (product != null ? product.getId() : "null"));
                break;
        }

        if (product == null) {
            System.out.println("Product not found!");
            return ResponseEntity.notFound().build();
        }

        // Make sure we have a fresh cart
        cart = cartRepository.findById(cart.getId()).orElse(cart);

        System.out.println("Product to add ID: " + product.getId());
        System.out.println("Current cart product IDs:");
        for (ProductEntity p : cart.getProducts()) {
            System.out.println("  - " + p.getId());
        }

        cart.addProduct(product);
        cartRepository.save(cart);

        System.out.println("Added successfully. New cart size: " + cart.getProducts().size());

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("count", cart.getProducts().size());

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<Map<String, Object>> removeFromCart(@PathVariable Long id) {
        System.out.println("=== REMOVE FROM CART ===");
        System.out.println("Removing product ID: " + id);
        System.out.println("Cart size before: " + cart.getProducts().size());

        cart.removeProduct(id);
        cartRepository.save(cart);

        System.out.println("Cart size after: " + cart.getProducts().size());

        Map<String, Object> response = new HashMap<>();
        response.put("products", cart.getProducts());
        response.put("total", cart.getProducts().stream()
                .mapToDouble(p -> {
                    if (p instanceof PublicationEntity) {
                        return ((PublicationEntity) p).getPrice();
                    }
                    return 0.0;
                })
                .sum());
        response.put("count", cart.getProducts().size());
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Map<String, Object>> clearCart() {
        cart.getProducts().clear();
        cartRepository.save(cart);

        Map<String, Object> response = new HashMap<>();
        response.put("products", cart.getProducts());
        response.put("total", 0.0);
        response.put("count", 0);
        return ResponseEntity.ok(response);
    }
}