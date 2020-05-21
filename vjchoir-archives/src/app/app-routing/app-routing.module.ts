import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { HomeComponent } from "../pages/home/home.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
  },
  {
    path: "home",
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
