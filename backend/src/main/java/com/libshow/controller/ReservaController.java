package com.libshow.controller;

import com.libshow.domain.Reserva;
import com.libshow.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservas")
public class ReservaController {

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
        try {
            Reserva reserva = reservaService.fazerReserva(usuarioId, livroId, diasReserva);
            return ResponseEntity.ok(reserva);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/cancelarReserva/{reservaId}")
    public ResponseEntity<Reserva> cancelarReserva(@PathVariable Long reservaId) {
        try {
            Reserva reserva = reservaService.cancelarReserva(reservaId);
            return ResponseEntity.ok(reserva);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}

