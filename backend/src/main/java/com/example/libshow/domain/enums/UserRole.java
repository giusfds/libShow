package com.example.libshow.domain.enums;

public enum UserRole {
	ADMIN("Admin"),
	LIBRARIAN("Librarian"),
	PROFESSOR("Professor"),
	STUDENT("Student");

	private final String displayName;

	UserRole(String displayName) {
		this.displayName = displayName;
	}

	public String getDisplayName() {
		return displayName;
	}
}
