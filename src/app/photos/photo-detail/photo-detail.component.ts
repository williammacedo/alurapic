import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';
import { AlertService } from '../../shared/components/alert/alert.service';

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.css']
})
export class PhotoDetailComponent implements OnInit {

  photo$: Observable<Photo>;
  photoId: number;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.photoId = this.route.snapshot.params['photoId']
    this.photo$ = this.photoService
      .findById(this.photoId);
  }

  remove() {
    this.photoService
      .removePhoto(this.photoId)
      .subscribe(
        () => {
          this.alertService.success('Photo removed');
          this.router.navigate(['']);
        },
        err => {
          console.log(err)
          this.alertService.warning('Could not delete the photo!')
        }
      );
  }

}
