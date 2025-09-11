package com.example.libshow.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

enum Status {
    PENDENTE,
    CONCLUIDA,
    CANCELADA
}


@Getter
@Setter
@Entity
@Table(name = "reservas")
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idReserva;

    private LocalDate dataReserva;

    @Enumerated(EnumType.STRING) // Salva o enum como string no banco
    private Status status;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "livro_id")
    private Livro livro;

    public Reserva() {}

    // Construtores, Getters e Setters
    public Long getIdReserva() {
        return idReserva;
    }

    public void setIdReserva(Long idReserva) {
        this.idReserva = idReserva;
    }

    public LocalDate getDataReserva() {
        return dataReserva;
    }

    public void setDataReserva(LocalDate dataReserva) {
        this.dataReserva = dataReserva;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Livro getLivro() {
        return livro;
    }

    public void setLivro(Livro livro) {
        this.livro = livro;
    }

    // Métodos de Negócio
    public void realizarReserva() {
        this.status = Status.PENDENTE;
        this.dataReserva = LocalDate.now();
    }

    public void cancelarReserva() {
        this.status = Status.CANCELADA;
    }
    
    public boolean validarTempoLimite(int diasLimite) {
        if (this.status == Status.PENDENTE && this.dataReserva != null) {
            return LocalDate.now().isBefore(this.dataReserva.plusDays(diasLimite));
        }
        return false;
    }
}
