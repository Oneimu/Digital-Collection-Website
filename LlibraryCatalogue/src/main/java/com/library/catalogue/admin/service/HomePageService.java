package com.library.catalogue.admin.service;

import com.library.catalogue.admin.entity.UploadDataLog;
import com.library.catalogue.admin.enums.FileCategory;
import com.library.catalogue.service.school.SchoolBuildingsService;
import com.library.catalogue.service.school.SchoolFundsService;
import com.library.catalogue.util.csvtodb.SchoolBuildingsToDb;
import com.library.catalogue.util.csvtodb.SchoolFundsToDb;
import lombok.RequiredArgsConstructor;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.UUID;
import java.util.logging.LogRecord;
import java.util.stream.Collectors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipException;
import java.util.zip.ZipFile;
import java.util.zip.ZipInputStream;

@Service
@RequiredArgsConstructor
public class HomePageService {

    /**
     * TODO:
     * 1.
     * retrieve all photos and csv from the unzip folder and transfer it to a folder (photos)
     * delete all the unzip folder and the un-wanted directory.
     *
     * 2.
     * find a way to retrieve content of the csv file and save it to a directory
     */

    // todo: move all links and constant string to properites
    private final SchoolBuildingsToDb schoolBuildingsToDb;
    private final SchoolFundsToDb schoolFundsToDb;

    private final SchoolBuildingsService schoolBuildingsService;

    private final SchoolFundsService schoolFundsService;

    private Logger logger = LoggerFactory.getLogger(LogRecord.class);
    private final String IMAGES_DIRECTORY = "/Users/luckyabolorunke/Desktop/LibraryCatalogueWebsite/";

    private String status = "";

    // modify this method to return a string (string containing message)
    public String extractZipFile(MultipartFile file, FileCategory fileCategory) throws IOException {

        /** save file to temp */
        File zip = File.createTempFile(UUID.randomUUID().toString(), "temp");
        FileOutputStream o = new FileOutputStream(zip);
        IOUtils.copy(file.getInputStream(), o);
        o.close();

        /** destination where the unzip file would be saved */
        String destination = directory(fileCategory);
        int recordCount = 0;
        try {
            ZipFile zipFile = new ZipFile(zip);
            extractZipFile(file, destination);
            // check the zip contains at least an image and a metadata.
            if (checkZipContent(zipFile)){
//                // retrieve zip file pass the zip url to
                recordCount = saveAllCsvToDb(file, fileCategory);
//
//                // extract all the following to destination
                extractZipFile(file, destination);
//
            }

        } catch (ZipException e) {
            e.printStackTrace();
        } finally {
            /** delete temp file */
            zip.delete();
        }
        if (status.isEmpty()){
            return String.format("The Metadata for %s was Successfully Uploaded!\n %s Records was save to the the Database",fileCategory.name(), recordCount );
        }
        return status;

    }

    public void extractZipFile(MultipartFile file, String destinationAddress) throws IOException {

        File zip = File.createTempFile(UUID.randomUUID().toString(), "temp");
        FileOutputStream o = new FileOutputStream(zip);
        IOUtils.copy(file.getInputStream(), o);
        o.close();
        ZipFile zipFile = new ZipFile(zip);

        try (ZipInputStream zipInputStream = new ZipInputStream(file.getInputStream())) {
            ZipEntry zipEntry;

            while ((zipEntry = zipInputStream.getNextEntry()) != null) {

                String entryName = zipEntry.getName();

                try {
                if (!entryName.startsWith("__MACOSX/")) {
                    Path destinationPath = Path.of(destinationAddress, entryName);

                    if (zipEntry.isDirectory()) {
                        Files.createDirectories(destinationPath);
                    } else {
                        Files.createDirectories(destinationPath.getParent());
                        Files.copy(zipInputStream, destinationPath);
                    }
                }
            }catch (FileAlreadyExistsException e){
                    logger.warn(e+"");
                }
            }
        }

        /** Retrieve all the files from the unziped folder and put it in the target folder */
        String zipFileName = file.getOriginalFilename().substring(0, file.getOriginalFilename().length()-4);
        transferFiles(destinationAddress+zipFileName, destinationAddress);
    }

