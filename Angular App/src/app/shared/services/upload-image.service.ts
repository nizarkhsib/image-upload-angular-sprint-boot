import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FileServer } from '../../model/FileServer.model';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class UploadImageService {
  endpoint = 'http://localhost:8080/uploadFile';

  constructor(private http: HttpClient) { }

  postFile(fileToUpload: File): Observable<any> {

    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(this.endpoint, formData);
  }

}
