import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss'],
})
export class PlaceOrderComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<PlaceOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public supplierData: any
  ) {}

  ngOnInit(): void {}
}
