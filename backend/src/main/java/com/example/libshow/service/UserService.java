package com.example.libshow.service;

import com.example.libshow.domain.User;
import com.example.libshow.exception.ResourceNotFoundException;
import com.example.libshow.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {

	private static final Logger logger = LoggerFactory.getLogger(UserService.class);

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public List<User> findAll() {
		logger.info("[UserService] Finding all users");
		return userRepository.findAll();
	}

	public User findById(Long id) {
		logger.info("[UserService] Finding user by ID: {}", id);
		return userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
	}

	@Transactional
	public User create(User user) {
		logger.info("[UserService] Creating user: {}", user.getEmail());
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return userRepository.save(user);
	}

	@Transactional
	public User update(Long id, User user) {
		logger.info("[UserService] Updating user: {}", id);
		User existing = findById(id);
		existing.setName(user.getName());
		existing.setEmail(user.getEmail());
		existing.setRole(user.getRole());
		if (user.getPassword() != null && !user.getPassword().isEmpty()) {
			existing.setPassword(passwordEncoder.encode(user.getPassword()));
		}
		return userRepository.save(existing);
	}

	@Transactional
	public void delete(Long id) {
		logger.info("[UserService] Deleting user: {}", id);
		if (!userRepository.existsById(id)) {
			throw new ResourceNotFoundException("User not found with id: " + id);
		}
		userRepository.deleteById(id);
	}
}
