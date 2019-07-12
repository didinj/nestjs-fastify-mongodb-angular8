import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Article } from './article';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = '/api/article';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(apiUrl)
      .pipe(
        tap(article => console.log('fetched articles')),
        catchError(this.handleError('getArticles', []))
      );
  }

  getArticle(id: number): Observable<Article> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Article>(url).pipe(
      tap(_ => console.log(`fetched article id=${id}`)),
      catchError(this.handleError<Article>(`getArticle id=${id}`))
    );
  }

  addArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(apiUrl, article, httpOptions).pipe(
      tap((art: Article) => console.log(`added article w/ id=${art._id}`)),
      catchError(this.handleError<Article>('addArticle'))
    );
  }

  updateArticle(id: any, article: Article): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, article, httpOptions).pipe(
      tap(_ => console.log(`updated article id=${id}`)),
      catchError(this.handleError<any>('updateArticle'))
    );
  }

  deleteArticle(id: any): Observable<Article> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Article>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted article id=${id}`)),
      catchError(this.handleError<Article>('deleteArticle'))
    );
  }
}
