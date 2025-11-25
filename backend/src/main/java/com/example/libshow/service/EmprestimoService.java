package com.example.libshow.service;

import com.example.libshow.domain.Emprestimo;
import com.example.libshow.domain.Livro;
import com.example.libshow.domain.Usuario;
import com.example.libshow.repository.EmprestimoRepository;
import com.example.libshow.repository.LivroRepository;
import com.example.libshow.repository.UsuarioRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class EmprestimoService {

    private static final Logger logger = LoggerFactory.getLogger(EmprestimoService.class);

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
        logger.info("[EmprestimoService] Iniciando empréstimo - Usuário ID: {}, Livro ID: {}, Dias: {}", usuarioId, livroId, diasEmprestimo);

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> {
                    logger.error("[EmprestimoService] Usuário não encontrado. ID: {}", usuarioId);
                    return new RuntimeException("Usuário não encontrado");
                });
        logger.debug("[EmprestimoService] Usuário encontrado: {}", usuario.getNome());

        Livro livro = livroService.findById(livroId)
                .orElseThrow(() -> {
                    logger.error("[EmprestimoService] Livro não encontrado. ID: {}", livroId);
                    return new RuntimeException("Livro não encontrado");
                });
        logger.debug("[EmprestimoService] Livro encontrado: {} - Quantidade disponível: {}", livro.getTitulo(), livro.getQuantidadeDisponivel());

        if (livro.getQuantidadeDisponivel() <= 0) {
            logger.error("[EmprestimoService] Livro indisponível para empréstimo. ID: {}, Título: {}", livroId, livro.getTitulo());
            throw new RuntimeException("Livro não disponível para empréstimo");
        }

        livroService.decreaseAvailableQuantity(livroId, 1);

        LocalDate dataEmprestimo = LocalDate.now();
        LocalDate dataDevolucaoPrevista = dataEmprestimo.plusDays(diasEmprestimo);
        logger.debug("[EmprestimoService] Data empréstimo: {}, Data devolução prevista: {}", dataEmprestimo, dataDevolucaoPrevista);

        Emprestimo emprestimo = new Emprestimo(usuario, livro, dataEmprestimo, dataDevolucaoPrevista);
        Emprestimo emprestimoSalvo = emprestimoRepository.save(emprestimo);
        logger.info("[EmprestimoService] Empréstimo criado com sucesso. ID: {}", emprestimoSalvo.getId());
        return emprestimoSalvo;
    }

    public Emprestimo devolverLivro(Long emprestimoId) {
        logger.info("[EmprestimoService] Processando devolução. Empréstimo ID: {}", emprestimoId);

        Emprestimo emprestimo = emprestimoRepository.findById(emprestimoId)
                .orElseThrow(() -> {
                    logger.error("[EmprestimoService] Empréstimo não encontrado. ID: {}", emprestimoId);
                    return new RuntimeException("Empréstimo não encontrado");
                });

        logger.debug("[EmprestimoService] Empréstimo encontrado - Livro: {}, Usuário: {}",
                emprestimo.getLivro().getTitulo(), emprestimo.getUsuario().getNome());

        if (emprestimo.getDataDevolucaoReal() != null) {
            logger.warn("[EmprestimoService] Tentativa de devolver livro já devolvido. Empréstimo ID: {}", emprestimoId);
            throw new RuntimeException("Livro já devolvido");
        }

        emprestimo.setDataDevolucaoReal(LocalDate.now());
        logger.debug("[EmprestimoService] Data de devolução real: {}", emprestimo.getDataDevolucaoReal());

        livroService.increaseAvailableQuantity(emprestimo.getLivro().getId(), 1);

        Emprestimo emprestimoAtualizado = emprestimoRepository.save(emprestimo);
        logger.info("[EmprestimoService] Devolução processada com sucesso. Empréstimo ID: {}", emprestimoId);
        return emprestimoAtualizado;
    }
}
