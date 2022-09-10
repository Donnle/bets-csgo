import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BetsPageComponent} from "./pages/bets-page/bets-page.component";

const routes: Routes = [
  {
    path: '',
    component: BetsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
