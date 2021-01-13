import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Homemade-UI';
  public isShow : boolean = false;
  public layer_is_visible : boolean = false;
  public is_show_normal  : boolean = false;

  constructor()
  {
  }

  enableSandwichMenu()
  {
    this.isShow = this.isShow == true ? false : true;
    this.layer_is_visible = this.layer_is_visible == true ? false : true;
  }
  
  expandCollapseSandwichSubMenu()
  {
    this.is_show_normal = this.is_show_normal == true ? false : true;
  }
}
