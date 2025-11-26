package com.example.libshow.service;

import com.example.libshow.domain.Book;
import com.example.libshow.domain.Reservation;
import com.example.libshow.domain.User;
import com.example.libshow.domain.enums.ReservationStatus;
import com.example.libshow.exception.BusinessException;
import com.example.libshow.exception.ResourceNotFoundException;
import com.example.libshow.repository.ReservationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReservationService {

	private static final Logger logger = LoggerFactory.getLogger(ReservationService.class);

	@Autowired
	private ReservationRepository reservationRepository;

	@Autowired
	private UserService userService;

	@Autowired
	private BookService bookService;

	@Autowired
	private LoanService loanService;

	public List<Reservation> findAll() {
		logger.info("[ReservationService] Finding all reservations");
		return reservationRepository.findAll();
	}

	public Reservation findById(Long id) {
		logger.info("[ReservationService] Finding reservation by ID: {}", id);
		return reservationRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Reservation not found with id: " + id));
	}

	@Transactional
	public Reservation createReservation(Long userId, Long bookId, int days) {
		logger.info("[ReservationService] Creating reservation - User: {}, Book: {}, Days: {}", userId, bookId, days);

		User user = userService.findById(userId);
		Book book = bookService.findById(bookId);

		if (book.getAvailableQuantity() > 0) {
			throw new BusinessException("Book is available - please create a loan instead");
		}

		Reservation reservation = new Reservation();
		reservation.setUser(user);
		reservation.setBook(book);
		reservation.setReservationDate(LocalDate.now());
		reservation.setExpirationDate(LocalDate.now().plusDays(days));
		reservation.setStatus(ReservationStatus.ACTIVE);

		return reservationRepository.save(reservation);
	}

	@Transactional
	public Reservation cancelReservation(Long reservationId) {
		logger.info("[ReservationService] Cancelling reservation: {}", reservationId);
		Reservation reservation = findById(reservationId);

		if (reservation.getStatus() != ReservationStatus.ACTIVE) {
			throw new BusinessException("Reservation is not active");
		}

		reservation.setStatus(ReservationStatus.CANCELLED);
		return reservationRepository.save(reservation);
	}

	@Transactional
	public void delete(Long id) {
		logger.info("[ReservationService] Deleting reservation: {}", id);
		if (!reservationRepository.existsById(id)) {
			throw new ResourceNotFoundException("Reservation not found with id: " + id);
		}
		reservationRepository.deleteById(id);
	}

	@Transactional
	public Reservation convertToLoan(Long reservationId, int loanDays) {
		logger.info("[ReservationService] Converting reservation {} to loan with {} days", reservationId, loanDays);

		Reservation reservation = findById(reservationId);

		if (reservation.getStatus() != ReservationStatus.ACTIVE) {
			throw new BusinessException("Reservation is not active");
		}

		Book book = reservation.getBook();
		if (book.getAvailableQuantity() <= 0) {
			throw new BusinessException("Book is not available");
		}

		// Create the loan
		loanService.createLoan(reservation.getUser().getId(), book.getId(), loanDays);

		// Mark reservation as completed
		reservation.setStatus(ReservationStatus.COMPLETED);
		return reservationRepository.save(reservation);
	}
}
