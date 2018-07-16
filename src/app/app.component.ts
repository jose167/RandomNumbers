import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Http } from '@angular/http';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  apiValues: string[] = [];
  myInterval;
  errorMessage: string;
  lError: boolean = false;

  @ViewChild('min') inputMin;
  @ViewChild('max') inputMax;

  constructor(private _service: Http) {
  }

  ngOnInit() {
  }

  Start(): void {
    let valueMin: number;
    let valueMax: number;

    valueMin = this.inputMin.nativeElement.value;
    valueMax = this.inputMax.nativeElement.value;

    if (valueMin == 0 || valueMax == 0)
    {
      this.lError = true;
      this.errorMessage = "Values can't be blank";
    }
    else if (valueMin < 0 || valueMax < 0)
    {
      this.lError = true;
      this.errorMessage = "Values Max and Min must be Positive";
    }
    else {
      this.lError = false;
      this.myInterval = setInterval(() => { this.callServer(valueMin, valueMax); }, 1000);
    }
  }

  Stop(): void {
    clearInterval (this.myInterval);
  }

  callServer(valueMin, valueMax): void {
    console.log(valueMin, " ", valueMax);
    this._service.get("/api/Values/" + valueMin + "/" + valueMax)
      .subscribe(result => {
        let oneValue = result.json();
        this.apiValues.push(oneValue);
      }),
      error => {
        this.errorMessage = error;
        this.lError = true;
      }
  }
}
