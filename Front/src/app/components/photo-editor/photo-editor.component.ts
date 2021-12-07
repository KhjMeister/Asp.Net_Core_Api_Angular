import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Photo } from 'src/app/_models/photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { AlertifyService } from 'src/app/services/alertify.service';
 

 
@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
   @Input() photos: Photo[]=[];
   @Output() getMemberPhotoChange = new EventEmitter<string>();
    uploader:FileUploader ;
    hasBaseDropZoneOver: boolean=false;
    baseUrl = environment.apiUrl;
    currentMain:Photo[]=[];
     
  constructor (
    private authServic:AuthService,
    private userService:UserService,
    private alertify:AlertifyService
  ){
    this.uploader = new FileUploader({
      url: this.baseUrl+'users/'+ this.authServic.decodedToken.nameid+'/photos',

      authToken:'Bearer '+localStorage.getItem('token'),
      isHTML5:true,
      allowedFileType:['image'],
      removeAfterUpload:true,
      autoUpload:false,
      maxFileSize:2*1024*1024
     
    });
    this.uploader.onAfterAddingFile = (file:any)=>{file.withCredentials = false;};
    this.uploader.onSuccessItem = (item,response,status)=>{
      
        const res:Photo = JSON.parse(response);
        const photo = {
          id:res.id,
          url:res.url,
          dateAdded:res.dateAdded,
          description:res.description,
          isMain:res.isMain
        };
        this.photos.push(photo);
        if(photo.isMain){
          this.authServic.changeMemberPhoto(photo.url);
        }
      
    };
  }  
  ngOnInit() {
  }
 fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  setMainPhoto(photo:Photo){
    this.userService.setMainPhoto(this.authServic.decodedToken.nameid,photo.id).subscribe(()=>{
      this.currentMain = this.photos.filter(p=>p.isMain === true);
      this.currentMain[0].isMain = false;
      photo.isMain = true;
     this.authServic.changeMemberPhoto(photo.url);
    //  this.authServic.currentUser.photoUrl = photo.url;
    //  localStorage.setItem('user',JSON.stringify(this.authServic.currentUser));
    },error=>{
      this.alertify.error(error);
    });
  }
  deletePhoto(id:number){
    this.alertify.confirm('آیا برای حذف مطمئنید؟',()=>{
      this.userService.deletePhoto(this.authServic.decodedToken.nameid,id).subscribe(()=>{
        this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
        this.alertify.success('تصویر با موفقیت حذف شد!');
      },error =>{
        this.alertify.error('تصویر حذف نشد!');
      });
    });
  }


}

