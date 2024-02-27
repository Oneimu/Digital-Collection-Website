package com.library.catalogue.controller.search;


import com.library.catalogue.entity.school.SchoolFunds;
import com.library.catalogue.service.search.SearchService;
import com.library.catalogue.util.RestConstants;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = RestConstants.API_VERSION_1 +"search")
public class SearchController {

    @Autowired
    private final SearchService searchService;

    @GetMapping(value="result/{keyword}")
    @ResponseStatus(value = HttpStatus.OK)
    public Page<SchoolFunds> getSchoolFundsWithKeyword(@PathVariable String keyword, Pageable page){
        return  searchService.search(keyword, page);
    }

    @GetMapping(value="ordered-result/{keyword}")
    @ResponseStatus(value = HttpStatus.OK)
    public Page<SchoolFunds> getOrderedSchoolFundsWithKeyword(@PathVariable String keyword, @PageableDefault(sort = "schoolNames", direction = Sort.Direction.ASC) Pageable page){
        return  searchService.search(keyword, page);
    }





}
