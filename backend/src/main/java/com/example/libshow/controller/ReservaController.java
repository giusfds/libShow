package com.example.libshow.controller;

import com.example.libshow.domain.Reserva;
import com.example.libshow.service.ReservaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservas")
public class ReservaController {

    private static final Logger logger = LoggerFactory.getLogger(ReservaController.class);

    @Autowired
    private ReservaService reservaService;

    @GetMapping
    public List<Reserva> getAllReservas() {
        return reservaService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reserva> getReservaById(@PathVariable Long id) {
        return reservaService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Reserva createReserva(@RequestBody Reserva reserva) {
        return reservaService.save(reserva);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Reserva> updateReserva(@PathVariable Long id, @RequestBody Reserva reservaDetails) {
        return reservaService.findById(id)
                .map(reserva -> {
                    reserva.setUsuario(reservaDetails.getUsuario());
                    reserva.setLivro(reservaDetails.getLivro());
                    reserva.setDataReserva(reservaDetails.getDataReserva());
                    reserva.setDataExpiracao(reservaDetails.getDataExpiracao());
                    reserva.setStatus(reservaDetails.getStatus());
                    return ResponseEntity.ok(reservaService.save(reserva));
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReserva(@PathVariable Long id) {
        return reservaService.findById(id)
                .map(reserva -> {
                    reservaService.deleteById(id);
                    return ResponseEntity.ok().<Void>build();
                }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/fazerReserva")
    public ResponseEntity<Reserva> fazerReserva(@RequestParam Long usuarioId, @RequestParam Long livroId, @RequestParam int diasReserva) {
        logger.info("[ReservaController] Solicitando reserva - Usuário ID: {}, Livro ID: {}, Dias: {}", usuarioId, livroId, diasReserva);
        try {
            Reserva reserva = reservaService.fazerReserva(usuarioId, livroId, diasReserva);
            logger.info("[ReservaController] Reserva realizada com sucesso. ID: {}", reserva.getId());
            return ResponseEntity.ok(reserva);
        } catch (RuntimeException e) {
            logger.error("[ReservaController] Erro ao fazer reserva - Usuário: {}, Livro: {}", usuarioId, livroId, e);
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/cancelarReserva/{reservaId}")
    public ResponseEntity<Reserva> cancelarReserva(@PathVariable Long reservaId) {
        logger.info("[ReservaController] Solicitando cancelamento de reserva. ID: {}", reservaId);
        try {
            Reserva reserva = reservaService.cancelarReserva(reservaId);
            logger.info("[ReservaController] Reserva cancelada com sucesso. ID: {}", reservaId);
            return ResponseEntity.ok(reserva);
        } catch (RuntimeException e) {
            logger.error("[ReservaController] Erro ao cancelar reserva. ID: {}", reservaId, e);
            return ResponseEntity.badRequest().body(null);
        }
    }
}
