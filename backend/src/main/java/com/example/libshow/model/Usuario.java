package com.example.libshow.model;

import jakarta.persistence.*;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUsuario;

    private String nome;
    private String matricula;
    private String tipo;

    // Relacionamentos
    @OneToMany(mappedBy = "usuario")
    private List<Emprestimo> emprestimos;

    @OneToMany(mappedBy = "usuario")
    private List<Reserva> reservas;

}
