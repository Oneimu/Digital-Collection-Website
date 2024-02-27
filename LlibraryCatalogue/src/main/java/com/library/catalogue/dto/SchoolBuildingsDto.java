package com.library.catalogue.dto;

import com.library.catalogue.entity.school.SchoolBuildings;
import lombok.Data;

import javax.persistence.Column;


@Data
public class SchoolBuildingsDto {

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

    public SchoolBuildings toEntity(){

        SchoolBuildings schoolBuildings = new SchoolBuildings();

        schoolBuildings.setOriginalDate(originalDate);
        schoolBuildings.setSchoolCardId(schoolCardId);
        schoolBuildings.setAlternateNames(alternateNames);
        schoolBuildings.setSchoolNames(schoolNames);
        schoolBuildings.setAppl(appl);
        schoolBuildings.setCounty(county);
        schoolBuildings.setDescription(description);
        schoolBuildings.setPhotoId(photoId);
        schoolBuildings.setState(state);
        schoolBuildings.setTitle(title);
        schoolBuildings.setUid(uid);

        return schoolBuildings;

    }
}
