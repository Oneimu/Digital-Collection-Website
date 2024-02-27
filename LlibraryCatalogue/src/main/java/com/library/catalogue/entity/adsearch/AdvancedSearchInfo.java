package com.library.catalogue.entity.adsearch;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.library.catalogue.enums.State;
import com.library.catalogue.enums.TotalContribution;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class AdvancedSearchInfo implements Serializable {

    @Id
    @Column(updatable = false, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String schoolName;

    private TotalContribution totalContribution;

    private String budgetYear;

    private State state; // change to Enum state

    private String county;

}
