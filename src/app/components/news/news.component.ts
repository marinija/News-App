import { Component, OnInit } from '@angular/core';
import { delay, tap } from 'rxjs/operators';
import { Articles } from 'src/app/models/Articles';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  articles: Articles[] = [];
  numberOfPages: number = 0;
  isLoading: boolean = false;;

  constructor(private newsService: NewsService) {
  }

  ngOnInit() {
    this.newsService.pagesOutput
      .pipe(
        tap(res => this.isLoading = true),
        delay(1000),
      ).subscribe(articles => {
        console.log(articles);
        this.isLoading = false;
        this.articles = articles;
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
      });
    this.newsService.numberOfPages.subscribe(res => this.numberOfPages = res);
    this.newsService.getPage(1);
  }

  pageChanged(page: number) {
    this.newsService.getPage(page);
  }

  openLink(link: string) {
    window.open(link, "_blank");
  }

}
