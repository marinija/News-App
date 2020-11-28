import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsComponent } from './components/news/news.component';
import { PaginatorComponent } from './components/shared/paginator/paginator.component';
import { TrimOutletNamePipe } from './pipes/trim-outlet-name.pipe';
import { TruncadePipe } from './pipes/truncade.pipe';
import { LoadingBarComponent } from './components/shared/loading-bar/loading-bar.component';
import { ScrollNewsComponent } from './components/scroll-news/scroll-news.component';
import { HeaderComponent } from './components/header/header.component';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    PaginatorComponent,
    TrimOutletNamePipe,
    TruncadePipe,
    LoadingBarComponent,
    ScrollNewsComponent,
    HeaderComponent,
    InfiniteScrollDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
