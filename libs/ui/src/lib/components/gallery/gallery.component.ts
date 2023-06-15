import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bluebit-ui-gallery',
  templateUrl: './gallery.component.html',
  styles: [],
})
export class GalleryComponent implements OnInit {
  @Input() mainImage = '';
  selectedImageUrl = '';

  @Input() images: string[] = [];

  ngOnInit(): void {
    if (this.hasImages) {
      this.selectedImageUrl = this.mainImage;
    }
  }

  changeSelectedImage(imageUrl: string) {
    this.selectedImageUrl = imageUrl;
  }

  get hasImages() {
    return this.images?.length > 0;
  }
}
