package com.library.catalogue.repository.school;

import com.library.catalogue.entity.school.SchoolFunds;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface SchoolFundsRepository extends JpaRepository<SchoolFunds, String> {

    Optional<SchoolFunds> findSchoolFundsByUid(String uid);

    // search
    @Query("SELECT s FROM SchoolFunds s WHERE  s.title LIKE %?1%")
    Page<SchoolFunds> search(String keyword, Pageable pageable);

    // advanced search
//    Page<SchoolFunds>
//    findSchoolFundsAndBuildingsByStateContainsIgnoreCaseAndCountyContainsIgnoreCaseAndSchoolNamesContainsIgnoreCaseAndDescriptionContainsIgnoreCase
//            (String state, String county, String schoolNames, String title, Pageable pageable);

    Page<SchoolFunds> findSchoolFundsByStateContainingIgnoreCaseAndCountyContainingIgnoreCaseAndSchoolNamesContainingIgnoreCaseAndDescriptionContainingIgnoreCase(String state, String county, String schoolNames, String description, Pageable pageable);

    Page<SchoolFunds> findSchoolFundsByStateLikeIgnoreCaseAndCountyLikeIgnoreCaseAndSchoolNamesLikeIgnoreCaseAndDescriptionLikeIgnoreCase(String state, String county, String schoolNames, String title, Pageable pageable);




}
