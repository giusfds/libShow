package com.example.libshow.controller;

import com.example.libshow.domain.Emprestimo;
import com.example.libshow.service.EmprestimoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emprestimos")
public class EmprestimoController {

    private static final Logger logger = LoggerFactory.getLogger(EmprestimoController.class);

    @Autowired
    private EmprestimoService emprestimoService;

    @GetMapping
    public List<Emprestimo> getAllEmprestimos() {
        logger.info("[EmprestimoController] Buscando todos os empréstimos");
        try {
            List<Emprestimo> emprestimos = emprestimoService.findAll();
            logger.info("[EmprestimoController] Busca concluída. Total de empréstimos: {}", emprestimos.size());
            return emprestimos;
        } catch (Exception e) {
            logger.error("[EmprestimoController] Erro ao buscar empréstimos", e);
            throw e;
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Emprestimo> getEmprestimoById(@PathVariable Long id) {
        logger.info("[EmprestimoController] Buscando empréstimo por ID: {}", id);
        return emprestimoService.findById(id)
                .map(emprestimo -> {
                    logger.info("[EmprestimoController] Empréstimo encontrado: ID {}", id);
                    return ResponseEntity.ok(emprestimo);
                })
                .orElseGet(() -> {
                    logger.warn("[EmprestimoController] Empréstimo não encontrado: ID {}", id);
                    return ResponseEntity.notFound().build();
                });
    }

    @PostMapping
    public Emprestimo createEmprestimo(@RequestBody Emprestimo emprestimo) {
        return emprestimoService.save(emprestimo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Emprestimo> updateEmprestimo(@PathVariable Long id, @RequestBody Emprestimo emprestimoDetails) {
        return emprestimoService.findById(id)
                .map(emprestimo -> {
                    emprestimo.setUsuario(emprestimoDetails.getUsuario());
                    emprestimo.setLivro(emprestimoDetails.getLivro());
                    emprestimo.setDataEmprestimo(emprestimoDetails.getDataEmprestimo());
                    emprestimo.setDataDevolucaoPrevista(emprestimoDetails.getDataDevolucaoPrevista());
                    emprestimo.setDataDevolucaoReal(emprestimoDetails.getDataDevolucaoReal());
                    return ResponseEntity.ok(emprestimoService.save(emprestimo));
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmprestimo(@PathVariable Long id) {
        return emprestimoService.findById(id)
                .map(emprestimo -> {
                    emprestimoService.deleteById(id);
                    return ResponseEntity.ok().<Void>build();
                }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/emprestar")
    public ResponseEntity<Emprestimo> emprestarLivro(@RequestParam Long usuarioId, @RequestParam Long livroId, @RequestParam int diasEmprestimo) {
        logger.info("[EmprestimoController] Solicitando empréstimo - Usuário ID: {}, Livro ID: {}, Dias: {}", usuarioId, livroId, diasEmprestimo);
        try {
            Emprestimo emprestimo = emprestimoService.emprestarLivro(usuarioId, livroId, diasEmprestimo);
            logger.info("[EmprestimoController] Empréstimo realizado com sucesso. ID: {}", emprestimo.getId());
            return ResponseEntity.ok(emprestimo);
        } catch (RuntimeException e) {
            logger.error("[EmprestimoController] Erro ao realizar empréstimo - Usuário: {}, Livro: {}", usuarioId, livroId, e);
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/devolver/{emprestimoId}")
    public ResponseEntity<Emprestimo> devolverLivro(@PathVariable Long emprestimoId) {
        logger.info("[EmprestimoController] Solicitando devolução de livro - Empréstimo ID: {}", emprestimoId);
        try {
            Emprestimo emprestimo = emprestimoService.devolverLivro(emprestimoId);
            logger.info("[EmprestimoController] Livro devolvido com sucesso. Empréstimo ID: {}", emprestimoId);
            return ResponseEntity.ok(emprestimo);
        } catch (RuntimeException e) {
            logger.error("[EmprestimoController] Erro ao devolver livro. Empréstimo ID: {}", emprestimoId, e);
            return ResponseEntity.badRequest().body(null);
        }
    }
}
