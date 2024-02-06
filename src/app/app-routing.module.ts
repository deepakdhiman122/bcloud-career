import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AirConditionerComponent } from './air-conditioner/air-conditioner.component';
import { CartComponent } from './cart/cart.component';
import { AddemployeeComponent } from './department/admin/addemployee/addemployee.component';
import { AddproductComponent } from './department/admin/addproduct/addproduct.component';
import { AddservicesComponent } from './department/admin/addservices/addservices.component';
import { ViewproductordersComponent } from './department/admin/viewproductorders/viewproductorders.component';
import { ViewserviceordersComponent } from './department/admin/viewserviceorders/viewserviceorders.component';
import { DashboardComponent } from './department/dashboard/dashboard.component';
import { EmployeedashboardComponent } from './department/employee/employeedashboard/employeedashboard.component';
import { UserdashboardComponent } from './department/userdashboard/userdashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ServicesComponent } from './services/services.component';
import { ShopComponent } from './shop/shop.component';
import { AwsComponent } from './aws/aws.component';
import { OrderwisefeedbackComponent } from './department/employee/orderwisefeedback/orderwisefeedback.component';
import { AddnewamcComponent } from './department/admin/addnewamc/addnewamc.component';
import { PopviewComponent } from './department/popview/popview.component';
import { ViewamcordersComponent } from './department/admin/viewamcorders/viewamcorders.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { SecurityComponent } from './security/security.component';
import { ManualordergenerationComponent } from './department/admin/manualordergeneration/manualordergeneration.component';
import { DatewiseexcelreportComponent } from './department/admin/datewiseexcelreport/datewiseexcelreport.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    component: HomeComponent
  },

  {
    path: 'service',
    component: ServicesComponent
  },

  {
    path: 'shopping',
    component: ShopComponent
  },

  {
    path: 'about',
    component: AboutComponent
  },

  {
    path: 'reviews',
    component: ReviewsComponent
  },

  {
    path: 'cart',
    component: CartComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'dashboard',
    component: DashboardComponent
  },

  {
    path: 'service/air-conditioner',
    component: AirConditionerComponent
  },

  {
    path: 'addproducts',
    component: AddproductComponent
  },

  {
    path: 'viewproductorders',
    component: ViewproductordersComponent
  },

  {
    path: 'viewserviceorders',
    component: ViewserviceordersComponent
  },

  {
    path: 'airconditioner',
    component: AirConditionerComponent
  },

  {
    path: 'addservices',
    component: AddservicesComponent
  },

  {
    path: 'addemployee',
    component: AddemployeeComponent
  },

  {
    path: 'userdashboard',
    component: UserdashboardComponent
  },

  {
    path: 'employeedashboard',
    component: EmployeedashboardComponent
  },

  {
    path: 'AWS',
    component: AwsComponent
  },
  {
    path: 'orderwisefeedback',
    component: OrderwisefeedbackComponent
  },
  {
    path: 'addnewamc',
    component: AddnewamcComponent
  },
  {
    path: 'productdetails',
    component: PopviewComponent
  },
  {
    path: 'viewamcorders',
    component: ViewamcordersComponent
  },
  {
    path: 'terms',
    component: TermsComponent
  },
  {
    path: 'privacypolicy',
    component: PrivacypolicyComponent
  },
  {
    path: 'discalmer',
    component: DisclaimerComponent
  },
  {
    path: 'security',
    component: SecurityComponent
  },

  {
    path: 'manualordergeneration',
    component: ManualordergenerationComponent,
    // loadComponent:ManualordergenerationComponent
  },

  {
    path: 'datewiseexcelreport',
    component: DatewiseexcelreportComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
