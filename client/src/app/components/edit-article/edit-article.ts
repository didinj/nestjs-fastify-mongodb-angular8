import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Api } from '../../api';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-article',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './edit-article.html',
  styleUrl: './edit-article.scss'
})
export class EditArticle {
  articleForm: FormGroup;
  _id = '';
  title = '';
  author = '';
  description = '';
  content = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private route: ActivatedRoute, private api: Api, private formBuilder: FormBuilder) {
    this.getArticle(this.route.snapshot.params['id']);
    this.articleForm = this.formBuilder.group({
      'title': [null, Validators.required],
      'author': [null, Validators.required],
      'description': [null, Validators.required],
      'content': [null, Validators.required]
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
      .subscribe({
        next: (res) => {
          const id = res._id;
          this.isLoadingResults = false;
          this.router.navigate(['/show-article', id]);
        }, error: (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      });
  }

  articleDetails() {
    this.router.navigate(['/show-article', this._id]);
  }
}
