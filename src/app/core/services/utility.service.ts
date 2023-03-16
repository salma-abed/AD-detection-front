import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor() {}
  public prepareFormData(obj: any) {
    let formData = new FormData();
    let keys = Object.keys(obj);
    keys?.forEach((key) => {
      formData.append(key, obj[key]);
    });
    return formData;
  }
}