    static void transferFiles(String sourceDir, String targetDir){
        try {
            // Create Path objects for source and destination directories
            Path sourceDirectory = Paths.get(sourceDir);
            Path destinationDirectory = Paths.get(targetDir);

            // Use Files.move to move the contents of the source directory to the destination directory
            Files.walk(sourceDirectory, FileVisitOption.FOLLOW_LINKS)
                    .forEach(source -> {
                        Path destination = destinationDirectory.resolve(sourceDirectory.relativize(source));
                        try {
                            Files.move(source, destination, StandardCopyOption.REPLACE_EXISTING);
                        } catch (IOException e) {
//                            e.printStackTrace();
                        }
                    });

            // Delete the source directory after moving its contents
            Files.delete(sourceDirectory);

//            System.out.println("Contents moved from " + sourceDir + " to " + targetDir);
//            System.out.println("Source directory deleted.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public int saveAllCsvToDb(MultipartFile zipFile, FileCategory fileCategory) {

        int records = 0;

        try (InputStream zipInputStream = zipFile.getInputStream();
             ZipInputStream zis = new ZipInputStream(zipInputStream)) {
            ZipEntry entry;

            while ((entry = zis.getNextEntry()) != null) {
                if (!entry.isDirectory() && entry.getName().endsWith(".csv")) {
                    BufferedReader reader = new BufferedReader(new InputStreamReader(zis));
                    CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withHeader());

                    saveCsvToDb(csvParser, fileCategory);
                    records += 1;

                    csvParser.close();
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return records;
    }


    private boolean checkZipContent(ZipFile zipFile){

        boolean imagePresent = zipFile.stream()
                .map(ZipEntry::getName)
                .anyMatch(name -> name.endsWith(".png")||
                        name.endsWith("jpeg") ||
                        name.endsWith(".tiff") ||
                        name.endsWith("jpg"));
        boolean metadataPresent = zipFile.stream()
                .map(ZipEntry::getName)
                .anyMatch(name -> name.endsWith(".csv")||
                        name.endsWith(".xlsx"));

        // log error: when zip is missing a file
        if (!imagePresent && !metadataPresent){
            status = "Zip File Error: Both image and metadata files are missing in th zip file!!!";
            logger.error("Both image and metadata files are missing in th zip file!!!");
        }else if (!imagePresent) {
            status = "Zip File Error: No Image found in zip!!!";
            logger.error("No Image found in zip!!!");
        }else if (!metadataPresent) {
            logger.error("CSV not found in zip!!!");
            status = "Zip File Error: CSV not found in zip!!!";
        }

        return imagePresent && metadataPresent;
    }

    void test(String fileName) throws IOException {
        FileReader fileReader = null;
        try {
            fileReader = new FileReader(fileName);
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
        CSVFormat csvFileFormat = CSVFormat.DEFAULT.withQuote(null);
        CSVParser csvFileParser = new CSVParser(fileReader, csvFileFormat);

        List<CSVRecord> csvRecords = csvFileParser.getRecords();

        for (CSVRecord csvRecord : csvRecords) {
            System.out.println(csvRecord);
        }
        csvFileParser.close();
    }

    /** todo: return a count of the number of records saved */
    // check csvfile format is correct
    private int saveCsvToDb(CSVParser csvParser, FileCategory fileCategory){
        switch (fileCategory) {
            case SCHOOLBUILDING:
                schoolBuildingsService.saveAllSchoolBuildings(schoolBuildingsToDb.schoolBuildingCvsToDb(csvParser));
            case SCHOOLFUND:
                schoolFundsService.saveAllSchoolFunds(schoolFundsToDb.schoolFundsCvsToDb(csvParser));
        }
        return 0;
    }

    private String directory(FileCategory fileCategory){
        return IMAGES_DIRECTORY + fileCategory.name()+"/";
    }

    // todo: complete this
    private UploadDataLog getDataLog(){
        return null;
    }


    // todo: read through and understand
//    public void extractAll(String zipFilePath, String destinationDirectory) throws IOException {
//        try (ZipFile zipFile = new ZipFile(zipFilePath)) {
//
//            /** */
//            File destDir = new File(destinationDirectory);
//            if (!destDir.exists()) {
//                destDir.mkdirs();
//            }
//
//            Enumeration<? extends ZipEntry> entries = zipFile.entries();
//            while (entries.hasMoreElements()) {
//                ZipEntry entry = entries.nextElement();
//                String entryName = entry.getName();
//                File entryFile = new File(destinationDirectory, entryName);
//
//                if (entry.isDirectory()) {
//                    entryFile.mkdirs();
//                } else {
//                    try (InputStream is = zipFile.getInputStream(entry);
//                         FileOutputStream fos = new FileOutputStream(entryFile)) {
//                        byte[] buffer = new byte[1024];
//                        int bytesRead;
//                        while ((bytesRead = is.read(buffer)) != -1) {
//                            fos.write(buffer, 0, bytesRead);
//                        }
//                    }
//                }
//            }
//        }
//    }

}
