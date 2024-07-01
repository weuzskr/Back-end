package com.starterkit.service;

import com.starterkit.model.Consulat;
import com.starterkit.repository.ConsulatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConsulatService {

    @Autowired
    private ConsulatRepository consulatRepository;

    /*public List<Consulat> getConsulatsByDepartement(Long departementId) {
        return consulatRepository.findByDepartements_Id(departementId);
    }*/
}

