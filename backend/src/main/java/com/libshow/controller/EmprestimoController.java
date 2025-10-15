package com.libshow.controller;

import com.libshow.domain.Emprestimo;
import com.libshow.service.EmprestimoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emprestimos")
public class EmprestimoController {

    @Autowired
    private EmprestimoService emprestimoService;

    @GetMapping
    public List<Emprestimo> getAllEmprestimos() {
        return emprestimoService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Emprestimo> getEmprestimoById(@PathVariable Long id) {
        return emprestimoService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
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
        try {
            Emprestimo emprestimo = emprestimoService.emprestarLivro(usuarioId, livroId, diasEmprestimo);
            return ResponseEntity.ok(emprestimo);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/devolver/{emprestimoId}")
    public ResponseEntity<Emprestimo> devolverLivro(@PathVariable Long emprestimoId) {
        try {
            Emprestimo emprestimo = emprestimoService.devolverLivro(emprestimoId);
            return ResponseEntity.ok(emprestimo);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}

