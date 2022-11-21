import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProjects } from 'src/app/models/projects';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-pet-projects',
  templateUrl: './pet-projects.component.html',
  styleUrls: ['./pet-projects.component.scss']
})
export class PetProjectsComponent implements OnInit, OnChanges {

  @Input() user: IUser | undefined
  @Input() rowHeight: string = '50px';
  @Input() petProjects: FormArray | undefined;
  @Input() title: string | undefined;
  projects: FormGroup | undefined;
  get projectFormArray(): FormArray { return this.projects?.get('lstProjects') as FormArray; }

  constructor(private fb: FormBuilder) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.projects = this.fb.group({
      lstProjects: this.petProjects
    });
  }

  ngOnInit(): void {
  }

  getProjectTitle(project: any): string {
    return project.get('title').value;
  }

  addPetProject() {
    if (!this.petProjects) return;
    this.projectFormArray.push(this.newProjectsForm());
  }

  deletePetProject(index: number) {
    if (!this.petProjects) return;
    this.projectFormArray.removeAt(index);
  }

  newProjectsForm(data?: IProjects): FormGroup {
    return this.fb.group({
      title: [data?.title, Validators.required],
      projectDuration: this.newDurationForm(),
      myContributions: [data?.myContributions, Validators.required],
      projectDetails: [data?.projectDetails, Validators.required],
      githubLink: [data?.githubLink]
    });
  }

  newDurationForm(): FormGroup {
    return this.fb.group({
      years: [0],
      months: [0],
      days: [0],
      hours: [0],
      minutes: [0],
      seconds: [0],
      milliseconds: [0]
    });
  }

  submitForm() { }

}
