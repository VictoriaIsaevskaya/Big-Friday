import {Component, OnDestroy} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {ModalController} from "@ionic/angular";
import {Store} from "@ngxs/store";
import {Subject, takeUntil, tap} from "rxjs";

import {AuthState} from "../../state/auth";
import {AuthPromptComponent} from "../auth/auth-prompt/auth-prompt.component";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(private store: Store, private afAuth: AngularFireAuth, private modalController: ModalController,
              private router: Router) {}

  checkLoginAndNavigate() {
    this.store.select(AuthState.isLoggedIn).pipe(
      takeUntil(this.destroy$),
      tap(isLoggedIn => !isLoggedIn ? this.router.navigate(['auth/prompt']) : this.router.navigate(['/events']))
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
