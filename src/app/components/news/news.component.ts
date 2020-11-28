import { Component, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, of, Subject, Subscription, throwError } from 'rxjs';
import { catchError, delay, first, shareReplay, take, takeUntil, tap } from 'rxjs/operators';
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
  isLoading: boolean = false;
  public readonly categories = ['business', 'entertainment', 'health', 'science', 'sports', 'technology'];
  private categorySelected: string = '';
  public errorMessage: string;
  private subscription: Subscription;

  constructor(private newsService: NewsService) {
  }

  ngOnInit() {
    this.fetchingNews();
    this.newsService.numberOfPages.subscribe(res => this.numberOfPages = res);
    this.newsService.getPage(1);
  }

  pageChanged(page: number) {
    this.newsService.getPage(page);
  }

  openLink(link: string) {
    window.open(link, "_blank");
  }

  categoryChange(category: string): void {
    this.categorySelected = category;
  }

  searchCategory(): void {
    this.subscription.unsubscribe();
    this.fetchingNews(this.categorySelected);
    this.newsService.numberOfPages.subscribe(res => this.numberOfPages = res);
    this.newsService.getPage(1);
  }

  private fetchingNews(category = 'business'): void {
    this.subscription = this.newsService.fetchNews(category)
      .pipe(
        catchError(err => {
          if (err) {
            console.log(err.error.message)
            this.errorMessage = err.error.message;
            return EMPTY;
          }
        }),
        tap(res => this.isLoading = true),
        delay(1000)
      ).subscribe(articles => {
        console.log(articles);
        this.assignValues(articles);
      });
  }

  private assignValues(articles: Articles[]) {
    this.isLoading = false;
    this.articles = articles;
  }

}
