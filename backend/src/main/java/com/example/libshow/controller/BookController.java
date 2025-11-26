package com.example.libshow.controller;

import com.example.libshow.domain.Book;
import com.example.libshow.domain.enums.ReservationStatus;
import com.example.libshow.dto.BookAvailabilityDTO;
import com.example.libshow.repository.ReservationRepository;
import com.example.libshow.service.BookService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/books")
public class BookController {

	private static final Logger logger = LoggerFactory.getLogger(BookController.class);

	@Autowired
	private BookService bookService;

	@Autowired
	private ReservationRepository reservationRepository;

	@GetMapping
	public List<Book> getAllBooks() {
		logger.info("[BookController] Fetching all books");
		return bookService.findAll();
	}

	@GetMapping("/availability")
	public List<BookAvailabilityDTO> getBooksWithAvailability() {
		logger.info("[BookController] Fetching books with availability info");
		List<Book> books = bookService.findAll();

		return books.stream()
				.map(book -> {
					long activeReservationsCount = reservationRepository
							.findByBookIdAndStatus(book.getId(), ReservationStatus.ACTIVE)
							.size();
					boolean hasActiveReservations = activeReservationsCount > 0;

					return new BookAvailabilityDTO(book, hasActiveReservations, activeReservationsCount);
				})
				.collect(Collectors.toList());
	}

	@GetMapping("/{id}")
	public ResponseEntity<Book> getBookById(@PathVariable Long id) {
		logger.info("[BookController] Fetching book: {}", id);
		return ResponseEntity.ok(bookService.findById(id));
	}

	@PostMapping
	public ResponseEntity<Book> createBook(@RequestBody Book book) {
		logger.info("[BookController] Creating book: {}", book.getTitle());
		Book created = bookService.create(book);
		return ResponseEntity.status(HttpStatus.CREATED).body(created);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book book) {
		logger.info("[BookController] Updating book: {}", id);
		return ResponseEntity.ok(bookService.update(id, book));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
		logger.info("[BookController] Deleting book: {}", id);
		bookService.delete(id);
		return ResponseEntity.noContent().build();
	}
}