package com.libshow.service;

import com.libshow.domain.Livro;
import com.libshow.domain.Reserva;
import com.libshow.domain.Usuario;
import com.libshow.repository.LivroRepository;
import com.libshow.repository.ReservaRepository;
import com.libshow.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;
    @Autowired
    private LivroService livroService;
    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Reserva> findAll() {
        return reservaRepository.findAll();
    }

    public Optional<Reserva> findById(Long id) {
        return reservaRepository.findById(id);
    }

    public Reserva save(Reserva reserva) {
        return reservaRepository.save(reserva);
    }

    public void deleteById(Long id) {
        reservaRepository.deleteById(id);
    }

    public Reserva fazerReserva(Long usuarioId, Long livroId, int diasReserva) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        Livro livro = livroService.findById(livroId)
                .orElseThrow(() -> new RuntimeException("Livro não encontrado"));

        // Check if there are available books or if there's an existing reservation for this user and book
        if (livro.getQuantidadeDisponivel() > 0) {
            throw new RuntimeException("Livro disponível para empréstimo, não é necessário reservar.");
        }

        // Check if the user already has an active reservation for this book
        boolean hasActiveReservation = reservaRepository.findAll().stream()
                .anyMatch(r -> r.getUsuario().getId().equals(usuarioId) &&
                        r.getLivro().getId().equals(livroId) &&
                        "ATIVA".equals(r.getStatus()));

        if (hasActiveReservation) {
            throw new RuntimeException("Usuário já possui uma reserva ativa para este livro.");
        }

        LocalDate dataReserva = LocalDate.now();
        LocalDate dataExpiracao = dataReserva.plusDays(diasReserva);

        Reserva reserva = new Reserva(usuario, livro, dataReserva, dataExpiracao, "ATIVA");
        return reservaRepository.save(reserva);
    }

    public Reserva cancelarReserva(Long reservaId) {
        Reserva reserva = reservaRepository.findById(reservaId)
                .orElseThrow(() -> new RuntimeException("Reserva não encontrada"));

        if (!"ATIVA".equals(reserva.getStatus())) {
            throw new RuntimeException("Reserva não está ativa para cancelamento.");
        }

        reserva.setStatus("CANCELADA");
        return reservaRepository.save(reserva);
    }
}

