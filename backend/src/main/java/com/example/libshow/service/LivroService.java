package com.example.libshow.service;

import com.example.libshow.domain.Livro;
import com.example.libshow.repository.LivroRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LivroService {

    private static final Logger logger = LoggerFactory.getLogger(LivroService.class);

    @Autowired
    private LivroRepository livroRepository;

    public List<Livro> findAll() {
        return livroRepository.findAll();
    }

    public Optional<Livro> findById(Long id) {
        return livroRepository.findById(id);
    }

    public Livro save(Livro livro) {
        return livroRepository.save(livro);
    }

    public void deleteById(Long id) {
        livroRepository.deleteById(id);
    }

    public Livro updateLivro(Long id, Livro livroDetails) {
        logger.info("[LivroService] Atualizando livro ID: {}", id);
        Livro livro = livroRepository.findById(id).orElseThrow(() -> {
            logger.error("[LivroService] Livro não encontrado para atualização. ID: {}", id);
            return new RuntimeException("Livro not found for this id :: " + id);
        });
        logger.debug("[LivroService] Dados anteriores - Título: {}, Quantidade: {}", livro.getTitulo(), livro.getQuantidadeDisponivel());
        livro.setTitulo(livroDetails.getTitulo());
        livro.setAutor(livroDetails.getAutor());
        livro.setIsbn(livroDetails.getIsbn());
        livro.setAnoPublicacao(livroDetails.getAnoPublicacao());
        livro.setEditora(livroDetails.getEditora());
        livro.setQuantidadeTotal(livroDetails.getQuantidadeTotal());
        livro.setQuantidadeDisponivel(livroDetails.getQuantidadeDisponivel());
        Livro livroAtualizado = livroRepository.save(livro);
        logger.info("[LivroService] Livro atualizado com sucesso. ID: {}", id);
        return livroAtualizado;
    }

    public void decreaseAvailableQuantity(Long livroId, int quantity) {
        logger.info("[LivroService] Decrementando quantidade disponível. Livro ID: {}, Quantidade: {}", livroId, quantity);
        Livro livro = livroRepository.findById(livroId).orElseThrow(() -> {
            logger.error("[LivroService] Livro não encontrado para decremento. ID: {}", livroId);
            return new RuntimeException("Livro not found");
        });
        logger.debug("[LivroService] Quantidade disponível atual: {}", livro.getQuantidadeDisponivel());
        if (livro.getQuantidadeDisponivel() < quantity) {
            logger.error("[LivroService] Quantidade insuficiente. Disponível: {}, Solicitado: {}", livro.getQuantidadeDisponivel(), quantity);
            throw new RuntimeException("Not enough books available");
        }
        livro.setQuantidadeDisponivel(livro.getQuantidadeDisponivel() - quantity);
        livroRepository.save(livro);
        logger.info("[LivroService] Quantidade decrementada. Nova quantidade: {}", livro.getQuantidadeDisponivel());
    }

    public void increaseAvailableQuantity(Long livroId, int quantity) {
        logger.info("[LivroService] Incrementando quantidade disponível. Livro ID: {}, Quantidade: {}", livroId, quantity);
        Livro livro = livroRepository.findById(livroId).orElseThrow(() -> {
            logger.error("[LivroService] Livro não encontrado para incremento. ID: {}", livroId);
            return new RuntimeException("Livro not found");
        });
        logger.debug("[LivroService] Quantidade disponível atual: {}", livro.getQuantidadeDisponivel());
        livro.setQuantidadeDisponivel(livro.getQuantidadeDisponivel() + quantity);
        livroRepository.save(livro);
        logger.info("[LivroService] Quantidade incrementada. Nova quantidade: {}", livro.getQuantidadeDisponivel());
    }
}
