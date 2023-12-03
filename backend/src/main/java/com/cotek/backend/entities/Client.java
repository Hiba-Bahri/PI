package com.cotek.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper=false)
@Entity(name = "Client")
@PrimaryKeyJoinColumn(name = "client_id")
public class Client extends User {

    @Column(name = "mail", columnDefinition = "VARCHAR(255)", nullable = false)
    private String mail;

    @Column(name = "tel", columnDefinition = "VARCHAR(8)",nullable = false)
    private String tel;
/*    @ManyToOne
    @JsonIgnore
    private Team team;*/
}

