import { Component, OnInit } from '@angular/core';
import { MorningbrewService } from '../morningbrew.service';
import { BrewPost } from '../model/brewpost';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SettingsRespository } from '../model/settings.repository';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  BrewPosts: BrewPost[];
  CurrentPage: number;
  ErrorMessage: string;

  constructor(private morningbrewservice: MorningbrewService, private inappbrowser: InAppBrowser, 
    private repository: SettingsRespository, private settingsservice: SettingsService) {
    this.repository.getDarkMode()
      .then(value => {
        this.settingsservice.Color = value ? "dark" : "light";         
      })
      .catch(e => this.ErrorMessage = e);
    this.repository.getBaseUrl()
        .then(val => {
          if (!val) {
            val = "http://blog.cwa.me.uk";
          }
          this.settingsservice.BaseUrl = val;
          this.morningbrewservice.createPosts(val).toPromise().then(posts => this.BrewPosts = posts).catch(e => this.ErrorMessage = e);
        })
        .catch(e => this.ErrorMessage = e);
    this.CurrentPage = 1;
    console.log(this.BaseUrl);
  }

  get Color(): string {
    return this.settingsservice.Color;
  }

  get BaseUrl(): string {
    return this.settingsservice.BaseUrl;
  }

  openLink(link: string) {
    this.inappbrowser.create(link); 
  }

  doInfinite(infiniteScroll) {
    this.CurrentPage++;
    this.morningbrewservice.createPosts(this.BaseUrl + "/page/" + this.CurrentPage)
                            .toPromise().then(posts => {
                              this.BrewPosts = this.BrewPosts.concat(posts);
                              infiniteScroll.target.complete();
                            })
                            .catch(e => {
                              console.log(e);
                              infiniteScroll.target.complete();
                            });
    
  }
}
