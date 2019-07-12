import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {

  articleForm: FormGroup;
  _id = '';
  title = '';
  author = '';
  description = '';
  content = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getArticle(this.route.snapshot.params.id);
    this.articleForm = this.formBuilder.group({
      'title' : [null, Validators.required],
      'author' : [null, Validators.required],
      'description' : [null, Validators.required],
      'content' : [null, Validators.required]
    });
  }

  getArticle(id: any) {
    this.api.getArticle(id).subscribe((data: any) => {
      this._id = data._id;
      this.articleForm.setValue({
        title: data.title,
        author: data.author,
        description: data.description,
        content: data.content
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateArticle(this._id, this.articleForm.value)
      .subscribe((res: any) => {
          const id = res._id;
          this.isLoadingResults = false;
          this.router.navigate(['/show-article', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  articleDetails() {
    this.router.navigate(['/show-article', this._id]);
  }

}
