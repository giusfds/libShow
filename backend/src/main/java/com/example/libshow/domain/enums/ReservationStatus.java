package com.example.libshow.domain.enums;

public enum ReservationStatus {
	ACTIVE("Active"),
	CANCELLED("Cancelled"),
	COMPLETED("Completed");

	private final String displayName;

	ReservationStatus(String displayName) {
		this.displayName = displayName;
	}

	public String getDisplayName() {
		return displayName;
	}
}
