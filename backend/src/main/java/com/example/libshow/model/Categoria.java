package com.example.libshow.model;

import jakarta.persistence.*;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCategoria;

    private String nome;
    private String descricao;

    // Relações
    @OneToMany(mappedBy = "categoria")
    private List<Livro> livros;
}
