package com.library.catalogue.admin.controller;

import com.library.catalogue.admin.enums.FileCategory;
import com.library.catalogue.admin.service.HomePageService;
import com.library.catalogue.controller.HomeController;
import com.library.catalogue.entity.admin.AdminInfo;
import com.library.catalogue.util.RestConstants;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = RestConstants.API_VERSION_1 +"admin-landing-page")
@CrossOrigin("*")
public class AdminHomePage {

    private static final Logger logger = LoggerFactory.getLogger(AdminHomePage.class);


    private final HomePageService homePageService;

//    @PostMapping(
//            value = "{customerId}/profile-image",
//            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
//    )
//    public void uploadCustomerProfileImage(
//            @PathVariable("customerId") Integer customerId,
//            @RequestParam("file") MultipartFile file) {
//        customerService.uploadCustomerProfileImage(customerId, file);
//    }

    @PostMapping(value="{fileCategory}/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String uploadMetadata(@PathVariable("fileCategory") FileCategory fileCategory, @RequestParam("file") MultipartFile file) throws IOException {

        logger.info(String.format("File name '%s' uploaded successfully.", file.getOriginalFilename()));

        homePageService.extractZipFile(file, fileCategory);
        return homePageService.extractZipFile(file, fileCategory);
    }

    public AdminInfo getAdminInfo(){
        return null;
    }

    // delete record

    // update record

    //
}
