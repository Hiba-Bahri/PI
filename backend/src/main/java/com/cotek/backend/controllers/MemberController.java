package com.cotek.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.cotek.backend.entities.Member;
import com.cotek.backend.services.MemberService;
import java.util.List;

@RestController
public class MemberController {

    @Autowired
    private MemberService memberService;

    @GetMapping("/getAllMembers")
    public List<Member> getAllMembers(){
        return memberService.getAllMembers();
    }

    @PostMapping("/addMember/{memberId}/In/{teamId}")
    public ResponseEntity<String> addMemberToTeam(@PathVariable Long teamId, @PathVariable Long memberId) {
        memberService.addMemberToTeam(teamId, memberId);
        return ResponseEntity.ok("Member added to the team successfully");
    }

    @DeleteMapping("/removeMember/{memberId}/from/{teamId}")
    public ResponseEntity<?> removeMemberFromTeam(@PathVariable Long teamId, @PathVariable Long memberId) {
        return memberService.removeMemberFromTeam(teamId, memberId);
    }
}