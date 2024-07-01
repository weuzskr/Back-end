package com.starterkit.service;

import com.starterkit.model.Consulat;
import com.starterkit.model.Region;
import com.starterkit.repository.ConsulatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ConsulatService {

    @Autowired
    private ConsulatRepository consulatRepository;

    /*public List<Consulat> getConsulatsByDepartement(Long departementId) {
        return consulatRepository.findByDepartements_Id(departementId);
    }*/


    public Map<Region, List<Consulat>> getAllConsulatsByRegion() {
        List<Consulat> allConsulats = consulatRepository.findAll();
        Map<Region, List<Consulat>> consulatsByRegion = new HashMap<>();

        for (Consulat consulat : allConsulats) {
            for (Region region : consulat.getRegions()) {
                consulatsByRegion
                        .computeIfAbsent(region, k -> new ArrayList<>())
                        .add(consulat);
            }
        }
        return consulatsByRegion;
    }
}

