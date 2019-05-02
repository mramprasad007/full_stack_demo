import { environment } from "./../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
@Injectable({
  providedIn: "root"
})
export class AppService {
  root = environment.url;
  constructor(private http: HttpClient) {}
  createNewUser(user) {
    const body = JSON.stringify(user);
    return this.http.post(this.root + "/users", body, httpOptions);
  }
  getAllUsers() {
    return this.http.get(this.root + "/users");
  }
}
