import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Api } from '../../api';
import { Article } from '../../article';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-show-article',
  imports: [
    RouterModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './show-article.html',
  styleUrl: './show-article.scss'
})
export class ShowArticle {
  article: Article = { _id: '', title: '', author: '', description: '', content: '', updatedAt: null! };
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: Api, private router: Router) { }

  ngOnInit() {
    this.getArticleDetails(this.route.snapshot.params['id']);
  }

  getArticleDetails(id: any) {
    this.api.getArticle(id)
      .subscribe((data: any) => {
        this.article = data;
        console.log(this.article);
        this.isLoadingResults = false;
      });
  }

  deleteArticle(id: any) {
    this.isLoadingResults = true;
    this.api.deleteArticle(id)
      .subscribe({
        next: (res) => {
          this.isLoadingResults = false;
          this.router.navigate(['/articles']);
        }, error: (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      });
  }
}
