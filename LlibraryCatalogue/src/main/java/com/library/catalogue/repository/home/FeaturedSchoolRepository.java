package com.library.catalogue.repository.home;

import com.library.catalogue.entity.home.FeaturedSchools;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@EnableJpaRepositories
public interface FeaturedSchoolRepository extends JpaRepository<FeaturedSchools, String> {

    Optional<FeaturedSchools> findFeaturedSchoolsByUidIgnoreCase(String uid);

}
