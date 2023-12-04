package com.cotek.backend.services;

import com.cotek.backend.entities.Client;
import com.cotek.backend.entities.Member;
import com.cotek.backend.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {
    @Autowired
    ClientRepository clientRepo;
    public List<Client> getAllClients() {
        return clientRepo.findAll();
    }
}
