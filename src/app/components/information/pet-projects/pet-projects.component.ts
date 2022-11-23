import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupportFunctions } from 'src/app/helpers/support-functions';
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
    this.projectFormArray.push(SupportFunctions.newProjectForm(this.fb));
  }

  deletePetProject(index: number) {
    if (!this.petProjects) return;
    this.projectFormArray.removeAt(index);
  }

  submitForm() { }

}
