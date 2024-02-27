package com.library.catalogue.admin.enums;

public enum FileCategory {

        SCHOOLBUILDING("buildings"),
        SCHOOLFUND("funds"),
        FINANCIALINSTITUTION("Financial Institution"),
        PLACEHOLDER1("PLACEHOLDER1"),
        PLACEHOLDER2("PLACEHOLDER2"),
        PLACEHOLDER3("PLACEHOLDER3");

    private String plainEnglish;

    FileCategory(String name) {
        plainEnglish = name;
    }

    public String getPlainEnglish() {
        return plainEnglish;
    }
}
