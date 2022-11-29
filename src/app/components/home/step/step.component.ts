import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {

  @Input() stepNumber: string | undefined;
  @Input() image: string | undefined;
  @Input() desc: string | undefined;


  constructor() { }

  ngOnInit(): void {
  }

}
