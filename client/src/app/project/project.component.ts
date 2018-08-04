import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { DataService, Message } from '../data.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {
  details: UserDetails;
  projectList = [];
  message: Message = {
    payload: '',
    operation: '',
    type: 'project',
  };

  project = {
    name: '',
    description: '',
    owner: '',
    date: '',
  };

  btnFlag = true;
  constructor(private Service: DataService) { }

  ngOnInit() {
    this.list();
  }
  register() {
    // console.log(this.message);
    this.message.operation = 'create';

    this.message.payload = this.project;
    this.Service.create(this.message).subscribe((res) => {
      //  console.log(res);
      this.list();
    }, (err) => {
      console.error(err);
    });
  }

  list() {
    this.message.operation = 'read';

    this.Service.read(this.message).subscribe(res => {
      //  console.log(res);
      this.projectList = res;
    }, (err) => {
      console.error(err);
    });
  }

  delete(data: any) {
    this.message.operation = 'delete';
    this.message.payload = { id: data._id };
    this.Service.delete(this.message).subscribe(res => {
      // console.log(res);
      this.list();
    }, (err) => {
      console.error(err);
    });
  }

  projectClick(item: any) {
    this.Service.currentProject = item;
    this.Service.fProject = false;
    this.Service.fStories = true;
  }
  clear() {
    this.btnFlag = true;
  }
}
