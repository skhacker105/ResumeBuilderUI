import { Component, Input, OnInit } from '@angular/core';
import { IProjects } from 'src/app/models/projects';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  @Input() projects: IProjects[] | undefined;
  @Input() details = false;

  constructor() { }

  ngOnInit(): void {
  }

}
