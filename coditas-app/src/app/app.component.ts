import { Component, OnInit } from '@angular/core';
import { HttpCallerService } from './http-caller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private httpService: HttpCallerService) { }

  ngOnInit() {
  }
  public title = 'coditas-app';
  public baseUrl: string = 'https://api.github.com/search/users';
  public allUsers: object = {
    items: []
  };
  public showList: boolean = false;
  public options: Array<string> = ['Name (A-Z)', 'Name (Z-A)', 'Rank Asc', 'Rank Desc']
  public username: string = '';
  public userDetails: object = {};
  public selectedUser: string = '';
  public collapse: boolean = false;

  public compare(a, b): number {
    if ((event.target as HTMLSelectElement).value === 'Name (A-Z)' || (event.target as HTMLSelectElement).value === 'Name (Z-A)') {
      const firstUser = a.login.toUpperCase();
      const secondUser = b.login.toUpperCase();
      let comparison = 0;
      if (firstUser > secondUser) {
        comparison = 1;
      } else if (firstUser < secondUser) {
        comparison = -1;
      }
      if ((event.target as HTMLSelectElement).value === 'Name (Z-A)') {
        return comparison * -1;
      }
      else {
        return comparison;
      }
    }

    else if ((event.target as HTMLSelectElement).value === 'Rank Asc' || (event.target as HTMLSelectElement).value === 'Rank Desc') {
      const firstScore = a.score;
      const secondScore = b.score;
      let comparison = 0;
      if (firstScore > secondScore) {
        comparison = 1;
      } else if (firstScore < secondScore) {
        comparison = -1;
      }
      if ((event.target as HTMLSelectElement).value === 'Rank Asc') {
        return comparison;
      } else {
        return comparison * -1;
      }
    }
  }

  fetchUsers(e: any): void {
    if ((e.keyCode === 8 || e.which === 8) && (typeof this.username === 'undefined' || this.username === '')) {
      return;
    }
    this.httpService.getData(this.baseUrl, { q: this.username })
      .subscribe(data => {
        this.showList = true;
        this.allUsers = data;
        console.log(data);
      });
  }

  onChange(event: any) {
    this.allUsers['items'].sort(this.compare);
  }

  showUserDetails(event, username: string) {
    this.collapse = !this.collapse;
    this.selectedUser = '';
    this.userDetails = {};
    if (this.collapse === true) {
      this.httpService.getData('https://api.github.com/users/' + username + '/repos')
        .subscribe(data => {
          this.userDetails = data[0];
          this.selectedUser = username;
          console.log('Details Data', data);
        })
    }
  }
}
