import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { DataService, Message } from '../data.service';

@Component({
    selector: 'app-stories',
    templateUrl: './stories.component.html'
})
export class StoriesComponent implements OnInit, AfterViewInit {

    constructor(private Service: DataService) { }
    storiesList = [];
    message: Message = {
        payload: '',
        operation: '',
        type: 'stories',
    };

    stories = {
        name: '',
        description: '',
        priority: '',
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
        this.stories.p_Id = this.Service.currentProject._id;
        this.message.payload = this.stories;
        this.Service.create(this.message).subscribe((res) => {
            console.log(res);
            this.list();
        }, (err) => {
            console.error(err);
        });
    }

    list() {
        this.message.operation = 'read';
        this.message.payload = { id: this.Service.currentProject._id };
        this.Service.read(this.message).subscribe(res => {
            //  console.log(res);
            this.storiesList = res;
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
    functionname(data: any) {
        //  this.list();
        this.stories.priority = data.target.value;
    }

}
