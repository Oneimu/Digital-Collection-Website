package com.library.catalogue.util;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;

import java.io.IOException;
import java.io.StringReader;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class ReadUrl {

    // todo: modify code to also read xlsx (xcell format) file

    public Iterable<CSVRecord> readURL(String URL) {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder().uri(URI.create(URL)).build();
        HttpResponse<String> httpResponse = null;
        try {
            httpResponse = client.send(request, HttpResponse.BodyHandlers.ofString());
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        //System.out.println(httpResponse.body());

        StringReader csvBodyReader = new StringReader(httpResponse.body());
        Iterable<CSVRecord> records = null;
        try {
            records = CSVFormat.DEFAULT.withFirstRecordAsHeader().parse(csvBodyReader);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return records;
    }
}
