import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BrewPost } from './model/brewpost';
import { BrewTag } from './model/brewtag';
import { BrewLink } from './model/brewlink';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MorningbrewService {
  
  constructor(private http: HttpClient) {    
  }

  getPosts(url: string) {
    let proxyurl = "https://cors-anywhere.herokuapp.com/";
    return fetch(proxyurl + url);
  }

  createPosts(url: string): Observable<BrewPost[]> {
    return Observable.create(observer => {
      this.getPosts(url).then(response => response.text()).then(text => {
        var brewposts: BrewPost[] = [];
        var parser = new DOMParser();
        var doc = parser.parseFromString(text, "text/html");
        let posts = doc.querySelectorAll(".post");     
        posts.forEach(post => {
          brewposts.push(this.createPost(post));
        });
        console.log(brewposts);
        observer.next(brewposts);
        observer.complete();
      }).catch(e => {
        console.log(e);
        observer.next([]);
        observer.complete();
      });
    });
  }

  private createPost(post: Element) : BrewPost {
    let brewpost = new BrewPost();
    let title: any = post.querySelector("h2.post-title").firstChild;
    let ems = post.querySelector("p.day-date").querySelectorAll("em");
    let postedat: any = ems[1].firstChild;
    brewpost.Title = title.title.replace('Permanent Link: ', '');
    brewpost.PostedAt = postedat.data;
    brewpost.Author = ems[0].firstChild.firstChild.nodeValue;
    ems[2].childNodes.forEach(tag => {
      let val: any = tag;
      let brewtag = new BrewTag();
      if (val.href !== undefined) {
        brewtag.Title = val.text;
        brewtag.TagUrl = val.href;
        brewpost.Tags.push(brewtag);
      }
    });
    let content = post.querySelector("div.post-content");
    brewpost.TextContent = content.textContent;
    let headers = content.querySelectorAll("h3");
    let links = content.querySelectorAll("ul");
    headers.forEach((header, i) => {
      let type = header.firstChild.textContent;
      links[i].childNodes.forEach(link => {
        let linkurl: any = link.firstChild;
        if (linkurl !== null) {
          let brewlink = new BrewLink();
          brewlink.Title = link.textContent;
          brewlink.Url = linkurl.href;
          brewlink.Type = type;
          brewpost.Links.push(brewlink);
        }
      });
    });
    return brewpost;
  }
}
