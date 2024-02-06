import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ServicesComponent } from './services/services.component';
import { ShopComponent } from './shop/shop.component';
import { AboutComponent } from './about/about.component';
import { Navbar2Component } from './navbar2/navbar2.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { AirConditionerComponent } from './air-conditioner/air-conditioner.component';
import { SidenavbarComponent } from './sidenavbar/sidenavbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatBadgeModule } from '@angular/material/badge';
import { AddproductComponent } from './department/admin/addproduct/addproduct.component';
import { ViewproductordersComponent } from './department/admin/viewproductorders/viewproductorders.component';
import { ViewserviceordersComponent } from './department/admin/viewserviceorders/viewserviceorders.component';
import { DashboardComponent } from './department/dashboard/dashboard.component';
import { TableModule } from 'primeng/table';
import { TopnavComponent } from './topnav/topnav.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddservicesComponent } from './department/admin/addservices/addservices.component';
import { AddemployeeComponent } from './department/admin/addemployee/addemployee.component';
import { UserdashboardComponent } from './department/userdashboard/userdashboard.component';
import { EmployeedashboardComponent } from './department/employee/employeedashboard/employeedashboard.component';
import { OrderwisefeedbackComponent } from './department/employee/orderwisefeedback/orderwisefeedback.component';
import { AwsComponent } from './aws/aws.component';
import { AddnewamcComponent } from './department/admin/addnewamc/addnewamc.component';
import { PopviewComponent } from './department/popview/popview.component';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ViewamcordersComponent } from './department/admin/viewamcorders/viewamcorders.component';
import { SearchPipe } from './commonModules/Commonpipes/search.pipe';
import { InputTextModule } from 'primeng/inputtext';
import { TermsComponent } from './terms/terms.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { SecurityComponent } from './security/security.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { ManualordergenerationComponent } from './department/admin/manualordergeneration/manualordergeneration.component';
import { DatewiseexcelreportComponent } from './department/admin/datewiseexcelreport/datewiseexcelreport.component';
import { ImageModule } from 'primeng/image';
import { EmployeeSidenavComponent } from './employee-sidenav/employee-sidenav.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ServicesComponent,
    ShopComponent,
    AboutComponent,
    Navbar2Component,
    ReviewsComponent,
    CartComponent,
    LoginComponent,
    DashboardComponent,
    AirConditionerComponent,
    SidenavbarComponent,
    AddproductComponent,
    ViewproductordersComponent,
    ViewserviceordersComponent,
    TopnavComponent,
    AddservicesComponent,
    AddemployeeComponent,
    UserdashboardComponent,
    EmployeedashboardComponent,
    OrderwisefeedbackComponent,
    AwsComponent,
    AddnewamcComponent,
    PopviewComponent,
    ViewamcordersComponent,
    SearchPipe,
    TermsComponent,
    PrivacypolicyComponent,
    DisclaimerComponent,
    SecurityComponent,
    ManualordergenerationComponent,
    DatewiseexcelreportComponent,
    EmployeeSidenavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      countDuplicates: true,
    }),
    CarouselModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatCardModule,
    MatBadgeModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TableModule,
    AppRoutingModule,
    FlexLayoutModule,
    InputTextModule,
    RadioButtonModule,
    DropdownModule,
    ImageModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }, DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
