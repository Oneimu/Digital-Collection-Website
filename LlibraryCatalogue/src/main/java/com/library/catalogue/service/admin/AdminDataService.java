package com.library.catalogue.service.admin;

import com.library.catalogue.dto.RegisterDto;
import com.library.catalogue.entity.admin.Admin;
import com.library.catalogue.enums.Role;
import com.library.catalogue.repository.admin.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminDataService {

    private final AdminRepository adminRepository;

    private final PasswordEncoder passwordEncoder;

    public boolean checkIfEmailExist(String email){
        return adminRepository.existsAdminByEmail(email);
    }

    public Admin saveAdminInfo(RegisterDto registerDto){
        Admin admin = new Admin();

        admin.setEmail(registerDto.getEmail());
        admin.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        admin.setRole(Role.ADMIN);

        return adminRepository.save(admin);
    }


}
