package com.example.libshow.controller;

import com.example.libshow.domain.Livro;
import com.example.libshow.service.LivroService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/livros")
public class LivroController {

    private static final Logger logger = LoggerFactory.getLogger(LivroController.class);

    @Autowired
    private LivroService livroService;

    @GetMapping
    public List<Livro> getAllLivros() {
        logger.info("[LivroController] Iniciando busca de todos os livros");
        try {
            List<Livro> livros = livroService.findAll();
            logger.info("[LivroController] Busca concluída com sucesso. Total de livros: {}", livros.size());
            return livros;
        } catch (Exception e) {
            logger.error("[LivroController] Erro ao buscar todos os livros", e);
            throw e;
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Livro> getLivroById(@PathVariable Long id) {
        logger.info("[LivroController] Buscando livro por ID: {}", id);
        try {
            return livroService.findById(id)
                    .map(livro -> {
                        logger.info("[LivroController] Livro encontrado: {} (ID: {})", livro.getTitulo(), id);
                        return ResponseEntity.ok(livro);
                    })
                    .orElseGet(() -> {
                        logger.warn("[LivroController] Livro não encontrado com ID: {}", id);
                        return ResponseEntity.notFound().build();
                    });
        } catch (Exception e) {
            logger.error("[LivroController] Erro ao buscar livro por ID: {}", id, e);
            throw e;
        }
    }

    @PostMapping
    public Livro createLivro(@RequestBody Livro livro) {
        logger.info("[LivroController] Criando novo livro: {}", livro.getTitulo());
        try {
            Livro novoLivro = livroService.save(livro);
            logger.info("[LivroController] Livro criado com sucesso. ID: {}, Título: {}", novoLivro.getId(), novoLivro.getTitulo());
            return novoLivro;
        } catch (Exception e) {
            logger.error("[LivroController] Erro ao criar livro: {}", livro.getTitulo(), e);
            throw e;
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Livro> updateLivro(@PathVariable Long id, @RequestBody Livro livroDetails) {
        logger.info("[LivroController] Atualizando livro ID: {} com título: {}", id, livroDetails.getTitulo());
        try {
            Livro livroAtualizado = livroService.updateLivro(id, livroDetails);
            logger.info("[LivroController] Livro atualizado com sucesso. ID: {}", id);
            return ResponseEntity.ok(livroAtualizado);
        } catch (RuntimeException e) {
            logger.error("[LivroController] Erro ao atualizar livro ID: {}", id, e);
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLivro(@PathVariable Long id) {
        logger.info("[LivroController] Deletando livro ID: {}", id);
        return livroService.findById(id)
                .map(livro -> {
                    logger.info("[LivroController] Livro encontrado para exclusão: {} (ID: {})", livro.getTitulo(), id);
                    livroService.deleteById(id);
                    logger.info("[LivroController] Livro deletado com sucesso. ID: {}", id);
                    return ResponseEntity.ok().<Void>build();
                }).orElseGet(() -> {
                    logger.warn("[LivroController] Tentativa de deletar livro inexistente. ID: {}", id);
                    return ResponseEntity.notFound().build();
                });
    }

    @PostMapping("/{id}/decrease/{quantity}")
    public ResponseEntity<Livro> decreaseAvailableQuantity(@PathVariable Long id, @PathVariable int quantity) {
        logger.info("[LivroController] Decrementando quantidade disponível do livro ID: {} em {} unidade(s)", id, quantity);
        try {
            livroService.decreaseAvailableQuantity(id, quantity);
            logger.info("[LivroController] Quantidade decrementada com sucesso para livro ID: {}", id);
            return livroService.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
        } catch (RuntimeException e) {
            logger.error("[LivroController] Erro ao decrementar quantidade do livro ID: {}", id, e);
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/{id}/increase/{quantity}")
    public ResponseEntity<Livro> increaseAvailableQuantity(@PathVariable Long id, @PathVariable int quantity) {
        logger.info("[LivroController] Incrementando quantidade disponível do livro ID: {} em {} unidade(s)", id, quantity);
        try {
            livroService.increaseAvailableQuantity(id, quantity);
            logger.info("[LivroController] Quantidade incrementada com sucesso para livro ID: {}", id);
            return livroService.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
        } catch (RuntimeException e) {
            logger.error("[LivroController] Erro ao incrementar quantidade do livro ID: {}", id, e);
            return ResponseEntity.badRequest().body(null);
        }
    }
}
