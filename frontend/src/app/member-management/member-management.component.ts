import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TeamService } from '../team.service';
import { MemberService } from '../member.service';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-member-management',
  templateUrl: './member-management.component.html',
  styleUrls: ['./member-management.component.css']
})


export class MemberManagementComponent implements OnInit {
  createSectionVisible: boolean = true;
  formData = { firstName: '', lastName: '', email: '', login: '', password: '', disponibility: 'true',  occupation: '', role: '' };
  members: any[] = [];
  teams: any[] = [];
  devMembers: any[] = [];
  testMembers: any[] = [];
  activeTeams:any[] = [];
  scrumManagers: any[] = [];
  count: number = 0;  
  selectedMemberId: number = 0;
  notif={message:'',receiver:''}
  team: any={}
  member:any={};


  constructor(
    private memberService: MemberService,
    private teamService: TeamService,
    private router: Router,
    private notificationService: NotificationsService
  ) {}


  ngOnInit() {
    this.memberService.getAllMembers().subscribe((m: any) => {
      this.members = m;
      this.devMembers = this.members.filter((member) => member.occupation === 'Developper');
      this.testMembers = this.members.filter((member) => member.occupation === 'Tester');
      this.scrumManagers = this.members.filter((member) => member.occupation === 'Scrum manager');
      console.log(this.testMembers);
    });

    this.teamService.getAllTeams().subscribe((t: any) => {
      this.teams = t;
      this.activeTeams= this.teams.filter((team: any) => team.status === 'active');
      this.activeTeams.forEach((team) => {
        this.count += team.members.length;
      });
    });
  }

  onSubmit() {
    this.memberService.createMember(this.formData).subscribe((response) => {
      console.log('member created successfully:', response);
      this.formData = { firstName: '', lastName: '', email: '', login: '', password: '', disponibility: '',  occupation: '', role: '' };
      this.createSectionVisible = false;
      this.router.navigate(['/member-management']).then(()=>{
        location.reload();
      })
      
      this.ngOnInit();
      }
    );
  }


  selectMemberId(Id: number): void {
    this.selectedMemberId = Id;
  }
  

  add(teamId: number): void{
    console.log(this.selectedMemberId);
    this.memberService.addMemberToTeam(teamId, this.selectedMemberId).subscribe((response: any) => {
          this.teamService.getTeamById(teamId).subscribe((res)=>{
            this.team = res as any;
            console.log("The TEAM IS :",this.team)
            this.memberService.getMemberById(this.selectedMemberId).subscribe((res2)=>{
              this.member = res2;
              console.log("THE MEMBER IS",this.member)
              this.notif.message="You have been added to team : "+this.team.name
              this.notif.receiver=this.member.login
              this.notificationService.saveNotif(this.notif).subscribe((not)=>{
                console.log("Notification saved");
              })
            })
          })
      console.log('Member added successfully:', response);
      this.ngOnInit();
    },
    (error) => {
      console.error('Error adding member:', error);
    }
  );
  }


  remove(teamId: number, memberId: number){
    this.memberService.removeMemberFromTeam(teamId,memberId).subscribe((response) => {
      console.log('Member removed successfully:', response);
      this.ngOnInit();
  });
  }

}