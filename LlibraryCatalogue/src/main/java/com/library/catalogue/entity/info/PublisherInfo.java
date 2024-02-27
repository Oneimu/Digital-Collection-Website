package com.library.catalogue.entity.info;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.library.catalogue.enums.FileType;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Data
@Table(name="publisher_info")
@JsonIgnoreProperties(ignoreUnknown = true)
public class PublisherInfo implements Serializable {

    @Id
    @Column(nullable = false)
    private FileType subject;

    private String creator;

    private String source;

    private String publisher;

    @Column(length = 3000)
    private String rights;

    private String format;

}
