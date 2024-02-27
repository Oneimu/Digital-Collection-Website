package com.library.catalogue.repository.school;

import com.library.catalogue.entity.school.SchoolBuildings;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
@EnableJpaRepositories
public interface SchoolBuildingsRepository extends JpaRepository<SchoolBuildings, String>, PagingAndSortingRepository<SchoolBuildings, String> {
// handle pagination when querying

    Optional<SchoolBuildings> findSchoolBuildingsByUid(String uid);

    List<SchoolBuildings> findSchoolBuildingByStateLikeIgnoreCaseAndCountyLikeIgnoreCaseAndSchoolNamesLikeIgnoreCase(String state, String county, String schoolNames);

    List<SchoolBuildings> findAll();

    @Query("SELECT DISTINCT s FROM SchoolBuildings s GROUP BY s.title HAVING COUNT(s.title) = 1")
    List<SchoolBuildings> findDistinctSchoolBuildingsWithUniqueTitle();

}
