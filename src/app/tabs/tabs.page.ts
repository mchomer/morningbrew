import { Component } from '@angular/core';
import { SettingsRespository } from '../model/settings.repository';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private settingsservice: SettingsService) {   
  }

  get Color(): string {
    return this.settingsservice.Color;
  }
}
