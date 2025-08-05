import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blank-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blank-page.component.html',
  styleUrls: ['./blank-page.component.css']
})
export class BlankPageComponent {

}