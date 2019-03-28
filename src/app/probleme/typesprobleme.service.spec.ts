
import { TestBed } from '@angular/core/testing';

import { TypesproblemeService } from './typesprobleme.service';

describe('TypesproblemeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypesproblemeService = TestBed.get(TypesproblemeService);
    expect(service).toBeTruthy();
  });
});

