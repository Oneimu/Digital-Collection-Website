package com.library.catalogue.entity.home;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.library.catalogue.entity.base.BaseModel;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name="featured_schools")
@JsonIgnoreProperties(ignoreUnknown = true)
public class FeaturedSchools implements Serializable {

    @Id
    @Column(nullable = false)
    private String uid;

    private String schoolName;

    private String county;

    private String description;

    private String state;

    private String alternateNames;

}
