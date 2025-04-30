import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationComponent } from './navigation.component';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppMaterialModule,
        NoopAnimationsModule,
        NavigationComponent
      ],
      providers: [
        provideRouter([
          { path: 'dashboard', component: {} as any },
          { path: 'list', component: {} as any }
        ])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a toolbar with title', () => {
    const toolbar = fixture.debugElement.query(By.css('mat-toolbar'));
    expect(toolbar).toBeTruthy();
    
    const title = toolbar.nativeElement.textContent;
    expect(title).toContain('Golden Raspberry Awards');
  });

  it('should have navigation links to Dashboard and Movie List', () => {
    const links = fixture.debugElement.queryAll(By.css('a[mat-button]'));
    expect(links.length).toBe(2);
    
    expect(links[0].nativeElement.textContent).toContain('Dashboard');
    expect(links[0].attributes['routerLink']).toBe('/dashboard');
    
    expect(links[1].nativeElement.textContent).toContain('Lista de Filmes');
    expect(links[1].attributes['routerLink']).toBe('/list');
  });

  it('should navigate to Dashboard when Dashboard link is clicked', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');
    
    const dashboardLink = fixture.debugElement.queryAll(By.css('a[mat-button]'))[0];
    dashboardLink.nativeElement.click();
    
    expect(navigateSpy).toHaveBeenCalledWith(router.createUrlTree(['/dashboard']), jasmine.anything());
  });

  it('should navigate to Movie List when Lista de Filmes link is clicked', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');
    
    const movieListLink = fixture.debugElement.queryAll(By.css('a[mat-button]'))[1];
    movieListLink.nativeElement.click();
    
    expect(navigateSpy).toHaveBeenCalledWith(router.createUrlTree(['/list']), jasmine.anything());
  });
});