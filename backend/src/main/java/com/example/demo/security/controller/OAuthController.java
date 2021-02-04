package com.example.demo.security.controller;

import com.example.demo.security.dto.TokenDto;
import com.example.demo.security.entity.Rol;
import com.example.demo.security.entity.Usuario;
import com.example.demo.security.enums.RolNombre;
import com.example.demo.security.jwt.JwtProvider;
import com.example.demo.security.service.RolService;
import com.example.demo.security.service.UsuarioService;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;


@CrossOrigin
@RestController
@RequestMapping("/oauth")
public class OAuthController {

    private final static Logger logger =
            LoggerFactory.getLogger(OAuthController.class);

    @Value("${google.clientID}")
    String googleClientId;

    @Value("${secret.psw}")
    String secretPsw;


    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtProvider jwtProvider;

    @Autowired
    UsuarioService userService;

    @Autowired
    RolService roleService;

    @PostMapping("/google")
    public ResponseEntity<?> google(@RequestBody TokenDto tokenDto) throws IOException {
        final NetHttpTransport transport = new NetHttpTransport();
        final JacksonFactory jacksonFactory = JacksonFactory.getDefaultInstance();
        GoogleIdTokenVerifier verifier =
                new GoogleIdTokenVerifier.Builder(transport, jacksonFactory)
                        .setAudience(Collections.singletonList(googleClientId)).build();

        System.out.println("Valor del token: ");
        System.out.println(tokenDto.getValue());
        final GoogleIdToken googleIdToken =  GoogleIdToken.parse(
                verifier.getJsonFactory(), tokenDto.getValue()
        );
        final GoogleIdToken.Payload payload = googleIdToken.getPayload();


        //return  new ResponseEntity<>(payload, HttpStatus.OK);

        /*
            TODO: Verify if the user is Enabled/Active

        */
        Usuario usuario =  new Usuario();
        if (userService.existsByEmail(payload.getEmail())) // If it is already registered
        {
            logger.info("Registered user");
            usuario = userService.getByEmail(payload.getEmail()).get();
        }
        else // if is a new user
        {
            logger.info("Usuario nuevo");
            usuario = saveUser(payload.getEmail());
        }


        TokenDto tokenRes = login(usuario);
        return new ResponseEntity<>(tokenRes, HttpStatus.OK);

    }

    private TokenDto login(Usuario usuario) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(usuario.getEmail(), secretPsw)
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtProvider.generateToken(authentication);
        TokenDto tokenDto = new TokenDto();
        tokenDto.setValue(jwt);
        return tokenDto;
    }

    private Usuario saveUser(String email){
        Usuario usuario =  new Usuario();
        usuario.setEmail(email);
        usuario.setApellido(" ");
        usuario.setNombre(" ");
        usuario.setPassword(passwordEncoder.encode(secretPsw));
        Rol rol = roleService.getByRolNombre(RolNombre.ROL_MOD).get();
        Set<Rol> roles =  new HashSet<>(); roles.add(rol);
        usuario.setRoles(roles);

        return userService.save(usuario);
    }



}
