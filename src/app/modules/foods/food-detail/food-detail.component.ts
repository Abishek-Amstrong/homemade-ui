import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../shared/services/cart.service';
import { FoodService } from '../../shared/services/food.service';
import { VendorService } from '../../shared/services/vendor.service';
import {ActivatedRoute, Params} from '@angular/router';
import { PlaceOrderComponent } from '../place-order/place-order.component';

export interface Item{
  ItemImageUrl : string,
  ItemName : string,
  ItemPrice : Number,
  ItemItemId : String,
  ItemVendorId : string
}

export interface ItemDetail 
{
  ItemImageUrl : string,
  ItemName : string,
  ItemUnit : String,
  ItemQuantity : number,
  Itemkeywords : String,
  ItemIsVeg : boolean,
  ItemIngrediants :{
    value : String,
    checked :boolean
  }[],
  ItemDesc : String,
  ItemPrice : number,
  ItemSIze : String,
  ItemItemId : String,
  ItemVendorId : string
}

export interface chef{
  chefId : string,
  firstname : string,
  lastname : string,
  chefImage : string,
  chefRating : number,
  chefstatus : String,
  chefDesc : String
}

export interface Review{
  reviewId : String,
  reviewRating : number,
  reviewDesc : String,
  rewviewTitle : String,
  reviewUserImage : String,
  reviewUserName : String,
  reviewItemId : String,
  reviewCreatedTime : Date
}

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss'],
})
export class FoodDetailComponent implements OnInit {
  foodDetailData: ItemDetail;
  vendorFoodData : Item[];
  reviewData: Review[];
  ratingAvg : number;
  ratingCnt : {
    rating : number,
    count : number,
    percent : number
  }[];
  chefData : chef;
  itemId : string;

  constructor(private dialog: MatDialog,
              private toastr: ToastrService,
              private activatedRoute: ActivatedRoute,
              private vendorService : VendorService,
              private foodService : FoodService,
              private cartService : CartService) 
  {
    this.foodDetailData = {} as ItemDetail;
    this.vendorFoodData = [];
    this.reviewData = [];
    this.itemId = '';
    this.ratingAvg = 0;
    this.ratingCnt = [
      {rating : 1, count : 0, percent : 0},
      {rating : 2, count : 0, percent : 0},
      {rating : 3, count : 0, percent : 0},
      {rating : 4, count : 0, percent : 0},
      {rating : 5, count : 0, percent : 0},
    ];
    this.chefData = {} as chef;
  }

  ngOnInit(): void {
    this.itemId = this.activatedRoute.snapshot.paramMap.get("id") || '';
    this.loadFoodDetails();
    this.loadReviewData();
  }

  loadFoodDetails()
  {
    this.cartService.getItemDetails(this.itemId).subscribe(
      (resp:any) =>{
        //console.log(resp);
        this.foodDetailData.ItemItemId = resp.itemId;
        this.foodDetailData.ItemVendorId = resp.VendorVendorId;
        this.foodDetailData.ItemDesc = resp.desc;
        this.foodDetailData.ItemImageUrl = resp.imagePath;
        this.foodDetailData.ItemName = resp.itemname;
        this.foodDetailData.ItemIsVeg = resp.isVeg;
        this.foodDetailData.Itemkeywords = resp.keyword;
        this.foodDetailData.ItemPrice = resp.price;
        this.foodDetailData.ItemUnit = resp.unit;
        this.foodDetailData.ItemSIze = resp.size;
        this.foodDetailData.ItemIngrediants = [];
        if(resp.ingredients != null && resp.ingredients != undefined)
        {
          if(typeof resp.ingredients == 'string')
          {
            this.foodDetailData.ItemIngrediants.push({value : resp.ingredients, checked : false});
          }
          else
          {
            for(let str of resp.ingredients)
            {
              this.foodDetailData.ItemIngrediants.push({value : str, checked : false});
            }
          }
        }

        this.loadChefDetails(this.foodDetailData.ItemVendorId);
        this.loadOtherChefProducts(this.foodDetailData.ItemVendorId);
        // console.log( this.orderData);
      }
    );
  }

  loadChefDetails(vendorId : String)
  {
    this.vendorService.getVendorDetails(vendorId).subscribe(
      (resp:any) => {
        //console.log(resp);
        this.chefData.chefId = resp.vendorId;
        this.chefData.chefImage = resp.imagePath;
        this.chefData.chefRating = resp.rating;
        this.chefData.firstname = resp.firstname;
        this.chefData.lastname = resp.lastname;
        this.chefData.chefstatus = resp.status;
        this.chefData.chefDesc = resp.user_desc;
      }
    );
  }

  loadReviewData()
  {
    this.foodService.getItemReviews(this.itemId).subscribe(
      (resp:any)=>{
        //console.log('review : ' + resp);
        for(let review of resp)
        {
          if(review != null && review != undefined)
          {
            let currReview : Review = {
              reviewId : review.notesId,
              reviewRating : (review.rating == undefined || review.rating == '' ) ? 0 : Number(review.rating),
              reviewDesc : review.review,
              rewviewTitle : review.reviewTitle,
              reviewUserImage : '',
              reviewUserName : '',
              reviewItemId : this.itemId,
              reviewCreatedTime : review.updated_at
            };
            this.reviewData.push(currReview);
          }
        }
        this.calculateRating();
      }
    );
  }

  calculateRating()
  {
    let sumRating = 0;
    this.reviewData.forEach((ele)=> {
      sumRating += ele.reviewRating
      if(ele.reviewRating >0 && ele.reviewRating <2)
      {
        this.ratingCnt[0].count += 1;
      }
      else if(ele.reviewRating >=2 && ele.reviewRating <3)
      {
        this.ratingCnt[1].count += 1;
      }
      else if(ele.reviewRating >=3 && ele.reviewRating <4)
      {
        this.ratingCnt[2].count += 1;
      }
      else if(ele.reviewRating >=4 && ele.reviewRating <5)
      {
        this.ratingCnt[3].count += 1;
      }
      else if(ele.reviewRating == 5)
      {
        this.ratingCnt[4].count += 1;
      }
    });
    this.ratingCnt.forEach(ele=>{
      ele.percent = (ele.count/this.reviewData.length) * 100
    });
    this.ratingAvg = sumRating / this.reviewData.length;
  }

  loadOtherChefProducts(vendorId : String)
  {
    this.foodService.getSimilarProducts(vendorId).subscribe(
      (resp:any)=>{
        //console.log(resp);
        for(let item of resp)
        {
          let currItem : Item = {
            ItemImageUrl : item.imagePath,
            ItemName : item.itemname,
            ItemPrice : item.price,
            ItemItemId : item.itemId,
            ItemVendorId : item.VendorVendorId
          };
          this.vendorFoodData.push(currItem);
        }
      }
    );
  }

  orderNow(event: any, food: any) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(PlaceOrderComponent, {
      data : { component : 'food-detail-component',data : food}
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
