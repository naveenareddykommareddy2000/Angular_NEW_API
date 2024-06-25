// import { Component, OnInit } from '@angular/core';
// import { ApiService } from '../api.service';
// import { interval, Subscription } from 'rxjs';
// import { switchMap } from 'rxjs/operators';
// @Component({
//   selector: 'app-counter',
//   templateUrl: './counter.component.html',
//   styleUrls: ['./counter.component.css']
// })
// export class CounterComponent implements OnInit {
//   response:any;

//   constructor(private apiService: ApiService) { }

//   ngOnInit(): void {
//     this.getFetchData();
//   }

//   startCounting(): void {
//     this.apiService.saveDataWithDelay().subscribe(() => {
//       console.log('Data saving started');
//     });
//   }
//     getFetchData(): void{
//       this.apiService.getCount().subscribe((data) =>{
//         console.log('count data',data);
//         this.response=data;
//       });
//     }
   
//   }

// counter.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../api.service';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit, OnDestroy {
  count: number = 0;
  subscription: Subscription | undefined;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  
  }

  startCounting(): void {
    this.apiService.saveDataWithDelay().subscribe(() => {
      console.log('Data saving started');
      this.subscription = interval(1000).pipe(
        switchMap(() => this.apiService.getCount())
      ).subscribe(data => {
        console.log('count data', data);
        this.count = data.count;
      });
    });
  }

  pauseCounting(): void {
    this.apiService.pauseCounting().subscribe(() => {
      console.log('Counting paused');
    });
  }

  resumeCounting(): void {
    this.apiService.resumeCounting().subscribe(() => {
      console.log('Counting resumed');
    });
  }

  
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
