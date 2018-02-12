import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {GithubService} from '../services/github.service';
import {User} from '../models/user';
import {GLOBAL} from '../services/global';
import {DomSanitizer} from '@angular/platform-browser';
import { slide, slideInOutAnimation } from '../animations/animations';

@Component({
  selector: 'user-detail',
  templateUrl: '../views/user-detail.html',
  styleUrls: ['../app.component.css'],
  providers: [ GithubService ],
  animations: [ slide, slideInOutAnimation ],
  host: { '[@slideInOutAnimation]': '' }
})

export class UserDetailComponent implements OnInit {
  public user: User;
  public followers;
  public repos;
  public url: string;
  public avatarNotFound: string;
  public alertMessage: string;


  constructor(private githubService: GithubService,
              public _DomSanitizer: DomSanitizer,
              private _route: ActivatedRoute,
              private _router: Router) {
    this.url = GLOBAL.url;
    this.avatarNotFound = GLOBAL.avatarNotFound;
    this.alertMessage = null;
  }

  ngOnInit() {
    console.log('Loading User Detail...');
    this.getUser();
    // this.getUserFromLocalData();
  }

  getUser() {
    this._route.params.forEach((params: Params) => {
      console.log(params);
      const login = params['login'];
      console.log(login);
      if (login) {
        this.githubService.getUserByLogin(login).subscribe((data: any) => {
            console.log(data);
            if (data) {
              this.user = data;
              this.getFollowers(login);
              this.getRepos(login);
              this.alertMessage = null;
            }
          },
          error => {
            const alertMessage = <any>error;
            if (alertMessage != null) {
              this.alertMessage = error.statusText;
              console.log(this.alertMessage);
            }
          });
      }
    });
  }

  getUserFromLocalData() {
    this._route.params.forEach((params: Params) => {
      console.log(params);
      const login = params['login'];
      console.log(login);
      this.githubService.getUserByLoginFromLocalData().subscribe((data: any) => {
          console.log(data);
          if (data) {
            this.user = data;
            this.getFollowersFromLocalData(login);
            this.getReposFromLocalData(login);
            this.alertMessage = null;
          }
        },
        error => {
          const alertMessage = <any>error;
          if (alertMessage != null) {
            this.alertMessage = ' No User to show';
            console.log(this.alertMessage);
          }
        });
    });
  }

  getFollowers(login: string) {
    if (login) {
      this.githubService.getFollowersByLogin(login).subscribe((data: any) => {
          console.log('followers', data);
          if (data) {
            this.followers = data;
          }
        },
        error => {
          const alertMessage = <any>error;
          if (alertMessage != null) {
            this.alertMessage += ' ' + error.statusText;
            console.log(this.alertMessage);
          }
        });
    }
  }

  getFollowersFromLocalData(login) {
    if (login) {
      this.githubService.getFollowersByLoginFromLocalData().subscribe((data: any) => {
          console.log('followers', data);
          if (data) {
            this.followers = data;
          }
        },
        error => {
          const alertMessage = <any>error;
          if (alertMessage != null) {
            this.alertMessage += ' No Followers to show';
            console.log(this.alertMessage);
          }
        });
    }
  }

  getRepos(login: string) {
    if (login) {
      this.githubService.getReposByLogin(login).subscribe((data: any) => {
          console.log('repos', data);
          if (data) {
            this.repos = data;
          }
        },
        error => {
          const alertMessage = <any>error;
          if (alertMessage != null) {
            this.alertMessage += ' ' + error.statusText;
            console.log(this.alertMessage);
          }
        });
    }
  }

  getReposFromLocalData(login: string) {
    if (login) {
      this.githubService.getReposByLoginFromLocalData().subscribe((data: any) => {
          console.log('repos', data);
          if (data) {
            this.repos = data;
          }
        },
        error => {
          const alertMessage = <any>error;
          if (alertMessage != null) {
            this.alertMessage += ' No Repos to show';
            console.log(this.alertMessage);
          }
        });
    }
  }

}
