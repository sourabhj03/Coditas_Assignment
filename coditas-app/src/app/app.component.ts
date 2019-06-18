import { Component } from '@angular/core';
import { HttpCallerService } from './http-caller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(private httpService: HttpCallerService) {}
  title = 'coditas-app';
  baseUrl: string = 'https://api.github.com/search/users';

  public username = '';

  fetchUsers () {
    this.httpService.httpCallerService(this.baseUrl, {q: this.username})
    .subscribe( data => {
      console.log(data);
    });
  }
  clickeve(): void {
    alert('HI');
  }
}
