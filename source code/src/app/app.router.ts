import { Routes} from '@angular/router';
import { HomeComponent} from '../app/components/home/home/home.component'

export const ROUTES :Routes = 
[
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
    },
    {
        path: 'home',
         component: HomeComponent
    }
]