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

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/rest/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    private final CartRepository cartRepository;
    private final BookRepository bookRepository;
    private final MagazineRepository magazineRepository;
    private final LipstickRepository lipstickRepository;

    // Using a simple in-memory cart for demo (single cart for all users)
    private CartEntity cart;

    public CartController(CartRepository cartRepository,
                          BookRepository bookRepository,
                          MagazineRepository magazineRepository,
                          LipstickRepository lipstickRepository) {
        this.cartRepository = cartRepository;
        this.bookRepository = bookRepository;
        this.magazineRepository = magazineRepository;
        this.lipstickRepository = lipstickRepository;

        // Initialize or load existing cart
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
    public ResponseEntity<CartEntity> addToCart(@PathVariable Long id, @RequestParam String type) {
        ProductEntity product = null;

        switch (type.toLowerCase()) {
            case "book":
                product = bookRepository.findById(id).orElse(null);
                break;
            case "magazine":
                product = magazineRepository.findById(id).orElse(null);
                break;
            case "lipstick":
                product = lipstickRepository.findById(id).orElse(null);
                break;
        }

        if (product != null) {
            cart.addProduct(product);
            cartRepository.save(cart);
            return ResponseEntity.ok(cart);
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<CartEntity> removeFromCart(@PathVariable Long id) {
        cart.removeProduct(id);
        cartRepository.save(cart);
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart() {
        cart.getProducts().clear();
        cartRepository.save(cart);
        return ResponseEntity.ok().build();
    }
}