package com.cotek.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cotek.backend.entities.Member;

public interface MemberRepository  extends JpaRepository<Member, Long>{
}