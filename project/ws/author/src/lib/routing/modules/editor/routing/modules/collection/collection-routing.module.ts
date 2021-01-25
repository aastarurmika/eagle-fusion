import { CourseCollectionComponent } from './components/course-collection/course-collection.component'
// import { CollectionComponent } from './components/collection/collection.component'
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    component: CourseCollectionComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class CollectionRoutingModule { }
