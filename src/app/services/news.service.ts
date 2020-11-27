import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { first, last, map, pluck, shareReplay, switchMap, tap } from 'rxjs/operators';
import { Articles } from '../models/Articles';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private url = 'https://newsapi.org/v2/top-headlines';
  private pageSize = 12;
  private apiKey = 'afd8a73dff6041848988bbcd287ce933';
  private country = 'us';
  private pagesInput: Subject<number> = new Subject();
  numberOfPages: Subject<number> = new Subject();

  constructor(private http: HttpClient) {

  }

  fetchNews(category: string = 'business'): Observable<Articles[]> {
    return this.pagesInput.pipe(
      map(page => {
        return new HttpParams().set('apiKey', this.apiKey)
          .set('country', this.country)
          .set('pageSize', String(this.pageSize))
          .set('category', category)
          .set('page', String(page));
      }),
      switchMap((params: HttpParams) => {
        return this.http.get<NewsApiResponse>(this.url, { params });
      }),
      tap((response: { totalResults: number }) => {
        const totalPages = Math.ceil(response.totalResults / this.pageSize);
        this.numberOfPages.next(totalPages);
      }),
      pluck('articles'),
    );
  }

  getPage(page: number) {
    this.pagesInput.next(page);
  }

}

interface NewsApiResponse {
  totalResults: number;
  articles: Articles[];
}

