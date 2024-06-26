import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TeamService } from '../team.service';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-team-management',
  templateUrl: './team-management.component.html',
  styleUrls: ['./team-management.component.css']
})

export class TeamManagementComponent implements OnInit {
  createSectionVisible: boolean = true;
  formData = { name: '', members: [], status: "active" };
  teams: any[] = [];
  members: any[] = [];
  devMembers: any[] = [];
  testMembers: any[] = [];
  activeTeams: any[] = [];
  scrumManagers: any[] = [];
  teamName: String = '';
  count: number = 0;

  constructor(
    private teamService: TeamService,
    private memberService: MemberService,
    private router: Router
  ) {}

  ngOnInit() {
    this.teamService.getAllTeams().subscribe((data: any) => {
      this.teams = data;
      this.activeTeams= this.teams.filter((team: any) => team.status === 'active');
      this.activeTeams.forEach((team) => {
        this.count += team.members.length;
      });
    });

    this.memberService.getAllMembers().subscribe((data: any) => {
      this.members= data;

      this.devMembers = this.members.filter((member) => member.occupation === 'Developpeur');
      this.testMembers = this.members.filter((member) => member.occupation === 'Testeur');
      this.scrumManagers = this.members.filter((member) => member.occupation === 'Scrum manager');
      
    });
  }

  onSubmit() {
    this.teamService.createTeam(this.formData).subscribe((response) => {
      console.log('Team created successfully:', response);
      this.formData = { name: '', members: [], status: "active" };
      this.teamName = this.formData.name;
      this.createSectionVisible = false;
      this.router.navigate(['/teamManagement']);
      this.ngOnInit();
      }
    );
  }

  add(teamId: number, memberId: number){
    console.log(teamId,memberId);
    this.memberService.addMemberToTeam(teamId,memberId).subscribe((response) => {
      console.log('Member added successfully:', response);
      this.ngOnInit();
  });
  }

  remove(teamId: number, memberId: number){
    this.memberService.removeMemberFromTeam(teamId,memberId).subscribe((response) => {
      console.log('Member removed successfully:', response);
      this.ngOnInit();
  });
  }

  archive(teamId: number){
    this.teamService.archiveTeam(teamId).subscribe((Response)=>{
      console.log('Team archived successfully');
      this.router.navigate(['/teamManagement']);
      this.ngOnInit();
    })
  }  
}