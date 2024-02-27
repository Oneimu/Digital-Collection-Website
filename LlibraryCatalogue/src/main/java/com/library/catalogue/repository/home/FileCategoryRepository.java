package com.library.catalogue.repository.home;

import com.library.catalogue.entity.home.FileCategoryInfo;
import com.library.catalogue.enums.FileType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@EnableJpaRepositories
public interface FileCategoryRepository extends JpaRepository<FileCategoryInfo, String> {

    Optional<FileCategoryInfo> findByFileCategory(FileType fileType);
}
