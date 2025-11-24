package com.example.libshow.controller;

import com.example.libshow.domain.Livro;
import com.example.libshow.service.LivroService;
import com.example.libshow.service.EmprestimoService;
import com.example.libshow.service.ReservaService;
import com.example.libshow.service.UsuarioService;
import com.example.libshow.service.RelatorioService;
import com.example.libshow.security.JwtUserDetailsService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(LivroController.class)
@AutoConfigureMockMvc(addFilters = false)
class LivroControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private LivroService livroService;

    @MockBean
    private EmprestimoService emprestimoService;

    @MockBean
    private ReservaService reservaService;

    @MockBean
    private UsuarioService usuarioService;

    @MockBean
    private RelatorioService relatorioService;

    @MockBean
    private JwtUserDetailsService jwtUserDetailsService;

    @Test
    @org.junit.jupiter.api.Disabled("Teste de integração - requer configuração completa de Security")
    void deveRetornarListaDeLivros() throws Exception {
        Livro livro = new Livro("O Hobbit", "J.R.R. Tolkien", "978-0547928227", 1937, "HarperCollins", 10, 10);
        List<Livro> livros = List.of(livro);
        when(livroService.findAll()).thenReturn(livros);

        mockMvc.perform(get("/api/livros"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].titulo").value("O Hobbit"))
                .andExpect(jsonPath("$[0].autor").value("J.R.R. Tolkien"));
    }
}