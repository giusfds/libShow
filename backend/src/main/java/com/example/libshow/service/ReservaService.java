package com.example.libshow.service;

import com.example.libshow.domain.Livro;
import com.example.libshow.domain.Reserva;
import com.example.libshow.domain.Usuario;
import com.example.libshow.repository.LivroRepository;
import com.example.libshow.repository.ReservaRepository;
import com.example.libshow.repository.UsuarioRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {

    private static final Logger logger = LoggerFactory.getLogger(ReservaService.class);

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
        logger.info("[ReservaService] Iniciando reserva - Usuário ID: {}, Livro ID: {}, Dias: {}", usuarioId, livroId, diasReserva);

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> {
                    logger.error("[ReservaService] Usuário não encontrado. ID: {}", usuarioId);
                    return new RuntimeException("Usuário não encontrado");
                });
        logger.debug("[ReservaService] Usuário encontrado: {}", usuario.getNome());

        Livro livro = livroService.findById(livroId)
                .orElseThrow(() -> {
                    logger.error("[ReservaService] Livro não encontrado. ID: {}", livroId);
                    return new RuntimeException("Livro não encontrado");
                });
        logger.debug("[ReservaService] Livro encontrado: {} - Quantidade disponível: {}", livro.getTitulo(), livro.getQuantidadeDisponivel());

        // Check if there are available books or if there's an existing reservation for this user and book
        if (livro.getQuantidadeDisponivel() > 0) {
            logger.warn("[ReservaService] Livro disponível para empréstimo. Reserva não necessária. Livro ID: {}", livroId);
            throw new RuntimeException("Livro disponível para empréstimo, não é necessário reservar.");
        }

        // Check if the user already has an active reservation for this book
        logger.debug("[ReservaService] Verificando reservas ativas para este usuário e livro");
        boolean hasActiveReservation = reservaRepository.findAll().stream()
                .anyMatch(r -> r.getUsuario().getId().equals(usuarioId) &&
                        r.getLivro().getId().equals(livroId) &&
                        "ATIVA".equals(r.getStatus()));

        if (hasActiveReservation) {
            logger.warn("[ReservaService] Usuário já possui reserva ativa. Usuário ID: {}, Livro ID: {}", usuarioId, livroId);
            throw new RuntimeException("Usuário já possui uma reserva ativa para este livro.");
        }

        LocalDate dataReserva = LocalDate.now();
        LocalDate dataExpiracao = dataReserva.plusDays(diasReserva);
        logger.debug("[ReservaService] Data reserva: {}, Data expiração: {}", dataReserva, dataExpiracao);

        Reserva reserva = new Reserva(usuario, livro, dataReserva, dataExpiracao, "ATIVA");
        Reserva reservaSalva = reservaRepository.save(reserva);
        logger.info("[ReservaService] Reserva criada com sucesso. ID: {}", reservaSalva.getId());
        return reservaSalva;
    }

    public Reserva cancelarReserva(Long reservaId) {
        logger.info("[ReservaService] Cancelando reserva. ID: {}", reservaId);

        Reserva reserva = reservaRepository.findById(reservaId)
                .orElseThrow(() -> {
                    logger.error("[ReservaService] Reserva não encontrada. ID: {}", reservaId);
                    return new RuntimeException("Reserva não encontrada");
                });

        logger.debug("[ReservaService] Reserva encontrada - Status: {}, Livro: {}", reserva.getStatus(), reserva.getLivro().getTitulo());

        if (!"ATIVA".equals(reserva.getStatus())) {
            logger.warn("[ReservaService] Tentativa de cancelar reserva não ativa. Reserva ID: {}, Status: {}", reservaId, reserva.getStatus());
            throw new RuntimeException("Reserva não está ativa para cancelamento.");
        }

        reserva.setStatus("CANCELADA");
        Reserva reservaAtualizada = reservaRepository.save(reserva);
        logger.info("[ReservaService] Reserva cancelada com sucesso. ID: {}", reservaId);
        return reservaAtualizada;
    }
}
