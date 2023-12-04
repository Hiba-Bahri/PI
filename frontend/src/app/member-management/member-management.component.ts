import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TeamService } from '../team.service';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-member-management',
  templateUrl: './member-management.component.html',
  styleUrls: ['./member-management.component.css']
})


export class MemberManagementComponent implements OnInit {
  createSectionVisible: boolean = true;
  formData = { firstName: '', lastName: '', email: '', login: '', password: '', disponibility: 'true',  occupation: '' };
  members: any[] = [];
  teams: any[] = [];
  devMembers: any[] = [];
  testMembers: any[] = [];
  scrumManagers: any[] = [];
  count: number = 0;  
  selectedMemberId: number = 0;


  constructor(
    private memberService: MemberService,
    private teamService: TeamService,
    private router: Router
  ) {}


  ngOnInit() {
    this.memberService.getAllMembers().subscribe((m: any) => {
      this.members = m;
      this.devMembers = this.members.filter((member) => member.occupation === 'Developpeur');
      this.testMembers = this.members.filter((member) => member.occupation === 'Tester');
      this.scrumManagers = this.members.filter((member) => member.occupation === 'Scrum manager');
    });

    this.teamService.getAllTeams().subscribe((t: any) => {
      this.teams = t;
    });
  }


  autoRefresh() {
    const currentRoute = this.router.url;
    this.router.navigateByUrl(currentRoute, { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
  }


  onSubmit() {
    this.memberService.createMember(this.formData).subscribe((response) => {
      console.log('member created successfully:', response);
      this.formData = { firstName: '', lastName: '', email: '', login: '', password: '', disponibility: '',  occupation: '' };
      this.createSectionVisible = false;
      this.router.navigate(['/member-management']);
      this.autoRefresh();
      }
    );
  }


  selectMemberId(Id: number): void {
    this.selectedMemberId = Id;
  }
  

  add(teamId: number): void{
    console.log(this.selectedMemberId);
    this.memberService.addMemberToTeam(teamId, this.selectedMemberId).subscribe((response: any) => {
      console.log('Member added successfully:', response);
      this.autoRefresh();
    },
    (error) => {
      console.error('Error adding member:', error);
    }
  );
  }


  remove(teamId: number, memberId: number){
    this.memberService.removeMemberFromTeam(teamId,memberId).subscribe((response) => {
      console.log('Member removed successfully:', response);
      this.autoRefresh();
  });
  }

}