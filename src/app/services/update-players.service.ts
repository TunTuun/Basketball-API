import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UpdatePlayersService {
  public submitted = new Subject();

  constructor() {}

  public isSubmitted(): void {
    this.submitted.next();
  }
}
