package com.library.catalogue.repository.admin;

import com.library.catalogue.entity.admin.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Integer> {

    Optional<Admin> findAdminByEmail(String email);
    Boolean existsAdminByEmail(String email);
}