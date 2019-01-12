import { Component, OnInit } from '@angular/core';
import { UploadImageService } from '../../shared/services/upload-image.service';
import { FileServer } from '../../model/FileServer.model';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-upload-image',
    templateUrl: './upload-image.component.html',
    styleUrls: ['./upload-image.component.css'],
    providers: [UploadImageService]
})
export class UploadImageComponent implements OnInit {
    caption: string;
    imageUrl = '/assets/img/default-image.png';
    fileToUpload: File = null;
    successUpload: boolean;
    lastUploadedImage: FileServer;
    constructor(private http: HttpClient,
        private uploadImageService: UploadImageService) {
        this.successUpload = false;
    }

    ngOnInit() {
    }

    handleFileInput(file: FileList) {
        this.fileToUpload = file.item(0);

        // Image preview
        const reader = new FileReader();
        reader.onload = (event: any) => {
            this.imageUrl = event.target.result;
        };
        reader.readAsDataURL(this.fileToUpload);
    }

    OnSubmit() {
        const fd = new FormData();
        fd.append('file', this.fileToUpload, this.fileToUpload.name);
        this.uploadImageService.postFile(this.fileToUpload).subscribe(
            res => {
                console.log(res);
                // this.lastUploadedimage = res.fileName.;
                // this.lastUploadedimage = res;
                this.lastUploadedImage = res;
                this.imageUrl = '/assets/img/default-image.png';
                this.caption = null;
                this.successUpload = true;
                this.fileToUpload = null;


            }
        );
    }

}
