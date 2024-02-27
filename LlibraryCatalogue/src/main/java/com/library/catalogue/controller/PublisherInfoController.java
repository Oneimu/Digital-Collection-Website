package com.library.catalogue.controller;


import com.library.catalogue.entity.info.PublisherInfo;
import com.library.catalogue.enums.FileType;
import com.library.catalogue.service.PublisherInfoService;
import com.library.catalogue.util.RestConstants;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = RestConstants.API_VERSION_1 +"publisher-info")
public class PublisherInfoController {

    @Autowired
    private final PublisherInfoService publisherInfoService;

    // create, update, delete, and get all
    @PostMapping(value="create")
    @ResponseStatus(HttpStatus.OK)
    public PublisherInfo createPublisherInfo(@Validated @RequestBody PublisherInfo publisherInfo){
        return publisherInfoService.createPublisherInfo(publisherInfo);
    }

    @PutMapping("update/{fileType}")
    @ResponseStatus(value = HttpStatus.OK)
    public PublisherInfo updateFileCategory(@PathVariable FileType fileType, @Validated @RequestBody PublisherInfo publisherInfo){
        return publisherInfoService.updatePublisherInfo(fileType, publisherInfo);
    }

    @DeleteMapping("delete/{fileType}")
    @ResponseStatus(value = HttpStatus.OK)
    public void deleteFileCategory(@PathVariable FileType fileType){
        publisherInfoService.deleteByPublisherInfo(fileType);
    }

    @GetMapping(value = "/all-files")
    @ResponseStatus(value = HttpStatus.OK)
    public List<PublisherInfo> getAllFileCategories(){
        return  publisherInfoService.getAllPublisherInfo();

    }


}
