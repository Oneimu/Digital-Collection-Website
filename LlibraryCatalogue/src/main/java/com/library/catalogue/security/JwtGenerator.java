package com.library.catalogue.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtGenerator {

    public String generateToken(Authentication authentication){

        String username = authentication.getName();
        Date currentDate = new Date();
        Date expiredDate = new Date(currentDate.getTime()+SecurityConstants.JWT_EXPIRATION);

        String token = Jwts.builder()
                .setSubject(username)
                .setIssuedAt(currentDate)
                .setExpiration(expiredDate)
                .signWith(SignatureAlgorithm.HS256, SecurityConstants.jWT_SECRET)
                .compact();

        return token;

    }

    public String getUsernameFromJwt(String token) {
        Claims claims = Jwts
                .parser()
                .setSigningKey(SecurityConstants.jWT_SECRET)
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();

    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SecurityConstants.jWT_SECRET).parseClaimsJwt(token);
            return true;
        } catch (Exception ex) {
            throw new AuthenticationCredentialsNotFoundException("JWT was expired or incorrect!");
        }
    }
}
