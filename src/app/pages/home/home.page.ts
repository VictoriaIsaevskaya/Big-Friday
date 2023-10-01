import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {ModalController} from "@ionic/angular";
import {Store} from "@ngrx/store";
import {Observable, Subject, takeUntil, tap} from "rxjs";

import {AuthPromptModalComponent} from "../../features/auth/auth-prompt-modal/auth-prompt-modal.component";
import {selectIsLoggedIn} from "../../state/auth";
import * as fromAuth from "../../state/auth";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {
  isLoggedIn$?: Observable<boolean>
  isModalOpen = false;
  private destroy$ = new Subject<void>();

  constructor(private store: Store, private afAuth: AngularFireAuth, private modalController: ModalController, private router: Router) {
  }

  ngOnInit() {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn)

    if (localStorage.getItem('loggingOut') === 'true') {
      this.doSignOut();
      localStorage.removeItem('loggingOut');
    }
  }

  async doSignOut() {
    this.store.dispatch(fromAuth.logout())
  }

  private async openAuthPromptModal() {
    if (this.isModalOpen) return;

    const modal = await this.modalController.create({
      component: AuthPromptModalComponent
    });

    this.isModalOpen = true;

    await modal.present();

    modal.onDidDismiss().then(() => {
      this.isModalOpen = false;
    });
  }

  checkLoginAndNavigate() {
    this.isLoggedIn$?.pipe(
      takeUntil(this.destroy$),
      tap(isLoggedIn => !isLoggedIn ? this.openAuthPromptModal() : this.router.navigate(['/events']))
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
