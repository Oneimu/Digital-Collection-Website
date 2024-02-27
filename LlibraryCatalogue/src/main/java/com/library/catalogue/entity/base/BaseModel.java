package com.library.catalogue.entity.base;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@MappedSuperclass
@JsonIgnoreProperties(ignoreUnknown = true)
@AllArgsConstructor
@NoArgsConstructor
public class BaseModel implements Serializable {

    @Id
    @Column(updatable = false, nullable = false)
    private String uid;

    private String state;

    private String county;

    private String schoolNames;

    private String alternateNames;

    @Column(length = 3000)
    private String description;

    private String title;

    private String schoolCardId;

    private String photoId;

    private String appl;

    private String originalDate;

}
