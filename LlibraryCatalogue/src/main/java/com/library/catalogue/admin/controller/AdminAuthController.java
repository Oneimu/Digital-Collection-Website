package com.library.catalogue.admin.controller;


import com.library.catalogue.dto.AuthResponseDto;
import com.library.catalogue.dto.LoginDto;
import com.library.catalogue.dto.RegisterDto;
import com.library.catalogue.repository.admin.AdminRepository;
import com.library.catalogue.security.JwtGenerator;
import com.library.catalogue.service.admin.AdminDataService;
import com.library.catalogue.util.RestConstants;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = RestConstants.API_VERSION_1)
@CrossOrigin("http://localhost:3000/")
public class AdminAuthController {

    private final AuthenticationManager authenticationManager;
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    private final JwtGenerator jwtGenerator;

    private final AdminDataService adminDataService;

    @PostMapping("register")
    public ResponseEntity<String> register(@RequestParam RegisterDto registerDto){

        if (adminDataService.checkIfEmailExist(registerDto.getEmail())){

            return new ResponseEntity<>("Username is taken", HttpStatus.BAD_REQUEST);
        }

        adminDataService.saveAdminInfo(registerDto);

        return new ResponseEntity<>("User Registred Success!", HttpStatus.OK);

    }

    @PostMapping(path="login/{email}/{password}")
    public ResponseEntity<AuthResponseDto> login(@PathVariable String email, @PathVariable String password) {

        System.out.println(email);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);
        return new ResponseEntity<>(new AuthResponseDto(token), HttpStatus.OK);

    }

}
