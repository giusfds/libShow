package com.libshow.service;

import com.libshow.domain.Livro;
import com.libshow.repository.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LivroService {

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
        Livro livro = livroRepository.findById(id).orElseThrow(() -> new RuntimeException("Livro not found for this id :: " + id));
        livro.setTitulo(livroDetails.getTitulo());
        livro.setAutor(livroDetails.getAutor());
        livro.setIsbn(livroDetails.getIsbn());
        livro.setAnoPublicacao(livroDetails.getAnoPublicacao());
        livro.setEditora(livroDetails.getEditora());
        livro.setQuantidadeTotal(livroDetails.getQuantidadeTotal());
        livro.setQuantidadeDisponivel(livroDetails.getQuantidadeDisponivel());
        return livroRepository.save(livro);
    }

    public void decreaseAvailableQuantity(Long livroId, int quantity) {
        Livro livro = livroRepository.findById(livroId).orElseThrow(() -> new RuntimeException("Livro not found"));
        if (livro.getQuantidadeDisponivel() < quantity) {
            throw new RuntimeException("Not enough books available");
        }
        livro.setQuantidadeDisponivel(livro.getQuantidadeDisponivel() - quantity);
        livroRepository.save(livro);
    }

    public void increaseAvailableQuantity(Long livroId, int quantity) {
        Livro livro = livroRepository.findById(livroId).orElseThrow(() -> new RuntimeException("Livro not found"));
        livro.setQuantidadeDisponivel(livro.getQuantidadeDisponivel() + quantity);
        livroRepository.save(livro);
    }
}

