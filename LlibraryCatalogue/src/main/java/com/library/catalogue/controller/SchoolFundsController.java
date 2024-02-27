package com.library.catalogue.controller;

//import com.library.catalogue.entity.school.SchoolBuildings;
//import com.library.catalogue.service.school.SchoolBuildingsService;
import com.library.catalogue.entity.school.SchoolFunds;
import com.library.catalogue.service.school.SchoolFundsService;
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
@RequestMapping(value = RestConstants.API_VERSION_1 +"school-funds")
public class SchoolFundsController {
    private final SchoolFundsService schoolFundsService;

    @PostMapping(value = "csv-to-db")
    @ResponseStatus(value = HttpStatus.OK)
    public List<SchoolFunds> transferCsvToDb(){
        return schoolFundsService.transferCsvDataToDb();
    }

    @PostMapping(value = "create-data")
    @ResponseStatus(value = HttpStatus.OK)
    public SchoolFunds createSchoolFund(@Validated @RequestBody SchoolFunds schoolFunds){
        return schoolFundsService.saveSchoolFunds(schoolFunds);
    }

    @PostMapping(value = "create-mul-data")
    @ResponseStatus(value = HttpStatus.OK)
    public void createMultipleSchoolFunds(@Validated @RequestBody List<SchoolFunds> schoolFundsList){
        schoolFundsService.saveAllSchoolFunds(schoolFundsList);
    }

    @PutMapping(value = "update-data/{uid}")
    @ResponseStatus(value = HttpStatus.OK)
    public SchoolFunds updateSchoolFunds(@PathVariable String uid,  @Validated @RequestBody SchoolFunds schoolFunds){

        return null;
    }

    @GetMapping(value = "get-school-fund/{uid}")
    @ResponseStatus(value = HttpStatus.OK)
    public SchoolFunds getSchoolFunds(@PathVariable String uid){
        return schoolFundsService.getSchoolFundByUID(uid);
    }

    @GetMapping(value = "get-school-buildings")
    @ResponseStatus(value = HttpStatus.OK)
    public List<SchoolFunds> getMultipleSchoolFunds(@Validated @RequestBody List<String> uids){

        return schoolFundsService.getSchoolFundsByMultipleUid(uids);
    }

    @GetMapping(value = "get-all-school-funds")
    @ResponseStatus(value = HttpStatus.OK)
    public Page<SchoolFunds> getAllSchoolFunds(Pageable pageable){
        return schoolFundsService.getAllSchoolFunds(pageable);
    }

    @DeleteMapping("del-school-buildings-funds/{uid}")
    @ResponseStatus(value = HttpStatus.OK)
    public void deleteSchoolFunds(@PathVariable String uid){
        schoolFundsService.deleteSchoolFunds(uid);
    }

    // to delete multiple uid, it must be passed as a string seperated with commas
    @DeleteMapping("school-buildings-funds/delete/{uids}")
    @ResponseStatus(value = HttpStatus.OK)
    public void deleteMultiplySchoolFunds(@Validated @RequestBody List<String> uids){
        schoolFundsService.deleteMultipleSchoolFunds(uids);

    }

}
