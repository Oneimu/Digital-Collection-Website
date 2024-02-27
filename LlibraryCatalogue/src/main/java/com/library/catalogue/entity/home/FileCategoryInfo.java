package com.library.catalogue.entity.home;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.library.catalogue.entity.base.BaseModel;
import com.library.catalogue.enums.FileType;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Data
@Table(name="file_category")
@JsonIgnoreProperties(ignoreUnknown = true)
public class FileCategoryInfo implements Serializable {

    // this is the same as the file name, it is an enum type
    @Id
    @Column(nullable = false)
    private FileType fileCategory;

    private String description;

    // might be change to list of urls sometime in the future. for now, one image for one category
    private String imageUrl;

}
