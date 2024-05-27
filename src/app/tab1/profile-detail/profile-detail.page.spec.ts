import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { ProfileDetailPage } from './profile-detail.page';

describe('ProfileDetailPage', () => {
  let component: ProfileDetailPage;
  let fixture: ComponentFixture<ProfileDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileDetailPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
