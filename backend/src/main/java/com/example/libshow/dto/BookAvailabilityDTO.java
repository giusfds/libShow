package com.example.libshow.dto;

import com.example.libshow.domain.Book;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookAvailabilityDTO {
	private Long id;
	private String title;
	private String author;
	private String isbn;
	private String publicationYear;
	private String publisher;
	private Integer totalQuantity;
	private Integer availableQuantity;
	private boolean hasActiveReservations;
	private Long activeReservationsCount;

	public BookAvailabilityDTO(Book book, boolean hasActiveReservations, Long activeReservationsCount) {
		this.id = book.getId();
		this.title = book.getTitle();
		this.author = book.getAuthor();
		this.isbn = book.getIsbn();
		this.publicationYear = String.valueOf(book.getPublicationYear());
		this.publisher = book.getPublisher();
		this.totalQuantity = book.getTotalQuantity();
		this.availableQuantity = book.getAvailableQuantity();
		this.hasActiveReservations = hasActiveReservations;
		this.activeReservationsCount = activeReservationsCount;
	}
}
