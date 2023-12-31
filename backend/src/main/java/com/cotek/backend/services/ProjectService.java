package com.cotek.backend.services;

import com.cotek.backend.entities.Project;
import com.cotek.backend.entities.Team;
import com.cotek.backend.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public List<Project> getAllProjects(){
        return projectRepository.findAll();
    }

    public ResponseEntity<Project> getProjectById(Long id){
        Optional<Project> project = projectRepository.findById(id);
        if(project.isPresent()){
            return ResponseEntity.ok(project.get());
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    public ResponseEntity<Project> createProject(Project p){
        // Check if the owner already owns a project
        if (p.getOwner() != null && p.getOwner().getOwnedProject() != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // or handle as appropriate
        }

        Project createdProject = projectRepository.save(p);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProject);
    }

    public ResponseEntity<Project> updateProject(Long id, Project editedProject){
        if (projectRepository.existsById(id)){
            Project existingProject = projectRepository.findById(id).get();
            if(editedProject.getTitle()!=null){
                existingProject.setTitle(editedProject.getTitle());
            }
            if(editedProject.getDescription()!=null){
                existingProject.setDescription(editedProject.getDescription());
            }
            if(editedProject.getOwner() != null){
                existingProject.setOwner(editedProject.getOwner());
            }
            if(editedProject.getTechnologies() != null){
                existingProject.setTechnologies(editedProject.getTechnologies());
            }
            if(editedProject.getKeywords() != null){
                existingProject.setKeywords(editedProject.getKeywords());
            }
            if(editedProject.getStatus() != null){
                existingProject.setStatus(editedProject.getStatus());
            }
            if(editedProject.getMethodology() != null){
                existingProject.setMethodology(editedProject.getMethodology());
            }
            Project updatedProject = projectRepository.save(existingProject);
            return  ResponseEntity.ok(updatedProject);
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @Autowired
    private JdbcTemplate jdbcTemplate;
    public ResponseEntity<String> deleteProject(Long id){
        if (projectRepository.existsById(id)){
            projectRepository.deleteById(id);
            jdbcTemplate.execute("ALTER TABLE project AUTO_INCREMENT=1");
            return ResponseEntity.ok("Project with ID " + id + " has been deleted.");
        }else{
            return  ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<Project> updateProjectTeam(Long id, Team teamid){
        if (projectRepository.existsById(id)){
            Project exising = projectRepository.findById(id).get();
            exising.setTeam(teamid);
            projectRepository.save(exising);
        }
        return ResponseEntity.ok().build();
    }

    public Project getProjectByOwner(Long ownerId) {
        return projectRepository.findByOwner_Id(ownerId);
    }
}
