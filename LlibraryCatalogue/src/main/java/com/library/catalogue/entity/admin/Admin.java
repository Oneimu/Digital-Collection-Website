package com.library.catalogue.entity.admin;

import com.library.catalogue.enums.Role;
import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "admin_user")
public class Admin{

    @Id
    @GeneratedValue
    private Integer id;

    private String firstname;

    private String lastname;

    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;



}
