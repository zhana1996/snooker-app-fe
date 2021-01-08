import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { adminReducer } from './reducers/admin.reducers';
import { AdminEffects } from './effects/admin.effects';
import { AdminFacade } from './facade/admin.facade';

@NgModule({
  imports: [
    StoreModule.forFeature('admin', adminReducer),
    EffectsModule.forFeature([AdminEffects]),
  ],
  providers: [AdminFacade]
})
export class AdminStoreModule {}