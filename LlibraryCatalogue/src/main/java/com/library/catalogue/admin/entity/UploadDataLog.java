package com.library.catalogue.admin.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
public class UploadDataLog {

    private boolean successStatus;

    private String message;

    // the uploader info
    private String adminEmailAddress;

    // creation time
    private String  creationTime;

    @Id
    @GeneratedValue
    private Long id;

}
