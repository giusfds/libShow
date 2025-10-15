package com.libshow.controller;

import com.libshow.domain.Livro;
import com.libshow.service.LivroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/livros")
public class LivroController {

    @Autowired
    private LivroService livroService;

    @GetMapping
    public List<Livro> getAllLivros() {
        return livroService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Livro> getLivroById(@PathVariable Long id) {
        return livroService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Livro createLivro(@RequestBody Livro livro) {
        return livroService.save(livro);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Livro> updateLivro(@PathVariable Long id, @RequestBody Livro livroDetails) {
        try {
            return ResponseEntity.ok(livroService.updateLivro(id, livroDetails));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLivro(@PathVariable Long id) {
        return livroService.findById(id)
                .map(livro -> {
                    livroService.deleteById(id);
                    return ResponseEntity.ok().<Void>build();
                }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/decrease/{quantity}")
    public ResponseEntity<Livro> decreaseAvailableQuantity(@PathVariable Long id, @PathVariable int quantity) {
        try {
            livroService.decreaseAvailableQuantity(id, quantity);
            return livroService.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/{id}/increase/{quantity}")
    public ResponseEntity<Livro> increaseAvailableQuantity(@PathVariable Long id, @PathVariable int quantity) {
        try {
            livroService.increaseAvailableQuantity(id, quantity);
            return livroService.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}

