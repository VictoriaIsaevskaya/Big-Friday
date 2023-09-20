import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ModalController} from "@ionic/angular";
import {Store} from "@ngrx/store";
import {Observable, Subject, takeUntil, tap} from "rxjs";

import {selectIsLoggedIn} from "../../state/auth";
import {AuthPromptModalComponent} from "../auth/auth-prompt-modal/auth-prompt-modal.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {
  isLoggedIn$?: Observable<boolean>
  isModalOpen = false;
  private destroy$ = new Subject<void>();


  constructor(private store: Store, private modalController: ModalController, private router: Router) {
  }

  ngOnInit() {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn)
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
