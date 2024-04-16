import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { BookComponent } from './pages/book/book.component';
import { BookdetailComponent } from './pages/bookdetail/bookdetail.component';
import { SearchbooksComponent } from './pages/searchbooks/searchbooks.component';
import { BuyComponent } from './pages/buy/buy.component';
import { BuydoneComponent } from './pages/buydone/buydone.component';

export const routes: Routes = [
    {
        path: 'home',
        component: BookComponent
    },
    {
        path: 'cart',
        component: CartComponent
    },
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'bookdetail',
        component: BookdetailComponent
    },
    {
        path: 'searchbooks',
        component: SearchbooksComponent
    },    
    {
        path: 'buy',
        component: BuyComponent
    },
    {
        path: 'buydone',
        component: BuydoneComponent
    },
];
