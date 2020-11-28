import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from './components/news/news.component';
import { ScrollNewsComponent } from './components/scroll-news/scroll-news.component';


const routes: Routes = [
  { path: '', component: NewsComponent },
  { path: 'scroll-news', component: ScrollNewsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
