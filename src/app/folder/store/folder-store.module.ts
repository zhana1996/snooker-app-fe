import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { folderReducer } from './reducers/folder.reducers';
import { FolderEffects } from './effects/folder.effects';
import { FolderFacade } from './facade/folder.facade';

@NgModule({
  imports: [
    StoreModule.forFeature('folder', folderReducer),
    EffectsModule.forFeature([FolderEffects]),
  ],
  providers: [FolderFacade]
})
export class FolderStoreModule {}