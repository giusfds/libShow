package com.example.libshow.service;

import com.example.libshow.domain.Book;
import com.example.libshow.domain.Loan;
import com.example.libshow.domain.User;
import com.example.libshow.exception.BusinessException;
import com.example.libshow.exception.ResourceNotFoundException;
import com.example.libshow.repository.LoanRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class LoanService {

	private static final Logger logger = LoggerFactory.getLogger(LoanService.class);

	@Autowired
	private LoanRepository loanRepository;

	@Autowired
	private UserService userService;

	@Autowired
	private BookService bookService;

	public List<Loan> findAll() {
		logger.info("[LoanService] Finding all loans");
		return loanRepository.findAll();
	}

	public Loan findById(Long id) {
		logger.info("[LoanService] Finding loan by ID: {}", id);
		return loanRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Loan not found with id: " + id));
	}

	@Transactional
	public Loan createLoan(Long userId, Long bookId, int days) {
		logger.info("[LoanService] Creating loan - User: {}, Book: {}, Days: {}", userId, bookId, days);

		User user = userService.findById(userId);
		Book book = bookService.findById(bookId);

		if (book.getAvailableQuantity() < 1) {
			throw new BusinessException("Book is not available for loan");
		}

		Loan loan = new Loan();
		loan.setUser(user);
		loan.setBook(book);
		loan.setLoanDate(LocalDate.now());
		loan.setExpectedReturnDate(LocalDate.now().plusDays(days));

		bookService.decreaseAvailableQuantity(bookId, 1);
		return loanRepository.save(loan);
	}

	@Transactional
	public Loan returnBook(Long loanId) {
		logger.info("[LoanService] Returning book for loan: {}", loanId);
		Loan loan = findById(loanId);

		if (loan.getActualReturnDate() != null) {
			throw new BusinessException("Book has already been returned");
		}

		loan.setActualReturnDate(LocalDate.now());
		bookService.increaseAvailableQuantity(loan.getBook().getId(), 1);
		return loanRepository.save(loan);
	}

	@Transactional
	public void delete(Long id) {
		logger.info("[LoanService] Deleting loan: {}", id);
		if (!loanRepository.existsById(id)) {
			throw new ResourceNotFoundException("Loan not found with id: " + id);
		}
		loanRepository.deleteById(id);
	}
}
