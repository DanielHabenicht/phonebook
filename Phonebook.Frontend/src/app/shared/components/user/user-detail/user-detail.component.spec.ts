import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UserDetailComponent } from 'src/app/shared/components/user/user-detail/user-detail.component';
import { Person } from 'src/app/shared/models';
import { PersonService } from 'src/app/services/api/person.service';
import { mockPerson } from 'src/app/shared/mocks/person';

class MockPersonService {
  public getById(id: String): Person {
    return mockPerson;
  }
}

xdescribe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserDetailComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: PersonService, useClass: MockPersonService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
