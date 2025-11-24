package com.example.libshow.service;

import com.example.libshow.domain.Livro;
import com.example.libshow.repository.LivroRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class LivroServiceTest {

    @Mock
    private LivroRepository livroRepository;

    @InjectMocks
    private LivroService livroService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void deveRetornarLivroQuandoEncontradoPorId() {
        Livro livro = new Livro("1984", "George Orwell", "978-0451524935", 1949, "Signet Classic", 3, 3);
        when(livroRepository.findById(1L)).thenReturn(Optional.of(livro));

        Optional<Livro> resultado = livroService.findById(1L);

        assertTrue(resultado.isPresent());
        assertEquals("1984", resultado.get().getTitulo());
    }

    @Test
    void deveRetornarVazioQuandoLivroNaoEncontrado() {
        when(livroRepository.findById(999L)).thenReturn(Optional.empty());

        Optional<Livro> resultado = livroService.findById(999L);
        assertFalse(resultado.isPresent());
    }
}