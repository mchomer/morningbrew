import { NgModule } from "@angular/core";
import { IonicStorageModule } from '@ionic/storage';
import { SettingsRespository } from "./settings.repository";
import { SettingsService } from "../settings.service";

@NgModule({
    imports: [IonicStorageModule.forRoot({
        name: '__mydb',
           driverOrder: ['indexeddb']
      })],
      providers: [SettingsRespository, SettingsService]
})
export class ModelModule { }