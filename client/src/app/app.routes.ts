import { Routes } from '@angular/router';
import { Articles } from './components/articles/articles';
import { ShowArticle } from './components/show-article/show-article';
import { AddArticle } from './components/add-article/add-article';
import { EditArticle } from './components/edit-article/edit-article';

export const routes: Routes = [
    {
        path: 'articles',
        component: Articles,
        data: { title: 'List of Articles' }
    },
    {
        path: 'show-article/:id',
        component: ShowArticle,
        data: { title: 'Show Product' }
    },
    {
        path: 'add-article',
        component: AddArticle,
        data: { title: 'Add Article' }
    },
    {
        path: 'edit-article/:id',
        component: EditArticle,
        data: { title: 'Edit Article' }
    },
    {
        path: '',
        redirectTo: '/articles',
        pathMatch: 'full'
    }
];
