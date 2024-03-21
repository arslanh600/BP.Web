import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';
import BigNumber from 'bignumber.js';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  tokenData: any;
  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.fetchTokenData();
  }

  fetchTokenData() {
    this.tokenService.getTokenData().subscribe(
      (data:any) => {
        this.tokenData = data;
      },
      (error:any) => {
        console.error('Error fetching token data:', error);
      }
    );
  }
  formatWeiToEther(weiAmount: string): string {
    const etherAmount = new BigNumber(weiAmount).dividedBy(1e18).toFixed(18);
    return etherAmount;
  }

}
