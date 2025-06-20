import { Component } from '@angular/core';
import { Api } from '../../api';
import { Article } from '../../article';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-articles',
  imports: [
    MatTableModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './articles.html',
  styleUrl: './articles.scss'
})
export class Articles {
  displayedColumns: string[] = ['title', 'author'];
  data: Article[] = [];
  isLoadingResults = true;

  constructor(private api: Api) { }

  ngOnInit() {
    this.api.getArticles()
      .subscribe({
        next: (res) => {
          this.data = res;
          console.log(this.data);
          this.isLoadingResults = false;
        }, error: (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      });
  }
}
