import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isItemCollapsed: boolean = false;
  isTrackCollapsed: boolean = false;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  itemscollapse() {
    if (this.isItemCollapsed === false) {
      this.isTrackCollapsed = false;
      this.isItemCollapsed = true;
    } else { this.isItemCollapsed = false; }
  }

  trackcollapse() {
    if (this.isTrackCollapsed === false) {
      this.isTrackCollapsed = true;
      this.isItemCollapsed = false;
    } else { this.isTrackCollapsed = false; }
  }


}
