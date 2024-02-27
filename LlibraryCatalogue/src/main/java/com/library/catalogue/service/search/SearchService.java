package com.library.catalogue.service.search;


import com.library.catalogue.entity.school.SchoolFunds;
import com.library.catalogue.repository.school.SchoolFundsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final SchoolFundsRepository schoolFundsRepository;

    public Page<SchoolFunds> search(String keyword, Pageable page){
        return schoolFundsRepository.search(keyword, page);
    }


}
