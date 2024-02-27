package com.library.catalogue.dto;

import com.library.catalogue.entity.school.SchoolBuildings;
import com.library.catalogue.entity.school.SchoolFunds;
import lombok.Data;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Data
public class SchoolFundsDto {

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

    private String itemNumber;

    private String acreage;

    private String teacherType;

    private String budgetYear;

    private String  totalCost;

    private String blacksContribution;

    private String whitesContribution;

    private String publicContribution;

    private String rosenwaldContribution;

    private List<SchoolBuildings> schoolBuildings;

    public SchoolFunds toEntity(){

        SchoolFunds schoolFunds = new SchoolFunds();

        schoolFunds.setOriginalDate(originalDate);

        schoolFunds.setSchoolCardId(schoolCardId);

        schoolFunds.setAlternateNames(alternateNames);

        schoolFunds.setSchoolNames(schoolNames);

        schoolFunds.setAppl(appl);

        schoolFunds.setCounty(county);

        schoolFunds.setDescription(description);

        schoolFunds.setPhotoId(photoId);
        schoolFunds.setState(state);
        schoolFunds.setTitle(title);
        schoolFunds.setUid(uid);
        schoolFunds.setItemNumber(itemNumber);
        schoolFunds.setAcreage(acreage);
        schoolFunds.setBudgetYear(budgetYear);
        schoolFunds.setTeacherType(teacherType);
        schoolFunds.setTotalCost(totalCost);
        schoolFunds.setBlacksContribution(blacksContribution);
        schoolFunds.setPublicContribution(publicContribution);
        schoolFunds.setRosenwaldContribution(rosenwaldContribution);
        schoolFunds.setWhitesContribution(whitesContribution);
        schoolFunds.setSchoolBuildings(schoolBuildings);

        return schoolFunds;

    }
}
