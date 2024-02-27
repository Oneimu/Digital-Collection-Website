package com.library.catalogue.controller;

import com.library.catalogue.entity.school.SchoolBuildings;
import com.library.catalogue.service.school.SchoolBuildingsService;
import com.library.catalogue.util.RestConstants;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = RestConstants.API_VERSION_1 +"school-buildings")
public class SchoolBuildingsController {

    private final SchoolBuildingsService schoolBuildingsService;

    @PostMapping(value = "csv-to-db")
    @ResponseStatus(value = HttpStatus.OK)
    public List<SchoolBuildings> transferCsvToDb(){
        return schoolBuildingsService.saveCsv();
    }

    @PostMapping(value = "create-data")
    @ResponseStatus(value = HttpStatus.OK)
    public SchoolBuildings createSchoolBuilding(@Validated @RequestBody SchoolBuildings schoolBuilding){
        return schoolBuildingsService.saveSchoolBuilding(schoolBuilding);
    }

    @PostMapping(value = "create-mul-data")
    @ResponseStatus(value = HttpStatus.OK)
    public List<SchoolBuildings> createMultipleSchoolBuilding(@Validated @RequestBody List<SchoolBuildings> schoolBuildings){
        return schoolBuildingsService.saveAllSchoolBuildings(schoolBuildings);
    }

    @PutMapping(value = "update-data/{uid}")
    @ResponseStatus(value = HttpStatus.OK)
    public SchoolBuildings updateSchoolBuilding(@PathVariable String uid,  @Validated @RequestBody SchoolBuildings schoolBuildings){

        return null;
    }
    @GetMapping(value = "get-school-building/{uid}")
    @ResponseStatus(value = HttpStatus.OK)
    public SchoolBuildings getSchoolBuilding(@PathVariable String uid){
        return schoolBuildingsService.getSchoolBuildingByUID(uid);
    }

    @GetMapping(value = "get-school-buildings")
    @ResponseStatus(value = HttpStatus.OK)
    public List<SchoolBuildings> getMultipleSchoolBuilding(@Validated @RequestBody List<String> uids){

        return schoolBuildingsService.getSchoolBuildingByMultipleUid(uids);
    }

    @GetMapping(value = "get-all-school-buildings")
    @ResponseStatus(value = HttpStatus.OK)
    public Page<SchoolBuildings> getAllSchoolBuilding(Pageable pageable){
        return schoolBuildingsService.getAllSchoolBuildings(pageable);
    }

    @DeleteMapping("school-buildings-funds/{uid}")
    @ResponseStatus(value = HttpStatus.OK)
    public void deleteSchoolBuildings(@PathVariable String uid){
        schoolBuildingsService.deleteSchoolBuilding(uid);
    }

    // to delete multiple uid, it must be passed as a string seperated with commas
    @DeleteMapping("school-buildings-funds/delete/{uids}")
    @ResponseStatus(value = HttpStatus.OK)
    public void deleteMultiplySchoolBuildings(@Validated @RequestBody List<String> uids){
        schoolBuildingsService.deleteMultipleSchoolBuilding(uids);

    }

}
