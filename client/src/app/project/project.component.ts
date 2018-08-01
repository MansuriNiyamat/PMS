import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';

@Component({
    selector: 'app-project',
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {
  details: UserDetails;

  constructor(private auth: AuthenticationService) {}

  ngOnInit() {

  }
}
