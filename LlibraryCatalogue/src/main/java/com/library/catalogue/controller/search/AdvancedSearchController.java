package com.library.catalogue.controller.search;

import com.library.catalogue.dto.AdvancedSearchDto;
import com.library.catalogue.dto.AuthResponseDto;
import com.library.catalogue.dto.LoginDto;
import com.library.catalogue.entity.school.SchoolFunds;
import com.library.catalogue.service.search.AdvancedSearchService;
import com.library.catalogue.util.RestConstants;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = RestConstants.API_VERSION_1 +"advance-search")
public class AdvancedSearchController {

    private final AdvancedSearchService advancedSearchService;

    @GetMapping("states")
    public List<String> getAllStates(){
        return advancedSearchService.getStates();
    }

    @GetMapping("counties/{state}")
    public List<String> getCounties(@PathVariable String state){
        return advancedSearchService.getCounty(state);
    }

//    @PostMapping(path="login",  consumes = "application/json")
//    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginDto loginDto) {

    @PostMapping(path="result", consumes = "application/json")
    public Page<SchoolFunds> getSearchData(@RequestBody AdvancedSearchDto advancedSearchDto, Pageable pageable) throws  Exception{
        System.out.println(advancedSearchDto.toString());
        return advancedSearchService.advancedSearch(advancedSearchDto,pageable );

    }
    @PostMapping(path="result/{keyword}/{state}/{county}/{schoolName}")
    public Page<SchoolFunds> getSearchData(@PathVariable String keyword, @PathVariable String state, @PathVariable String county, @PathVariable String schoolName, Pageable pageable) throws  Exception{
//
        AdvancedSearchDto advancedSearchDto = new AdvancedSearchDto();
        if (!county.equals("-")){
            advancedSearchDto.setCounty(county);
        }
        if (!keyword.equals("-")){
            advancedSearchDto.setKeyword(keyword);
        }
        if (!state.equals("-")){
            advancedSearchDto.setState(state);
        }
        if (!schoolName.equals("-")){
            advancedSearchDto.setSchoolName(schoolName);
        }
        System.out.println(advancedSearchDto.toString());

        return advancedSearchService.advancedSearch(advancedSearchDto,pageable );

    }

}
