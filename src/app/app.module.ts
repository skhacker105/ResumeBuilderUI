import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { HomeComponent } from './components/home/home.component';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InformationComponent } from './components/information/information.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { PersonalInfoComponent } from './components/information/personal-info/personal-info.component';
import { PetProjectsComponent } from './components/information/pet-projects/pet-projects.component';
import { EducationInfoComponent } from './components/information/education-info/education-info.component';
import { ProfessionalInfoComponent } from './components/information/professional-info/professional-info.component';
import { ExpertiseComponent } from './components/information/expertise/expertise.component';
import { CertificationComponent } from './components/information/certification/certification.component';
import { FamilyComponent } from './components/information/family/family.component';
import { LanguageComponent } from './components/information/language/language.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TokenInterceptor } from './services/token.interceptor';
import { PreviewComponent } from './components/preview/preview.component';
import { DefaultComponent } from './components/preview/views/default/default.component';
import { ResumeViewDirective } from './directives/resume-view.directive';
import { ThemesComponent } from './components/preview/themes/themes.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { ProjectsComponent } from './components/preview/views/default/projects/projects.component';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { FooterComponent } from './components/footer/footer.component';
import { StepComponent } from './components/home/step/step.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    InformationComponent,
    PersonalInfoComponent,
    PetProjectsComponent,
    EducationInfoComponent,
    ProfessionalInfoComponent,
    ExpertiseComponent,
    CertificationComponent,
    FamilyComponent,
    LanguageComponent,
    PreviewComponent,
    DefaultComponent,
    ResumeViewDirective,
    ThemesComponent,
    ProjectsComponent,
    FooterComponent,
    StepComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    HttpClientModule,
    MatExpansionModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatCheckboxModule,
    MatChipsModule,
    MatSelectModule,
    MatSnackBarModule,
    NgxMatFileInputModule,
    MatSidenavModule,
    MatTableModule,
    MatListModule,
    MatDividerModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  },
    DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}

