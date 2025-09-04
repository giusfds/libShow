package com.example.libshow.model;

import jakarta.persistence.*;
import java.util.List;

enum StatusLivro {
    DISPONIVEL,
    EMPRESTADO,
    RESERVADO
}

@Entity
public class Livro {

    public enum StatusLivro {
        DISPONIVEL,
        EMPRESTADO,
        RESERVADO
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idLivro;

    private String titulo;
    private String autor;
    private int ano;

    @Enumerated(EnumType.STRING)
    private StatusLivro status;

    // Relações
    @ManyToOne
    @JoinColumn(name = "idCategoria")
    private Categoria categoria;

    @OneToMany(mappedBy = "livro")
    private List<Emprestimo> emprestimos;

    @OneToMany(mappedBy = "livro")
    private List<Reserva> reservas;

    // Getters e Setters
    public Long getIdLivro() {
        return idLivro;
    }

    public void setIdLivro(Long idLivro) {
        this.idLivro = idLivro;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public int getAno() {
        return ano;
    }

    public void setAno(int ano) {
        this.ano = ano;
    }

    public StatusLivro getStatus() {
        return status;
    }

    public void setStatus(StatusLivro status) {
        this.status = status;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    // Métodos de negócio
    public boolean emprestarLivro() {
        if (this.status == StatusLivro.DISPONIVEL) {
            this.status = StatusLivro.EMPRESTADO;
            return true;
        }
        return false;
    }

    public boolean devolverLivro() {
        if (this.status == StatusLivro.EMPRESTADO || this.status == StatusLivro.RESERVADO) {
            this.status = StatusLivro.DISPONIVEL;
            return true;
        }
        return false;
    }

    public boolean reservarLivro() {
        if (this.status == StatusLivro.DISPONIVEL) {
            this.status = StatusLivro.RESERVADO;
            return true;
        }
        return false;
    }

    public boolean cancelarReserva() {
        if (this.status == StatusLivro.RESERVADO) {
            this.status = StatusLivro.DISPONIVEL;
            return true;
        }
        return false;
    }

    public boolean isEmprestado() {
        return this.status == StatusLivro.EMPRESTADO;
    }
}