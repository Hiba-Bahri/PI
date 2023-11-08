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
  formData = { name: '', members: [] };
  teams: any[] = [];
  members: any[] = [];
  devMembers: any[] = [];
  testMembers: any[] = [];
  scrumManagers: any[] = [];
  teamName: String = '';
  count: number = 0;

  constructor(
    private teamService: TeamService,
    private memberService: MemberService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.teamService.getAllTeams().subscribe((data: any) => {
      this.teams = data;

      this.teams.forEach((team) => {
        this.count += team.members.length;
      });
    });

    this.memberService.getAllMembers().subscribe((data: any) => {
      this.members= data;

      this.devMembers = this.members.filter((member) => member.profession === 'Developpeur');
      this.testMembers = this.members.filter((member) => member.profession === 'Testeur');
      this.scrumManagers = this.members.filter((member) => member.profession === 'Scrum manager');
      
    });
  }

  autoRefresh() {
    const currentRoute = this.router.url;
    this.router.navigateByUrl(currentRoute, { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
  }

  onSubmit() {
    this.teamService.createTeam(this.formData).subscribe((response) => {
      console.log('Team created successfully:', response);
      this.formData = { name: '', members: [] };
      this.teamName=this.formData.name;
      this.createSectionVisible = false;
      this.router.navigate(['/team-management']);
      this.autoRefresh();
      }
    );
  }

  add(teamId: number, memberId: number){
    console.log(teamId,memberId);
    this.memberService.addMemberToTeam(teamId,memberId).subscribe((response) => {
      console.log('Member added successfully:', response);
      this.autoRefresh();
  });
  }

  remove(teamId: number, memberId: number){
    this.memberService.removeMemberFromTeam(teamId,memberId).subscribe((response) => {
      console.log('Member removed successfully:', response);
      this.autoRefresh();
  });
  }

  delete(teamId: number){
    this.teamService.deleteTeam(teamId).subscribe((Response)=>{
      console.log('Team removed successfully');
      this.router.navigate(['/team-management']);
      this.autoRefresh();
    })
  }  
}