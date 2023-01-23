import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { MarketingPlanComponent } from './components/marketing-plan/marketing-plan.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'marketing-plan', component: MarketingPlanComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
