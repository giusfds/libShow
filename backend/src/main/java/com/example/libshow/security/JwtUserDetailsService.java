package com.example.libshow.security;

import com.example.libshow.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class JwtUserDetailsService implements UserDetailsService {

	private static final Logger logger = LoggerFactory.getLogger(JwtUserDetailsService.class);

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		logger.info("[JwtUserDetailsService] Loading user details for: {}", email);
		com.example.libshow.domain.User user = userRepository.findByEmail(email)
				.orElseThrow(() -> {
					logger.error("[JwtUserDetailsService] User not found: {}", email);
					return new UsernameNotFoundException("User not found with email: " + email);
				});
		logger.info("[JwtUserDetailsService] User found: {}, Role: {}", email, user.getRole());
		return new User(user.getEmail(), user.getPassword(), new ArrayList<>());
	}
}
