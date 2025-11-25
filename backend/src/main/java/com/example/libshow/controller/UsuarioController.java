package com.example.libshow.controller;

import com.example.libshow.domain.Usuario;
import com.example.libshow.service.UsuarioService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private static final Logger logger = LoggerFactory.getLogger(UsuarioController.class);

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<Usuario> getAllUsuarios() {
        return usuarioService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUsuarioById(@PathVariable Long id) {
        return usuarioService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Usuario createUsuario(@RequestBody Usuario usuario) {
        logger.info("[UsuarioController] Criando novo usuário: {}", usuario.getEmail());
        try {
            Usuario novoUsuario = usuarioService.save(usuario);
            logger.info("[UsuarioController] Usuário criado com sucesso. ID: {}, Email: {}", novoUsuario.getId(), novoUsuario.getEmail());
            return novoUsuario;
        } catch (Exception e) {
            logger.error("[UsuarioController] Erro ao criar usuário: {}", usuario.getEmail(), e);
            throw e;
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> updateUsuario(@PathVariable Long id, @RequestBody Usuario usuarioDetails) {
        return usuarioService.findById(id)
                .map(usuario -> {
                    usuario.setNome(usuarioDetails.getNome());
                    usuario.setEmail(usuarioDetails.getEmail());
                    usuario.setSenha(usuarioDetails.getSenha());
                    usuario.setPerfilAcesso(usuarioDetails.getPerfilAcesso());
                    return ResponseEntity.ok(usuarioService.save(usuario));
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable Long id) {
        return usuarioService.findById(id)
                .map(usuario -> {
                    usuarioService.deleteById(id);
                    return ResponseEntity.ok().<Void>build();
                }).orElse(ResponseEntity.notFound().build());
    }
}
