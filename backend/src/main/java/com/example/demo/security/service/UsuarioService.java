package com.example.demo.security.service;

import com.example.demo.security.entity.Usuario;
import com.example.demo.security.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;

    public Optional<Usuario> getByEmail (String nombre) {
        return usuarioRepository.findByEmail(nombre);
    }

    public boolean existsByNombre (String nombre) {
        return usuarioRepository.existsByNombre(nombre);
    }

    public boolean existsByEmail (String email) {
        return usuarioRepository.existsByEmail(email);
    }

    public Usuario save(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }
}
