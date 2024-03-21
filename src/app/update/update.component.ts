import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  updating: boolean = false;
  success: boolean = false;
  error: string = '';

  constructor(private tokenService: TokenService) { }

  ngOnInit() {
  }

  updateTokenData() {
    this.updating = true;
    this.success = false;
    this.error = '';

    this.tokenService.updateTokenData("0xfE1d7f7a8f0bdA6E415593a2e4F82c64b446d404").subscribe(
      () => {
        this.success = true;
      },
      (error:any) => {
        this.error = error.message;
      }
    ).add(() => {
      this.updating = false;
    });
  }
}
