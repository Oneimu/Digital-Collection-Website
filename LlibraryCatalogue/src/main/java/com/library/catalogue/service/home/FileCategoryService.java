package com.library.catalogue.service.home;

import com.library.catalogue.entity.home.FileCategoryInfo;
import com.library.catalogue.enums.FileType;
import com.library.catalogue.expections.NotFoundException;
import com.library.catalogue.repository.home.FileCategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FileCategoryService {

    @Autowired
    private final FileCategoryRepository fileCategoryRepository;

    public FileCategoryInfo createFileCategoryInfo(FileCategoryInfo fileCategoryInfo){
        return fileCategoryRepository.save(fileCategoryInfo);
    }

    public List<FileCategoryInfo>  createMultipleFileCategoryInfo(List<FileCategoryInfo> fileCategoryInfos){
        return fileCategoryRepository.saveAll(fileCategoryInfos);
    }

    public FileCategoryInfo updateFileCategory(FileType fileType, FileCategoryInfo fileCategoryInfo){
        FileCategoryInfo fileCategoryInfoUpdate = findByFileCategory(fileType);
        fileCategoryInfoUpdate.setFileCategory(fileCategoryInfo.getFileCategory());
        fileCategoryInfoUpdate.setDescription(fileCategoryInfo.getDescription());
        fileCategoryInfoUpdate.setImageUrl(fileCategoryInfo.getImageUrl());

        return fileCategoryRepository.save(fileCategoryInfoUpdate);
    }

    public void deleteFileCategory(FileType fileType){
        FileCategoryInfo fileCategoryInfo = findByFileCategory(fileType);
        fileCategoryRepository.delete(fileCategoryInfo);
    }

    public FileCategoryInfo findByFileCategory(FileType fileType){
        Optional<FileCategoryInfo> optionalFileCategoryInfo = fileCategoryRepository.findByFileCategory(fileType);
        if(!optionalFileCategoryInfo.isPresent()){
            throw new NotFoundException(String.format("File category with title %s is not found!", fileType));
        }
        return optionalFileCategoryInfo.get();
    }

    public List<FileCategoryInfo> getAllFileCategories(){
        return fileCategoryRepository.findAll();
    }


}
