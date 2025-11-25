package com.example.libshow.controller;

import com.example.libshow.security.JwtRequest;
import com.example.libshow.security.JwtResponse;
import com.example.libshow.security.JwtTokenUtil;
import com.example.libshow.security.JwtUserDetailsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/auth")
public class JwtAuthenticationController {

	private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationController.class);

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private JwtUserDetailsService userDetailsService;

	@PostMapping("/login")
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
		logger.info("[JwtAuthenticationController] Authentication attempt for user: {}",
				authenticationRequest.getUsername());

		try {
			authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
			logger.info("[JwtAuthenticationController] Authentication successful for: {}",
					authenticationRequest.getUsername());

			final UserDetails userDetails = userDetailsService
					.loadUserByUsername(authenticationRequest.getUsername());

			final String token = jwtTokenUtil.generateToken(userDetails);
			logger.info("[JwtAuthenticationController] JWT Token generated successfully for: {}",
					authenticationRequest.getUsername());

			return ResponseEntity.ok(new JwtResponse(token));
		} catch (Exception e) {
			logger.error("[JwtAuthenticationController] Authentication failed for user: {}",
					authenticationRequest.getUsername(), e);
			throw e;
		}
	}

	private void authenticate(String username, String password) throws Exception {
		try {
			logger.debug("[JwtAuthenticationController] Authenticating user: {}", username);
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			logger.warn("[JwtAuthenticationController] Access attempt with disabled user: {}", username);
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			logger.warn("[JwtAuthenticationController] Invalid credentials for user: {}", username);
			throw new Exception("INVALID_CREDENTIALS", e);
		}
	}
}
