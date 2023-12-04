package com.cotek.backend.services;

import java.security.SecureRandom;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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

    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";

    private static final int PASSWORD_LENGTH = 12;


    /*boolean isPasswordMatch = passwordEncoder.matches(passwordToHash, hashedPassword);
    System.out.println("Password Match: " + isPasswordMatch);*/
    

    public static String generatePassword() {
        StringBuilder password = new StringBuilder();

        Random random = new SecureRandom();

        for (int i = 0; i < PASSWORD_LENGTH; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            password.append(CHARACTERS.charAt(randomIndex));
        }

        /*BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(password.toString());

        return hashedPassword;*/
        return password.toString();
    }

    public ResponseEntity<Member> createMember(Member m){
        memberRepository.save(m);
        m.setLogin(m.getFirstName() + '_' + m.getId());
        m.setPassword(generatePassword());
        Member createdMember = memberRepository.save(m);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdMember);
    }

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
            member.setDisponibility("false");
            memberRepository.save(member);
            teamRepository.save(team);
            memberId = 0L;
            return ResponseEntity.ok().body("Member added from the team successfully");
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
                member.setDisponibility("true");
                teamRepository.save(team);
                memberRepository.save(member);

                return ResponseEntity.ok().body("Member removed from the team successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Member not found in the team");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Team not found with ID: " + teamId);
        }
    }
}
