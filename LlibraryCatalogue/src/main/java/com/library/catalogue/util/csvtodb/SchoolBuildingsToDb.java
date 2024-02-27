package com.library.catalogue.util.csvtodb;

import com.library.catalogue.dto.SchoolBuildingsDto;
import com.library.catalogue.entity.school.SchoolBuildings;
import com.library.catalogue.util.ReadUrl;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class SchoolBuildingsToDb {
    private final String SCHOOL_BUILDING_URL = "https://raw.githubusercontent.com/Aayush000/Rosenwald_Library/main/schools/school_metadata.csv";

    private ReadUrl readUrl = new ReadUrl();

    public List<SchoolBuildings> schoolBuildingCvsToDb() {
        return schoolBuildingCvsToDbUrl(SCHOOL_BUILDING_URL);
        }

    public List<SchoolBuildings> schoolBuildingCvsToDbUrl(String csvUrl) {
        List<SchoolBuildings> allSchoolBuildings = new ArrayList<>();

        Iterable<CSVRecord> records = readUrl.readURL(csvUrl);

        for (CSVRecord record : records) {
            allSchoolBuildings.add(toSchoolBuildingsDto(record));
    }
    return allSchoolBuildings;
    }

    public List<SchoolBuildings> schoolBuildingCvsToDb(CSVParser csvRecords){
        List<SchoolBuildings> allSchoolBuildings = new ArrayList<>();
        for (CSVRecord record : csvRecords) {
            // Add the record to the Iterable collection
            allSchoolBuildings.add(toSchoolBuildingsDto(record));
        }
        return allSchoolBuildings;
    }

    private SchoolBuildings toSchoolBuildingsDto(CSVRecord record){
        SchoolBuildingsDto schoolBuildingsDto = new SchoolBuildingsDto();

        schoolBuildingsDto.setAlternateNames(record.get("Alternate Names"));
        schoolBuildingsDto.setAppl(record.get("Appl #"));
        schoolBuildingsDto.setCounty(record.get("County"));
        schoolBuildingsDto.setSchoolNames(record.get("School Names"));
        schoolBuildingsDto.setSchoolCardId(record.get("School Card ID"));
        schoolBuildingsDto.setPhotoId(record.get("Photo ID #"));
        schoolBuildingsDto.setDescription(record.get("Description"));
        schoolBuildingsDto.setTitle(record.get("Title"));
        schoolBuildingsDto.setOriginalDate(record.get("Date.Original"));
        schoolBuildingsDto.setUid(record.get("UID"));
        schoolBuildingsDto.setState(record.get("State"));

        return schoolBuildingsDto.toEntity();
    }

}
