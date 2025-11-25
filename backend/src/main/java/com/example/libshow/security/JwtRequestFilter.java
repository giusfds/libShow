package com.example.libshow.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

	private static final Logger logger = LoggerFactory.getLogger(JwtRequestFilter.class);

	@Autowired
	private JwtUserDetailsService jwtUserDetailsService;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {

		final String requestTokenHeader = request.getHeader("Authorization");
		final String requestURI = request.getRequestURI();
		logger.debug("[JwtRequestFilter] Processing request: {} {}", request.getMethod(), requestURI);

		String username = null;
		String jwtToken = null;
		// JWT Token is in the form "Bearer token". Remove Bearer word and get only the
		// Token
		if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
			jwtToken = requestTokenHeader.substring(7);
			logger.debug("[JwtRequestFilter] JWT Token found in request");
			try {
				username = jwtTokenUtil.getUsernameFromToken(jwtToken);
				logger.debug("[JwtRequestFilter] Username extracted from token: {}", username);
			} catch (IllegalArgumentException e) {
				logger.error("[JwtRequestFilter] Unable to get JWT Token", e);
			} catch (io.jsonwebtoken.ExpiredJwtException e) {
				logger.warn("[JwtRequestFilter] JWT Token has expired for request: {}", requestURI);
			}
		} else {
			logger.debug("[JwtRequestFilter] JWT Token does not begin with Bearer String. URI: {}", requestURI);
		}

		// Once we get the token validate it
		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			logger.debug("[JwtRequestFilter] Validating token for user: {}", username);

			UserDetails userDetails = this.jwtUserDetailsService.loadUserByUsername(username);

			// if token is valid configure Spring Security to manually set authentication
			if (jwtTokenUtil.validateToken(jwtToken, userDetails)) {
				logger.info("[JwtRequestFilter] Valid token. Authenticating user: {}", username);

				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());
				usernamePasswordAuthenticationToken
						.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				// After setting the Authentication in the Context, we specify that the current
				// user is authenticated
				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
				logger.info("[JwtRequestFilter] User authenticated successfully: {}", username);
			} else {
				logger.warn("[JwtRequestFilter] Invalid token for user: {}", username);
			}
		}
		chain.doFilter(request, response);
	}
}
