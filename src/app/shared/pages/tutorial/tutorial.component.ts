import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss'],
  standalone: false,
})
export class TutorialComponent  implements OnInit {
  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };
  constructor() { }

  ngOnInit() {}

}
