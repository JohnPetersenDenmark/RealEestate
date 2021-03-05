import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DownloadFileService } from '../download-file.service';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.css']
})
export class ShowImageComponent implements OnInit {

  @Input() downloadImages : any[] = [];
  constructor(private downloadFileService: DownloadFileService, private router: Router) { }

  ngOnInit(): void {
  }

  imageDoSomeThing(event: Event) : void {

  }

  addImage(): void {
    this.router.navigate(["add-image"]);
  }
}
