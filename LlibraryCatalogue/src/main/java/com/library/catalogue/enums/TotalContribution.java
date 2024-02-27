package com.library.catalogue.enums;

public enum TotalContribution {

    LEVEL1("<$5000"),
    LEVEL2("$5,000-$10,000"),
    LEVEL3("$10,000-$15,000"),
    LEVEL4(">$15,000");

    private String value;

    TotalContribution(String val){

        value = val;

    }
}
