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
        p_Id: '',
        _id: ''
    };
    btnFlag = true;
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
    edit(data: any) {
       // this.task = data;
       this.task.name = data.name;
       this.task.description = data.description;
       this.task.priority = data.priority;

       this.task.owner = data.owner;
       this.task.hours = data.hours;
       this.task.start = data.start;
       this.task.status = data.status;
       this.task.s_Id = data.s_Id;
       this.task.p_Id = data.p_Id;
       this.task._id = data._id;

       this.btnFlag = false;
    }
    update() {
        this.message.operation = 'update';
        this.message.payload = this.task;

        this.Service.update(this.message).subscribe(res => {
            // console.log(res);
            this.list();
        }, (err) => {
            console.error(err);
        });
        this.clear();
    }
    priority(data: any) {
        this.task.priority = data.target.value;
    }
    status(data: any) {
        this.task.status = data.target.value;
    }
    clear() {
        this.task.name = '';
        this.task.description = '';
        this.task.owner = '';
        this.task.hours = '';
        this.task.start = '';
        this.task.status = '';
        this.task.s_Id = '';
        this.task.p_Id = '';
        this.btnFlag = true;
      }

}
