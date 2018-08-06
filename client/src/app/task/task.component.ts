import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { DataService, Message } from '../data.service';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html'
})
export class TaskComponent implements OnInit, AfterViewInit {

    constructor(private Service: DataService) { }
    taskList = [];
    message: Message = {
        payload: '',
        operation: '',
        type: 'task',
    };

    task = {
        name: '',
        description: '',
        priority: '',
        owner: '',
        hours: '',
        start: '',
        status: '',
        s_Id: '',
        p_Id: ''
    };

    ngOnInit() {

    }
    ngAfterViewInit() {
        this.list();
    }
    register() {
        // console.log(this.message);
        this.message.operation = 'create';
        this.task.p_Id = this.Service.currentProject._id;
        this.task.s_Id = this.Service.currentStories._id;
        this.message.payload = this.task;
        this.Service.create(this.message).subscribe((res) => {
            console.log(res);
            this.list();
        }, (err) => {
            console.error(err);
        });
    }

    list() {
        this.message.operation = 'read';
        this.message.payload = { id: this.Service.currentStories._id };
        this.Service.read(this.message).subscribe(res => {
            //  console.log(res);
            this.taskList = res;
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
    priority(data: any) {
        this.task.priority = data.target.value;
    }
    status(data: any) {
        this.task.status = data.target.value;
    }

}
