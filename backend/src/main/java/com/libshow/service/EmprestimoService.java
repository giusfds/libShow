package com.libshow.service;

import com.libshow.domain.Emprestimo;
import com.libshow.domain.Livro;
import com.libshow.domain.Usuario;
import com.libshow.repository.EmprestimoRepository;
import com.libshow.repository.LivroRepository;
import com.libshow.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class EmprestimoService {

    @Autowired
    private EmprestimoRepository emprestimoRepository;
    @Autowired
    private LivroService livroService;
    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Emprestimo> findAll() {
        return emprestimoRepository.findAll();
    }

    public Optional<Emprestimo> findById(Long id) {
        return emprestimoRepository.findById(id);
    }

    public Emprestimo save(Emprestimo emprestimo) {
        return emprestimoRepository.save(emprestimo);
    }

    public void deleteById(Long id) {
        emprestimoRepository.deleteById(id);
    }

    public Emprestimo emprestarLivro(Long usuarioId, Long livroId, int diasEmprestimo) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        Livro livro = livroService.findById(livroId)
                .orElseThrow(() -> new RuntimeException("Livro não encontrado"));

        if (livro.getQuantidadeDisponivel() <= 0) {
            throw new RuntimeException("Livro não disponível para empréstimo");
        }

        livroService.decreaseAvailableQuantity(livroId, 1);

        LocalDate dataEmprestimo = LocalDate.now();
        LocalDate dataDevolucaoPrevista = dataEmprestimo.plusDays(diasEmprestimo);

        Emprestimo emprestimo = new Emprestimo(usuario, livro, dataEmprestimo, dataDevolucaoPrevista);
        return emprestimoRepository.save(emprestimo);
    }

    public Emprestimo devolverLivro(Long emprestimoId) {
        Emprestimo emprestimo = emprestimoRepository.findById(emprestimoId)
                .orElseThrow(() -> new RuntimeException("Empréstimo não encontrado"));

        if (emprestimo.getDataDevolucaoReal() != null) {
            throw new RuntimeException("Livro já devolvido");
        }

        emprestimo.setDataDevolucaoReal(LocalDate.now());
        livroService.increaseAvailableQuantity(emprestimo.getLivro().getId(), 1);

        return emprestimoRepository.save(emprestimo);
    }
}

