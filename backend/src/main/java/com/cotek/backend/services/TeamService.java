package com.cotek.backend.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import com.cotek.backend.entities.Team;
import com.cotek.backend.repositories.TeamRepository;

@Service
public class TeamService {

    @Autowired
    TeamRepository teamRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

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

    public ResponseEntity<String> deleteTeam(Long id) {
        if (teamRepository.existsById(id)) {
            teamRepository.deleteById(id);
            jdbcTemplate.execute("ALTER TABLE team AUTO_INCREMENT=1");
            return ResponseEntity.ok("Team with ID " + id + " has been deleted.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}