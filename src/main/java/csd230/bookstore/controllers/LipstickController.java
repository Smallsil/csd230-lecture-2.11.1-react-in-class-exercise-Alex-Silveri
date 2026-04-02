package csd230.bookstore.controllers;

import csd230.bookstore.entities.LipstickEntity;
import csd230.bookstore.repositories.LipstickRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lipsticks")
@CrossOrigin(origins = "http://localhost:5173") // Allow Vite React App
public class LipstickController {

    private final LipstickRepository lipstickRepository;

    public LipstickController(LipstickRepository lipstickRepository) {
        this.lipstickRepository = lipstickRepository;
    }

    // GET all lipsticks
    @GetMapping
    public List<LipstickEntity> getAllLipsticks() {
        return lipstickRepository.findAll();
    }

    // GET single lipstick
    @GetMapping("/{id}")
    public ResponseEntity<LipstickEntity> getLipstickById(@PathVariable Long id) {
        return lipstickRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST create lipstick
    @PostMapping
    public LipstickEntity createLipstick(@RequestBody LipstickEntity lipstick) {
        return lipstickRepository.save(lipstick);
    }

    // PUT update lipstick
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

    // DELETE lipstick
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLipstick(@PathVariable Long id) {
        if (lipstickRepository.existsById(id)) {
            lipstickRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
