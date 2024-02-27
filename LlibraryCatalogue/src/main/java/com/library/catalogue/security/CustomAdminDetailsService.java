package com.library.catalogue.security;

import com.library.catalogue.entity.admin.Admin;
import com.library.catalogue.enums.Role;
import com.library.catalogue.repository.admin.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class CustomAdminDetailsService implements UserDetailsService {

    private final AdminRepository adminRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Admin admin = adminRepository.findAdminByEmail(username)
                .orElseThrow(()-> new UsernameNotFoundException("Username not found!"));
        return new User(admin.getEmail(), admin.getPassword(), mapRolesToAuthorities(admin.getRole()));
    }

    private Collection<GrantedAuthority> mapRolesToAuthorities(Role role){
        return Collections.singleton(new SimpleGrantedAuthority(role.name()));
    }
}
