import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from './reducers/user.reducers';
import { UserEffects } from './effects/user.effects';
import { UserFacade } from './facade/user.facade';

@NgModule({
  imports: [
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forFeature([UserEffects]),
  ],
  providers: [UserFacade]
})
export class UserStoreModule {}