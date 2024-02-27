package com.library.catalogue.repository;

import com.library.catalogue.entity.info.PublisherInfo;
import com.library.catalogue.enums.FileType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@EnableJpaRepositories
public interface PublisherInfoRepository extends JpaRepository<PublisherInfo, String> {

    Optional<PublisherInfo> findPublisherInfoBySubject(FileType fileType);
}
