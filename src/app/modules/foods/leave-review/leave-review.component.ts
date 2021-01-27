import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FoodService } from '../../shared/services/food.service';

@Component({
  selector: 'app-leave-review',
  templateUrl: './leave-review.component.html',
  styleUrls: ['./leave-review.component.scss'],
})
export class LeaveReviewComponent implements OnInit {
  rating : number;
  reviewTitle: String;
  reviewText: String;
  isConfirmed: boolean;
  itemId : String;
  vendorId : String;

  constructor(private formBuilder : FormBuilder,
              private router : Router,
              private activatedRoute: ActivatedRoute,
              private foodService : FoodService,
              private toastr: ToastrService) {
    this.reviewText = '';
    this.reviewTitle = '';
    this.itemId = '';
    this.vendorId = '';
    this.rating= 1;
    this.isConfirmed = false;
  }

  ngOnInit(): void {
    this.itemId = this.activatedRoute.snapshot.paramMap.get("itemId") || '';
    this.vendorId = this.activatedRoute.snapshot.paramMap.get("vendorId") || '';
  }

  onSubmit()
  {
    if(this.reviewTitle == '' || this.reviewTitle == undefined || this.reviewTitle == null
      || this.reviewText == '' || this.reviewText == undefined || this.reviewText == null)
    {
      this.toastr.error('Please enter review title and desc','Error!!');
      return false;
    }
    if(!this.isConfirmed)
    {
      this.toastr.error('Please confirm your acknowledgement','Error!!');
      return false;
    }
    this.foodService.submitItemReview(this.itemId,this.reviewText,this.reviewTitle,this.rating,this.vendorId).subscribe((resp : any) => {
      //console.log(resp);
      this.router.navigateByUrl('/foods/detail/' + this.itemId);
    });
    return false;
  }
}
