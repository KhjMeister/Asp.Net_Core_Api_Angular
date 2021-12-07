import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-slideShow',
  templateUrl: './slideShow.component.html',
  styleUrls: ['./slideShow.component.css']
})
export class SlideShowComponent implements OnInit {
  @Input() user:any;
  
  role: Number=1;
  public selectedindex: number = 1;
  public images:Object=[];
  //  ['assets/w3images/img_mountains.jpg', 'assets/w3images/img_lights.jpg', 'assets/w3images/img_snowtops.jpg'];
  

  selectImage(index: number) {
    this.selectedindex = index;
  }
  showSlides() {
   
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
      (<HTMLElement>slides[i]).style.display = "none";
    }
    this.selectedindex++;
    if (this.selectedindex > slides.length) { this.selectedindex = 1 }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    (<HTMLElement>slides[this.selectedindex - 1]).style.display = "block";
    dots[this.selectedindex - 1].className += " active";
    setTimeout(this.showSlides, 2000);
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { 
      this.role = 1;
     }

  ngOnInit() {
   
    this.showSlides();
  }

}
