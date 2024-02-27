package com.library.catalogue.entity.school;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.library.catalogue.entity.base.BaseModel;
import lombok.Data;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Data
@Table(name="school_funds")
@JsonIgnoreProperties(ignoreUnknown = true)
public class SchoolFunds extends BaseModel {

    private String itemNumber;

    private String acreage;

    private String teacherType;

    private String budgetYear;

    private String totalCost;

    private String blacksContribution;

    private String whitesContribution;

    private String publicContribution;

    private String rosenwaldContribution;

    @OneToMany(targetEntity = SchoolBuildings.class,cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name ="image_uids",referencedColumnName = "uid")
    private List<SchoolBuildings> schoolBuildings;

}
