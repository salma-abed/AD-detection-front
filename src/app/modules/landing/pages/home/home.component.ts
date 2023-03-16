import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ContactUsComponent } from '../contact-us/contact-us.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule,MatGridListModule,MatIconModule,RouterModule,ContactUsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  services = [
    {
      title:"Digital Solutions",
      content:"Huge collection of elements, rich customization options, flexible layouts, and instant results!",
      icon:"phone",
    },
    {
      title:"Digital Solutions",
      content:"Huge collection of elements, rich customization options, flexible layouts, and instant results!",
      icon:"phone",
    },
    {
      title:"Digital Solutions",
      content:"Huge collection of elements, rich customization options, flexible layouts, and instant results!",
      icon:"phone",
    },
  ];

  posts = [
    {
      title:"Anything is possible in this world!",
      content:"“Success is the result of perfection, hard work, learning from failure, loyalty, and persistence” Colin Powell Let me",
      user:{
        name:"name",
        image:"./assets/images/doctor.jpg",
        date:"Sep, 12",
      }
    },
    {
      title:"Helen Keller: A teller and a seller",
      content:"Never ever think of giving up. Winners never quit and quitters never win. Take all negative words out.",
      user:{
        name:"name",
        image:"./assets/images/doctor.jpg",
        date:"Sep, 12",
      }
    },
    {
      title:"Next-generation site builder",
      content:"The goal of every tourist booking is to turn potential leads into guests.",
      user:{
        name:"name",
        image:"./assets/images/doctor.jpg",
        date:"Sep, 12",
      }
    }
  ]

  scrollTo(element:any){
    element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }


}
