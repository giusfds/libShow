package com.example.libshow.service;

import com.example.libshow.domain.Livro;
import com.example.libshow.repository.LivroRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class LivroServiceTest {

    @Test
    void deveRetornarLivroQuandoEncontradoPorId() {
        LivroRepository repo = Mockito.mock(LivroRepository.class);
        LivroService service = new LivroService(repo);

        Livro livro = new Livro("1984", "George Orwell", 1949);
        when(repo.findById(1L)).thenReturn(Optional.of(livro));

        Optional<Livro> resultado = service.buscarPorId(1L);

        assertTrue(resultado.isPresent());
        assertEquals("1984", resultado.get().getTitulo());
    }

    @Test
    void deveRetornarVazioQuandoLivroNaoEncontrado() {
        LivroRepository repo = Mockito.mock(LivroRepository.class);
        LivroService service = new LivroService(repo);

        when(repo.findById(999L)).thenReturn(Optional.empty());

        Optional<Livro> resultado = service.buscarPorId(999L);
        assertFalse(resultado.isPresent());
    }
}