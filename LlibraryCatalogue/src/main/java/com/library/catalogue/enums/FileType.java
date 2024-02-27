package com.library.catalogue.enums;

public enum FileType {

        SCHOOLBUILDING("School Building"),
        SCHOOLFUND("School buildings; budget"),
        FINANCIALINSTITUTION("Financial Institution"),
        PLACEHOLDER1("PLACEHOLDER1"),
        PLACEHOLDER2("PLACEHOLDER2"),
        PLACEHOLDER3("PLACEHOLDER3");

        private String plainEnglish;

        FileType(String name) {
            plainEnglish = name;
        }

        public String getPlainEnglish() {
            return plainEnglish;
        }
}
