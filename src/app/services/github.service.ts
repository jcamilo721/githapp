import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { User} from '../models/user';
import { GLOBAL } from './global';


@Injectable()
export class GithubService {

  public url: string;
  public urlSearchUsers: string;
  public urlLocalData: string;
  public urlByLoginLocalData: string;
  public urlFollowersLocalData: string;
  public urlReposLocalData: string;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
    this.urlSearchUsers = GLOBAL.urlSearchUsers;
    this.urlLocalData = GLOBAL.urlLocalData;
    this.urlByLoginLocalData = GLOBAL.urlByLoginLocalData;
    this.urlFollowersLocalData = GLOBAL.urlFollowersLocalData;
    this.urlReposLocalData = GLOBAL.urlReposLocalData;
  }

  getUserByLogin (login: string) {

    const response$User: Observable<User> = this._http.get(this.url + '/' + login)
      .map((data: any) => data.json());

    response$User.subscribe(data => console.log(data));

    return response$User;
  }

  getFollowersByLogin (login: string) {
    const response$Followers: Observable<User> = this._http.get(this.url + '/' + login + '/followers')
      .map((data: any) => data.json());
    response$Followers.subscribe(data => console.log(data));
    return response$Followers;
  }

  getFollowersByLoginFromLocalData() {
    const response$FollowersFromLocalData: Observable<User> = this._http.
    get(this.urlFollowersLocalData)
      .map((data: any) => data.json());
    response$FollowersFromLocalData.subscribe(data => console.log(data));
    return response$FollowersFromLocalData;
  }

  getReposByLogin (login: string) {
    const response$Repos: Observable<User> = this._http.get(this.url + '/' + login + '/repos')
      .map((data: any) => data.json());
    response$Repos.subscribe(data => console.log(data));
    return response$Repos;
  }

  getReposByLoginFromLocalData() {
    const response$ReposFromLocalData: Observable<User> = this._http.
    get(this.urlReposLocalData)
      .map((data: any) => data.json());
    response$ReposFromLocalData.subscribe(data => console.log(data));
    return response$ReposFromLocalData;
  }

  getUserByLoginFromLocalData() {
    const response$UsersFromLocalData: Observable<User> = this._http.
    get(this.urlByLoginLocalData)
      .map((data: any) => data.json());
    response$UsersFromLocalData.subscribe(data => console.log(data));
    return response$UsersFromLocalData;
  }

  getUsers() {

    const response$Users: Observable<User> = this._http.get(this.url)
      .map((data: any) => data.json());

    response$Users.subscribe(data => console.log(data));

    return response$Users;
  }

  searchUsers (word: string) {
    console.log('get users by word: ', word);

    const response$UsersByWord: Observable<User> = this._http.get(this.urlSearchUsers + word)
      .map((data: any) => data.json());

    response$UsersByWord.subscribe(data => console.log(data));

    return response$UsersByWord;

  }

  getUsersFromLocalData() {

    const response$UsersFromLocalData: Observable<User> = this._http.
    get(this.urlLocalData)
      .map((data: any) => data.json());

    response$UsersFromLocalData.subscribe(data => console.log(data));

    return response$UsersFromLocalData;
  }
}
