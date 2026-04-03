package csd230.bookstore.controllers;

import csd230.bookstore.entities.LipstickEntity;
import csd230.bookstore.repositories.LipstickRepository;
import csd230.bookstore.repositories.CartRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rest/lipsticks")
@CrossOrigin(origins = "http://localhost:5173")
public class LipstickController {

    private final LipstickRepository lipstickRepository;
    private final CartRepository cartRepository;

    public LipstickController(LipstickRepository lipstickRepository, CartRepository cartRepository) {
        this.lipstickRepository = lipstickRepository;
        this.cartRepository = cartRepository;
    }

    @GetMapping
    public List<LipstickEntity> getAllLipsticks() {
        return lipstickRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LipstickEntity> getLipstickById(@PathVariable Long id) {
        return lipstickRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<LipstickEntity> createLipstick(@RequestBody LipstickEntity lipstick) {
        try {
            LipstickEntity saved = lipstickRepository.save(lipstick);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<LipstickEntity> updateLipstick(@PathVariable Long id, @RequestBody LipstickEntity lipstickDetails) {
        return lipstickRepository.findById(id).map(lipstick -> {
            lipstick.setTitle(lipstickDetails.getTitle());
            lipstick.setFinishType(lipstickDetails.getFinishType());
            lipstick.setSkinType(lipstickDetails.getSkinType());
            lipstick.setPrice(lipstickDetails.getPrice());
            lipstick.setCopies(lipstickDetails.getCopies());
            return ResponseEntity.ok(lipstickRepository.save(lipstick));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLipstick(@PathVariable Long id) {
        if (lipstickRepository.existsById(id)) {
            cartRepository.findAll().forEach(cart -> {
                cart.removeProduct(id);
                cartRepository.save(cart);
            });
            lipstickRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
