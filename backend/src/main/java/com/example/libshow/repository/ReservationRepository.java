package com.example.libshow.repository;

import com.example.libshow.domain.Reservation;
import com.example.libshow.domain.enums.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
	List<Reservation> findByUserId(Long userId);

	List<Reservation> findByBookId(Long bookId);

	List<Reservation> findByStatus(ReservationStatus status);

	List<Reservation> findByBookIdAndStatus(Long bookId, ReservationStatus status);
}
