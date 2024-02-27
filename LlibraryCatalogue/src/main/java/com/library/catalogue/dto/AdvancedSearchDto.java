package com.library.catalogue.dto;

import lombok.Data;

@Data
public class AdvancedSearchDto {
    private String schoolName = "";

    private String keyword = "";

    private String state = "";

    private String county="";
}
