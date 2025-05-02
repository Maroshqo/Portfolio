import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {ProjectsComponent} from './pages/projects/projects.component';
import {AiToolsComponent} from './pages/ai-tools/ai-tools.component';
import {ContactComponent} from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'ai-tools', component: AiToolsComponent },
  { path: 'contact', component: ContactComponent },
];
