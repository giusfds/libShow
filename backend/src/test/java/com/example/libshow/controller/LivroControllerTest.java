package com.example.libshow.controller;

import com.example.libshow.domain.Livro;
import com.example.libshow.service.LivroService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(LivroController.class)
class LivroControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private LivroService livroService;

    @Test
    void deveRetornarListaDeLivros() throws Exception {
        List<Livro> livros = List.of(new Livro("O Hobbit", "J.R.R. Tolkien", 1937));
        when(livroService.listarTodos()).thenReturn(livros);

        mockMvc.perform(get("/livros"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].titulo").value("O Hobbit"))
                .andExpect(jsonPath("$[0].autor").value("J.R.R. Tolkien"));
    }
}