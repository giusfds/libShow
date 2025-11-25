package com.example.libshow.service;

import com.example.libshow.domain.Book;
import com.example.libshow.exception.BusinessException;
import com.example.libshow.exception.ResourceNotFoundException;
import com.example.libshow.repository.BookRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BookService {

	private static final Logger logger = LoggerFactory.getLogger(BookService.class);

	@Autowired
	private BookRepository bookRepository;

	public List<Book> findAll() {
		logger.info("[BookService] Finding all books");
		return bookRepository.findAll();
	}

	public Book findById(Long id) {
		logger.info("[BookService] Finding book by ID: {}", id);
		return bookRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + id));
	}

	@Transactional
	public Book create(Book book) {
		logger.info("[BookService] Creating book: {}", book.getTitle());
		book.setAvailableQuantity(book.getTotalQuantity());
		return bookRepository.save(book);
	}

	@Transactional
	public Book update(Long id, Book book) {
		logger.info("[BookService] Updating book: {}", id);
		Book existing = findById(id);
		existing.setTitle(book.getTitle());
		existing.setAuthor(book.getAuthor());
		existing.setIsbn(book.getIsbn());
		existing.setPublicationYear(book.getPublicationYear());
		existing.setPublisher(book.getPublisher());
		existing.setTotalQuantity(book.getTotalQuantity());
		existing.setAvailableQuantity(book.getAvailableQuantity());
		return bookRepository.save(existing);
	}

	@Transactional
	public void delete(Long id) {
		logger.info("[BookService] Deleting book: {}", id);
		if (!bookRepository.existsById(id)) {
			throw new ResourceNotFoundException("Book not found with id: " + id);
		}
		bookRepository.deleteById(id);
	}

	@Transactional
	public void decreaseAvailableQuantity(Long bookId, int quantity) {
		Book book = findById(bookId);
		if (book.getAvailableQuantity() < quantity) {
			throw new BusinessException("Insufficient available quantity");
		}
		book.setAvailableQuantity(book.getAvailableQuantity() - quantity);
		bookRepository.save(book);
	}

	@Transactional
	public void increaseAvailableQuantity(Long bookId, int quantity) {
		Book book = findById(bookId);
		book.setAvailableQuantity(book.getAvailableQuantity() + quantity);
		bookRepository.save(book);
	}
}
