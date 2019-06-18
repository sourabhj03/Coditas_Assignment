import { Component, OnInit } from '@angular/core';
import { HttpCallerService } from './http-caller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(private httpService: HttpCallerService) {}

  ngOnInit () {
  }
  public title = 'coditas-app';
  public baseUrl: string = 'https://api.github.com/search/users';
  public allUsers = [];
  public showList = false;

  public username = '';

  fetchUsers () {
    this.httpService.httpCallerService(this.baseUrl, {q: this.username})
    .subscribe( data => {
      this.allUsers = data.items;
      this.showList = true;
      console.log(data);
    });
  }
}
