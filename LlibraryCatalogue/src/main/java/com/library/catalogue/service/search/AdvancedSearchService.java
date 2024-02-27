package com.library.catalogue.service.search;

import com.github.openjson.JSONArray;
import com.github.openjson.JSONObject;
import com.library.catalogue.dto.AdvancedSearchDto;
import com.library.catalogue.entity.school.SchoolFunds;
import com.library.catalogue.repository.school.SchoolFundsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;



@Service
@RequiredArgsConstructor
public class AdvancedSearchService {
    private final List<String> STATES = Arrays.asList(
            "Alabama",
            "Alaska",
            "Arizona",
            "Arkansas",
            "California",
            "Colorado",
            "Connecticut",
            "Delaware",
            "Florida",
            "Georgia",
            "Hawaii",
            "Idaho",
            "Illinois",
            "Indiana",
            "Iowa",
            "Kansas",
            "Kentucky",
            "Louisiana",
            "Maine",
            "Maryland",
            "Massachusetts",
            "Michigan",
            "Minnesota",
            "Mississippi",
            "Missouri",
            "Montana",
            "Nebraska",
            "Nevada",
            "New Hampshire",
            "New Jersey",
            "New Mexico",
            "New York",
            "North Carolina",
            "North Dakota",
            "Ohio",
            "Oklahoma",
            "Oregon",
            "Pennsylvania",
            "Rhode Island",
            "South Carolina",
            "South Dakota",
            "Tennessee",
            "Texas",
            "Utah",
            "Vermont",
            "Virginia",
            "Washington",
            "West Virginia",
            "Wisconsin",
            "Wyoming"
    );


    private final SchoolFundsRepository schoolFundsRepository;

    //modify search to advanced sear
    public Page<SchoolFunds> search(String keyword, Pageable page){
        return schoolFundsRepository.search(keyword, page);
    }

    //modify search to advanced sear
    public Page<SchoolFunds> advancedSearch(AdvancedSearchDto advancedSearchDto, Pageable page){
        return schoolFundsRepository.findSchoolFundsByStateContainingIgnoreCaseAndCountyContainingIgnoreCaseAndSchoolNamesContainingIgnoreCaseAndDescriptionContainingIgnoreCase
                (advancedSearchDto.getState(), advancedSearchDto.getCounty(), advancedSearchDto.getSchoolName(), advancedSearchDto.getKeyword(), page);
    }

    public List<String> getStates(){
        return STATES;
    }

    public List<String> getCounty(String state){

        String jsonString = readFile("/Users/luckyabolorunke/Documents/GitHub/LibraryCatalogue/LlibraryCatalogue/src/main/java/com/library/catalogue/service/search/modified_data.json");

        JSONArray statesArray = new JSONArray(jsonString);
        List<String> counties = new ArrayList<>();

        // Find the state entry for the given state name
        for (int i = 0; i < statesArray.length(); i++) {
            JSONObject stateObject = statesArray.getJSONObject(i);
            String currentState = stateObject.getString("State");
            if (state.equals(currentState)) {
                // Extract the counties for the given state
                JSONArray countiesArray = stateObject.getJSONArray("County");

                for (int j = 0; j < countiesArray.length(); j++) {
                    String county = countiesArray.getString(j);
                    counties.add(county);
                }

            }
        }
        return counties;
    }

    private static String readFile(String fileName) {
        try {
            Scanner scanner = new Scanner(new File(fileName));
            StringBuilder builder = new StringBuilder();
            while (scanner.hasNextLine()) {
                builder.append(scanner.nextLine()).append("\n");
            }
            scanner.close();
            return builder.toString();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            return null;
        }
    }


}
