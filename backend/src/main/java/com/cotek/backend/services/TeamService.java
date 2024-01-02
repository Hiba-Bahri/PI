package com.cotek.backend.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.cotek.backend.entities.Team;
import com.cotek.backend.repositories.TeamRepository;

@Service
public class TeamService {

    @Autowired
    TeamRepository teamRepository;

    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    public ResponseEntity<Team> createTeam(Team team){
        Team createdTeam = teamRepository.save(team);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTeam);
    }

        public ResponseEntity<Team> getTeamById(Long id){
        Optional<Team> team = teamRepository.findById(id);
        if(team.isPresent()){
            return ResponseEntity.ok(team.get());
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    public ResponseEntity<String> archiveTeam(Long id) {
        if (teamRepository.existsById(id)) {
            Team team = teamRepository.findById(id).get();
            team.setStatus("Archived");
            teamRepository.save(team);
            return ResponseEntity.ok("Team with ID " + id + " has been archived.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}