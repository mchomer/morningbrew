import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';

@Injectable()
export class SettingsRespository {
    constructor(private storage: Storage) {
    }

    getDarkMode(): Promise<boolean> {
        return this.storage.get("darkmode");
    }   
    
    getBaseUrl(): Promise<string> {
        return this.storage.get("baseurl");
    }

    getReadUrls(): Promise<string[]> {
        return this.storage.get("readurls");
    }

    setDarkMode(darkmode: boolean): Promise<any> {
        return this.storage.set("darkmode", darkmode);
    }

    setBaseUrl(baseurl: string): Promise<any> {
        return this.storage.set("baseurl", baseurl);
    }

    setReadUrls(readurls: string[]) {
        return this.storage.set("readurls", readurls);
    }
}