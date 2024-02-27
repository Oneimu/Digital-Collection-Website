package com.library.catalogue.entity.school;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.library.catalogue.entity.base.BaseModel;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Data
@Table(name="school_buildings")
@JsonIgnoreProperties(ignoreUnknown = true)
public class SchoolBuildings extends BaseModel {

}
