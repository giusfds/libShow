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
public class JwtAuthenticationController {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationController.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
        logger.info("[JwtAuthenticationController] Tentativa de autenticação para usuário: {}", authenticationRequest.getUsername());

        try {
            authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
            logger.info("[JwtAuthenticationController] Autenticação bem-sucedida para: {}", authenticationRequest.getUsername());

            final UserDetails userDetails = userDetailsService
                    .loadUserByUsername(authenticationRequest.getUsername());

            final String token = jwtTokenUtil.generateToken(userDetails);
            logger.info("[JwtAuthenticationController] Token JWT gerado com sucesso para: {}", authenticationRequest.getUsername());

            return ResponseEntity.ok(new JwtResponse(token));
        } catch (Exception e) {
            logger.error("[JwtAuthenticationController] Falha na autenticação para usuário: {}", authenticationRequest.getUsername(), e);
            throw e;
        }
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            logger.debug("[JwtAuthenticationController] Autenticando usuário: {}", username);
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            logger.warn("[JwtAuthenticationController] Tentativa de acesso com usuário desabilitado: {}", username);
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            logger.warn("[JwtAuthenticationController] Credenciais inválidas para usuário: {}", username);
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}
