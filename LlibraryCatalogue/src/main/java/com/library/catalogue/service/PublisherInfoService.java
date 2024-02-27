package com.library.catalogue.service;

import com.library.catalogue.entity.info.PublisherInfo;
import com.library.catalogue.enums.FileType;
import com.library.catalogue.expections.NotFoundException;
import com.library.catalogue.repository.PublisherInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PublisherInfoService {

    private final PublisherInfoRepository publisherRightsRepository;


    public PublisherInfo createPublisherInfo(PublisherInfo publisherInfo){
        return publisherRightsRepository.save(publisherInfo);
    }

    public PublisherInfo updatePublisherInfo(FileType fileType, PublisherInfo publisherInfo){
        PublisherInfo publisherInfoUpdate = findByPublisherInfo(fileType);

        publisherInfoUpdate.setSubject(publisherInfo.getSubject());
        publisherInfoUpdate.setPublisher(publisherInfoUpdate.getPublisher());
        publisherInfoUpdate.setRights(publisherInfo.getRights());
        publisherInfoUpdate.setSource(publisherInfo.getSource());
        publisherInfoUpdate.setFormat(publisherInfo.getFormat());
        publisherInfoUpdate.setPublisher(publisherInfo.getPublisher());

        return publisherRightsRepository.save(publisherInfoUpdate);
    }

    public void deleteByPublisherInfo(FileType fileType){
        PublisherInfo publisherInfo = findByPublisherInfo(fileType);
        publisherRightsRepository.delete(publisherInfo);
    }

    public PublisherInfo findByPublisherInfo(FileType fileType){
        Optional<PublisherInfo> optionalPublisherInfo = publisherRightsRepository.findPublisherInfoBySubject(fileType);
        if(!optionalPublisherInfo.isPresent()){
            throw new NotFoundException(String.format("Publisher Info with title %s is not found!", fileType));
        }
        return optionalPublisherInfo.get();
    }

    public List<PublisherInfo> getAllPublisherInfo(){
        return publisherRightsRepository.findAll();
    }

}
