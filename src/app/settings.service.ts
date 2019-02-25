import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  Color: string;
  BaseUrl: string;

  constructor() { }
}
