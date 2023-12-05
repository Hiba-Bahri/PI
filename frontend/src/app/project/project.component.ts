import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../project.service';
import { GestionProjectComponent } from '../gestion-project/gestion-project.component';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit{

  project: any;
  selectedWorkMethodology: string = 'Scrum';
  constructor(private route: ActivatedRoute, private projectService:ProjectService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const projectId = params['projectId'];

      this.projectService.getProjectbyId(projectId).subscribe((result)=>{
        this.project= result as any;
        console.log(this.project)
      })
  })
}

save_work_methodology(id: number) {
  let updatedProject = { ...this.project, methodology: this.selectedWorkMethodology };

  // Assuming you have a method in your ProjectService to update the work methodology
  this.projectService.updateProject(id, updatedProject).subscribe((res)=>{
    console.log("Work Methodology updated successfuly",res);
    this.ngOnInit()
  })
  };
}