import {Component, OnInit} from '@angular/core';
import {GithubService} from '../services/github.service';
import {User} from '../models/user';
import {GLOBAL} from '../services/global';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'user-list',
  templateUrl: '../views/user-list.html',
  styleUrls: ['../app.component.css'],
  providers: [GithubService]
})

export class UserListComponent implements OnInit {
  public users: User [];
  public usersFilteredByWord: User [];
  public usersNotFiltered: User [];
  public url: string;
  public avatarNotFound: string;
  public searchWord: string;
  public alertMessage: string;


  constructor(private githubService: GithubService,
              public _DomSanitizer: DomSanitizer) {

    this.url = GLOBAL.url;
    this.users = [];
    this.usersFilteredByWord = [];
    this.usersNotFiltered = [];
    this.avatarNotFound = GLOBAL.avatarNotFound;
    this.searchWord = '';
    this.alertMessage = null;
  }

  ngOnInit() {
    console.log('%c |||||   JC   ||||| ', 'color: green; font-weight: bold; background: black');
    console.log('Loading User List...');
    this.getUsers();
  }

  getUsers () {
    this.users = [];
    this.usersFilteredByWord = [];
    // this.githubService.getUsers().subscribe((data: any) => {
    this.githubService.getUsersFromLocalData().subscribe((data: any) => {
        console.log(data);
        data.map(u => {
          // this.users.push(new User(u.login, u.avatar_url, u.id, u.url));
          this.users.push(u);
        });
      },
      error => {
        const alertMessage = <any>error;
        if (alertMessage != null) {
          this.alertMessage = error.message;
        }
      });
    this.usersNotFiltered = this.users;
  }

  searchForUser(word) {
    if (word.length > 2) {
      console.log('search this word', word);
      this.users = [];
      this.usersFilteredByWord = [];
      this.githubService.searchUsers(word).subscribe((data: any) => {
          console.log(data);
          if (data.total_count && data.total_count > 0) {
            data.items.map(u => {
              // this.users.push(new User(u.login, u.avatar_url, u.id, u.url));
              this.users.push(u);
            });
          }
        },
        error => {
          const alertMessage = <any>error;
          if (alertMessage != null) {
            this.alertMessage = error.message;
          }
        });
    }
  }

  searchForUserFromLocalData(word) {
    if (word.length > 0) {
      this.usersFilteredByWord = [];
      this.users = this.usersNotFiltered;
      console.log('search this word', word);
      this.users.map(u => {
        if (u.login.includes(word.toLowerCase())) {
          this.usersFilteredByWord.push(u);
        }
      });

      if (this.usersFilteredByWord.length > 0) {
        this.alertMessage = null;
        this.users = this.usersFilteredByWord;
      } else {
        this.alertMessage = 'No users found';
        this.users = this.usersNotFiltered;
      }
    } else {
      this.alertMessage = null;
      this.users = this.usersNotFiltered;
    }
  }
}
