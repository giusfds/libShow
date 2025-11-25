package com.example.libshow.controller;

import com.example.libshow.domain.Loan;
import com.example.libshow.service.LoanService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/loans")
public class LoanController {

	private static final Logger logger = LoggerFactory.getLogger(LoanController.class);

	@Autowired
	private LoanService loanService;

	@GetMapping
	public List<Loan> getAllLoans() {
		logger.info("[LoanController] Fetching all loans");
		return loanService.findAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Loan> getLoanById(@PathVariable Long id) {
		logger.info("[LoanController] Fetching loan: {}", id);
		return ResponseEntity.ok(loanService.findById(id));
	}

	@PostMapping
	public ResponseEntity<Loan> createLoan(@RequestParam Long userId, @RequestParam Long bookId, @RequestParam int days) {
		logger.info("[LoanController] Creating loan - User: {}, Book: {}, Days: {}", userId, bookId, days);
		Loan loan = loanService.createLoan(userId, bookId, days);
		return ResponseEntity.status(HttpStatus.CREATED).body(loan);
	}

	@PutMapping("/{id}/return")
	public ResponseEntity<Loan> returnBook(@PathVariable Long id) {
		logger.info("[LoanController] Returning book for loan: {}", id);
		return ResponseEntity.ok(loanService.returnBook(id));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteLoan(@PathVariable Long id) {
		logger.info("[LoanController] Deleting loan: {}", id);
		loanService.delete(id);
		return ResponseEntity.noContent().build();
	}
}