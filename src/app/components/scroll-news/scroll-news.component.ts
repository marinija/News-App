import { Component, OnInit } from '@angular/core';
import { from, of } from 'rxjs';
import { concatMap, delay, first, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Articles } from 'src/app/models/Articles';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-scroll-news',
  templateUrl: './scroll-news.component.html',
  styleUrls: ['./scroll-news.component.scss']
})
export class ScrollNewsComponent implements OnInit {

  public articles: Articles[] = [];
  errorMessage: string = '';
  public addText = ['Morbi leo risus', 'Morbi leo risus', 'Morbi leo risus', 'Morbi leo risus'];
  loadingBar: boolean = false;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.getNews();
  }

  loadItems(newNumber: number) {
    this.getNews(newNumber);
  }

  private getNews(loadMore: number = 1) {
    this.newsService.fetchNews().pipe(
      first(),
      tap(res => this.loadingBar = true),
      switchMap(articles => from(articles)),
      delay(1000),
    ).subscribe(article => {
      this.articles.push(article);
      this.loadingBar = false;
    }, err => {
      this.loadingBar = false;
      this.errorMessage = err.error.message
    });
    this.newsService.getPage(loadMore);
  }

  openLink(link: string) {
    window.open(link, "_blank");
  }

}
