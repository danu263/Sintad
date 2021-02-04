package com.example.demo.security.jwt;

import com.example.demo.security.entity.UsuarioPrincipal;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtProvider {

    private final static Logger logger =
            LoggerFactory.getLogger(JwtProvider.class);

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private int expiration;

    public String generateToken(Authentication authentication) {
        UsuarioPrincipal usuarioPrincipal = (UsuarioPrincipal) authentication.getPrincipal();
        return Jwts.builder().setSubject(usuarioPrincipal.getEmail())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    public String getEmailFromToken(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token)
                .getBody().getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
            return true;
        }
        catch (MalformedJwtException e) {
            logger.error("Token mal formado");
            e.printStackTrace();
        } catch (UnsupportedJwtException e) {
            logger.error("Token no soportado");
            e.printStackTrace();
        } catch (ExpiredJwtException e) {
            logger.error("Token expirado");
            e.printStackTrace();
        } catch (IllegalArgumentException e) {
            logger.error("Token vacio");
            e.printStackTrace();
        } catch (SignatureException e) {
            logger.error("Falla en la firma");
            e.printStackTrace();
        }
        return false;
    }
}
