package com.cotek.backend.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.cotek.backend.entities.Member;
import com.cotek.backend.entities.Team;
import com.cotek.backend.repositories.MemberRepository;
import com.cotek.backend.repositories.TeamRepository;

@Service
public class MemberService {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    private TeamRepository teamRepository;

    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    public ResponseEntity<Member> getMemberById(Long id) {

        Optional<Member> member = memberRepository.findById(id);
        if (member.isPresent()) {
            return ResponseEntity.ok(member.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    public ResponseEntity<?> addMemberToTeam(Long teamId, Long memberId) {

        Optional<Team> optionalTeam = teamRepository.findById(teamId);
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        
        if (optionalTeam.isPresent() && optionalMember.isPresent()) {
            Team team = optionalTeam.get();
            Member member = optionalMember.get();
            team.getMembers().add(member);
            member.setTeam(team);
            memberRepository.save(member);
            teamRepository.save(team);
            return ResponseEntity.ok("Member added from the team successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Team not found with ID: " + teamId);
        }
    }
    
    public ResponseEntity<?> removeMemberFromTeam(Long teamId, Long memberId) {

        Optional<Team> optionalTeam = teamRepository.findById(teamId);

        if (optionalTeam.isPresent()) {

            Team team = optionalTeam.get();
            Member member = team.getMembers().stream()
                    .filter(m -> m.getId().equals(memberId))
                    .findFirst()
                    .orElse(null);

            if (member != null) {
                team.getMembers().remove(member);
                member.setTeam(null);
                teamRepository.save(team);
                memberRepository.save(member);

                return ResponseEntity.ok("Member removed from the team successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Member not found in the team");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Team not found with ID: " + teamId);
        }
    }
}
