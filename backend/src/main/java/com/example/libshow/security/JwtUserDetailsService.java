package com.example.libshow.security;

import com.example.libshow.domain.Usuario;
import com.example.libshow.repository.UsuarioRepository;
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
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        logger.info("[JwtUserDetailsService] Carregando detalhes do usuário: {}", email);
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> {
                    logger.error("[JwtUserDetailsService] Usuário não encontrado: {}", email);
                    return new UsernameNotFoundException("User not found with email: " + email);
                });
        logger.info("[JwtUserDetailsService] Usuário encontrado: {}, Perfil: {}", email, usuario.getPerfilAcesso());
        return new User(usuario.getEmail(), usuario.getSenha(), new ArrayList<>());
    }
}
