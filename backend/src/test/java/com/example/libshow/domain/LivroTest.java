package com.example.libshow.domain;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class LivroTest {

    @Test
    void deveCriarLivroComAtributosCorretos() {
        Livro livro = new Livro("Dom Casmurro", "Machado de Assis", "978-8544001226", 1899, "Penguin-Companhia", 5, 5);

        assertEquals("Dom Casmurro", livro.getTitulo());
        assertEquals("Machado de Assis", livro.getAutor());
        assertEquals(1899, livro.getAnoPublicacao());
        assertEquals(5, livro.getQuantidadeTotal());
    }

    @Test
    void deveAlterarTituloDoLivro() {
        Livro livro = new Livro("Sem Nome", "Autor", "978-0000000000", 2000, "Editora", 1, 1);
        livro.setTitulo("Memórias Póstumas de Brás Cubas");

        assertEquals("Memórias Póstumas de Brás Cubas", livro.getTitulo());
    }
}