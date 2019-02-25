import { Component } from '@angular/core';
import { SettingsRespository } from '../model/settings.repository';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'settings-app',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  DarkMode: boolean;  

  constructor(private repository: SettingsRespository, private settingsservice: SettingsService) { 
    this.DarkMode = this.settingsservice.Color == "dark";
  }

  get Color(): string {
    return this.settingsservice.Color;
  }

  get BaseUrl(): string {
    return this.settingsservice.BaseUrl;
  }

  darkModeChange() {
    this.repository.setDarkMode(this.DarkMode)
        .then(value => { 
          this.settingsservice.Color = value ? "dark" : "light";
        }).catch(e => console.log(e));    
  }

  baseUrlChange() {
    this.repository.setBaseUrl(this.BaseUrl).then().catch(e => console.log(e));
  }

}
