import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-leave-review',
  templateUrl: './leave-review.component.html',
  styleUrls: ['./leave-review.component.scss'],
})
export class LeaveReviewComponent implements OnInit {
  rating = 0;
  reviewTitle: string;
  reviewText: string;
  isConfirmed: boolean;

  constructor() {
    this.reviewText = '';
    this.reviewTitle = '';
    this.isConfirmed = false;
  }

  ngOnInit(): void {}
}
