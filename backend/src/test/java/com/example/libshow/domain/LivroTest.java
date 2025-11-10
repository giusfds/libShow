package com.example.libshow.domain;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class LivroTest {

    @Test
    void deveCriarLivroComAtributosCorretos() {
        Livro livro = new Livro("Dom Casmurro", "Machado de Assis", 1899);

        assertEquals("Dom Casmurro", livro.getTitulo());
        assertEquals("Machado de Assis", livro.getAutor());
        assertEquals(1899, livro.getAnoPublicacao());
    }

    @Test
    void deveAlterarTituloDoLivro() {
        Livro livro = new Livro("Sem Nome", "Autor", 2000);
        livro.setTitulo("Memórias Póstumas de Brás Cubas");

        assertEquals("Memórias Póstumas de Brás Cubas", livro.getTitulo());
    }
}