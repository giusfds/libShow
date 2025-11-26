package com.example.libshow.controller;

import com.example.libshow.domain.Reservation;
import com.example.libshow.service.ReservationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/reservations")
public class ReservationController {

	private static final Logger logger = LoggerFactory.getLogger(ReservationController.class);

	@Autowired
	private ReservationService reservationService;

	@GetMapping
	public List<Reservation> getAllReservations() {
		logger.info("[ReservationController] Fetching all reservations");
		return reservationService.findAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Reservation> getReservationById(@PathVariable Long id) {
		logger.info("[ReservationController] Fetching reservation: {}", id);
		return ResponseEntity.ok(reservationService.findById(id));
	}

	@PostMapping
	public ResponseEntity<Reservation> createReservation(@RequestParam Long userId, @RequestParam Long bookId,
			@RequestParam int days) {
		logger.info("[ReservationController] Creating reservation - User: {}, Book: {}, Days: {}", userId, bookId, days);
		Reservation reservation = reservationService.createReservation(userId, bookId, days);
		return ResponseEntity.status(HttpStatus.CREATED).body(reservation);
	}

	@PutMapping("/{id}/cancel")
	public ResponseEntity<Reservation> cancelReservation(@PathVariable Long id) {
		logger.info("[ReservationController] Cancelling reservation: {}", id);
		return ResponseEntity.ok(reservationService.cancelReservation(id));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteReservation(@PathVariable Long id) {
		logger.info("[ReservationController] Deleting reservation: {}", id);
		reservationService.delete(id);
		return ResponseEntity.noContent().build();
	}

	@PostMapping("/{id}/convert-to-loan")
	public ResponseEntity<Reservation> convertToLoan(@PathVariable Long id, @RequestParam int days) {
		logger.info("[ReservationController] Converting reservation {} to loan with {} days", id, days);
		Reservation reservation = reservationService.convertToLoan(id, days);
		return ResponseEntity.ok(reservation);
	}
}