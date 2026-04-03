package csd230.bookstore.controllers;

import csd230.bookstore.entities.MagazineEntity;
import csd230.bookstore.repositories.MagazineRepository;
import csd230.bookstore.repositories.CartRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rest/magazines")
@CrossOrigin(origins = "http://localhost:5173")
public class MagazineController {

    private final MagazineRepository magazineRepository;
    private final CartRepository cartRepository;

    public MagazineController(MagazineRepository magazineRepository, CartRepository cartRepository) {
        this.magazineRepository = magazineRepository;
        this.cartRepository = cartRepository;
    }

    @GetMapping
    public List<MagazineEntity> getAllMagazines() {
        return magazineRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MagazineEntity> getMagazineById(@PathVariable Long id) {
        return magazineRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<MagazineEntity> createMagazine(@RequestBody MagazineEntity magazine) {
        try {
            MagazineEntity saved = magazineRepository.save(magazine);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<MagazineEntity> updateMagazine(@PathVariable Long id, @RequestBody MagazineEntity magazineDetails) {
        return magazineRepository.findById(id).map(magazine -> {
            magazine.setTitle(magazineDetails.getTitle());
            magazine.setPrice(magazineDetails.getPrice());
            magazine.setCopies(magazineDetails.getCopies());
            magazine.setOrderQty(magazineDetails.getOrderQty());
            magazine.setCurrentIssue(magazineDetails.getCurrentIssue());
            return ResponseEntity.ok(magazineRepository.save(magazine));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMagazine(@PathVariable Long id) {
        if (magazineRepository.existsById(id)) {
            cartRepository.findAll().forEach(cart -> {
                cart.removeProduct(id);
                cartRepository.save(cart);
            });
            magazineRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}