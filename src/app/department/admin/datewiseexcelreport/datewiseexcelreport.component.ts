import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { DatewiseexcelreportService } from './datewiseexcelreport.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-datewiseexcelreport',
  templateUrl: './datewiseexcelreport.component.html',
  styleUrls: ['./datewiseexcelreport.component.css']
})
export class DatewiseexcelreportComponent {

  form!: FormGroup;

  isEdited: any = 'NO';
  imageurl: any;
  selectedFile!: File;

  list: any = [];
  productlist: any = [];
  excelData: any = [];
  orderlist: any = [];
  productid: any;
  search: any;

  constructor(private service: DatewiseexcelreportService, private toaster: ToastrService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      startdate: new FormControl(null),
      enddate: new FormControl(null),
      ordertype: new FormControl(null)
    });
    let mode = localStorage.getItem("mode");
    if (mode && mode === "dark") {
      const main = document.querySelector("main");
      main?.classList.toggle("dark");
    }
    let status = localStorage.getItem("status");
    if (status && status === 'close') {
      const Sidenav = document.querySelector("nav");
      Sidenav?.classList.toggle("close");
    }
  }
  SideToggle() {
    const Sidenav = document.querySelector("nav");
    Sidenav?.classList.toggle("close");
    if (Sidenav?.classList.contains("close")) {
      localStorage.setItem("status", "close");
    } else {
      localStorage.setItem("status", "open");
    }
  }
  save(): void {
    const jsondata = {
      'startdate': this.datePipe.transform(this.form.controls['startdate'].value, 'yyyy-MM-dd'),
      'enddate': this.datePipe.transform(this.form.controls['enddate'].value, 'yyyy-MM-dd'), 
      'ordertype': this.form.controls['ordertype'].value
    }
    this.service.saveproduct(jsondata).subscribe(data => {
      if (data.status.responseStatus === 'Success') {
        const ordertype = this.form.controls['ordertype'].value;
        this.list = data.response.dataList;
        this.fileDownlod(ordertype);
      }
      else {
        this.toaster.error('Product save Failed', 'ERROR WHILE SAVING');
      }
    });
  }

cname : any;
 mobile : any;
 address : any;
  fileDownlod(ordertype: any){
    console.log(this.list);
    if(ordertype === 'A'){
      for(let stl of this.list){
        if(stl.orderstatus === 'D') {
          stl.orderstatus1 = 'Closed';
        } else if(stl.orderstatus === 'C') {
          stl.orderstatus1 = 'Cancel';
        } else if(stl.orderstatus === 'P') {
          stl.orderstatus1 = 'Pending';
        } else if(stl.orderstatus === 'O') {
          stl.orderstatus1 = 'Open';
        } else if(stl.orderstatus === 'R') {
          stl.orderstatus1 = 'Revert';
        }
        stl.addedon1 = this.datePipe.transform(stl.addedon, 'dd/MM/yyyy');
        stl.modifiedon1 = this.datePipe.transform(stl.modifiedon, 'dd/MM/yyyy');
        const jsondata = {
          'OrderNo'                 : stl.orderid,
          'Name'                    : stl.name,
          'Number'                  : stl.mobileno,
          'Address'                 : stl.address,
          'AMC Name'                : stl.amcname,
          'Generation Date'         : stl.addedon1,
          'Status Updated Date'     : stl.modifiedon1,
          'Contract Start Date'     : stl.contractdate,
          'Contract End Date'       : stl.enddate,
          'Model No'                : stl.modelno,
          'Serial No'               : stl.serialno,
          'Order Status'            : stl.orderstatus1,
          'Grand Total'             : stl.grandtotal
        }
        this.excelData.push(jsondata);
      }
      var amc = { 
        // fieldSeparator: ',',
        // quoteStrings: '"',
        // decimalseparator: '.',
        // showLabels: true, 
        // showTitle: true,
        title: 'Report Data',
        // useBom: true,
        headers: [
          'OrderNo'              ,
          'Name'                 ,
          'Number'               ,
          'Address'              ,
          'AMC Name'             ,
          'Generation Date'      ,
          'Status Updated Date'  ,
          'Contract Start Date'  ,
          'Contract End Date'    ,
          'Model No'             ,
          'Serial No'            ,
          'Order Status'         ,
          'Grand Total'     
      ]
      };
     new ngxCsv(this.excelData, "Date Wise Report", amc);
    } else if(ordertype === 'P' || ordertype === 'S'){
      for(let stl of this.list){
        if(stl.name != null){
          this.cname = stl.name;
        } else if(stl.customername != null){
          this.cname = stl.customername;
        }
        if(stl.mobileno != null){
          this.mobile = stl.mobileno;
        } else if(stl.customermobileno != null){
          this.mobile = stl.customermobileno;
        }
        if(stl.address != null){
          this.address = stl.address;
        } else if(stl.customeraddress != null){
          this.address = stl.customeraddress;
        }
        if(stl.orderstatus === 'D') {
          stl.orderstatus1 = 'Closed';
        } else if(stl.orderstatus === 'C') {
          stl.orderstatus1 = 'Cancel';
        } else if(stl.orderstatus === 'P') {
          stl.orderstatus1 = 'Pending';
        } else if(stl.orderstatus === 'O') {
          stl.orderstatus1 = 'Open';
        } else if(stl.orderstatus === 'R') {
          stl.orderstatus1 = 'Revert';
        }
        stl.addedon1 = this.datePipe.transform(stl.addedon, 'dd/MM/yyyy');
        stl.modifiedon1 = this.datePipe.transform(stl.modifiedon, 'dd/MM/yyyy');
        const jsondata = {
          'OrderNo'                 : stl.orderid,
          'Name'                    : this.cname,
          'Number'                  : this.mobile,
          'Address'                 : this.address,
          'Generation Date'         : stl.addedon1,
          'Status Updated Date'     : stl.modifiedon1,
          'Order Status'            : stl.orderstatus1,
          'Grand Total'             : stl.grandtotal
        }
        this.excelData.push(jsondata);
      }
      var ps = { 
        // fieldSeparator: ',',
        // quoteStrings: '"',
        // decimalseparator: '.',
        // showLabels: true, 
        // showTitle: true,
        title: 'Report Data',
        // useBom: true,
        headers: [
          'OrderNo'              ,
          'Name'                 ,
          'Number'               ,
          'Address'              ,
          'Generation Date'      ,
          'Status Updated Date'  ,
          'Order Status'         ,
          'Grand Total'          
      ]
      };
     new ngxCsv(this.excelData, "Date Wise Report", ps);
    }
  }
  clear(): void {
    this.form.controls['customername'].setValue(null);
    this.form.controls['mobileno'].setValue(null);
    this.form.controls['address'].setValue(null);
    this.form.controls['district'].setValue(null);
    this.form.controls['service'].setValue(null);
  }
}
