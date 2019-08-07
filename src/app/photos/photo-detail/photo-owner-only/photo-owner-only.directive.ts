import { Directive, Input, ElementRef, Renderer, OnInit } from '@angular/core';
import { Photo } from '../../photo/photo';
import { PhotoService } from '../../photo/photo.service';
import { UserService } from '../../../core/user/user.service';

@Directive({
    selector: '[photoOwnerOnly]'
})
export class PhotoOwnerOnlyDirective implements OnInit{

    @Input() ownedPhoto: Photo; 

    constructor(private element: ElementRef<any>,
        private renderer: Renderer,
        private userService: UserService
    ) {}

    ngOnInit() {
        this.userService
        .getUser()
        .subscribe(user => {
            if(!user || user.id != this.ownedPhoto.userId) {
                this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none');
            }
        })
    }
}