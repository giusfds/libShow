package com.example.libshow.controller;

import com.example.libshow.domain.User;
import com.example.libshow.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserService userService;

	@GetMapping
	public List<User> getAllUsers() {
		logger.info("[UserController] Fetching all users");
		return userService.findAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<User> getUserById(@PathVariable Long id) {
		logger.info("[UserController] Fetching user: {}", id);
		return ResponseEntity.ok(userService.findById(id));
	}

	@PostMapping
	public ResponseEntity<User> createUser(@RequestBody User user) {
		logger.info("[UserController] Creating user: {}", user.getEmail());
		User created = userService.create(user);
		return ResponseEntity.status(HttpStatus.CREATED).body(created);
	}

	@PutMapping("/{id}")
	public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
		logger.info("[UserController] Updating user: {}", id);
		return ResponseEntity.ok(userService.update(id, user));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
		logger.info("[UserController] Deleting user: {}", id);
		userService.delete(id);
		return ResponseEntity.noContent().build();
	}
}