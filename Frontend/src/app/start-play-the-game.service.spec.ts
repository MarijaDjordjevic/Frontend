import { TestBed, inject } from '@angular/core/testing';

import { StartPlayTheGameService } from './start-play-the-game.service';

describe('StartPlayTheGameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StartPlayTheGameService]
    });
  });

  it('should be created', inject([StartPlayTheGameService], (service: StartPlayTheGameService) => {
    expect(service).toBeTruthy();
  }));
});
