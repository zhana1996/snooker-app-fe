import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { UserFacade } from '../store/facade/user.facade';

const { Camera } = Plugins;

@Component({
  selector: 'registration',
  templateUrl: 'registration.component.html',
  styleUrls: ['registration.component.scss']
})
export class RegistrationComponent implements OnDestroy {
  public form: FormGroup;
  public inventoryImageUrl: string;

  private image$: Observable<any>;
  private imageSubs: Subscription;

  constructor(public router: Router,
              public facade: UserFacade,
              public formBuilder: FormBuilder,
              private platform: Platform,
              private cdr: ChangeDetectorRef,
              private actionSheetController: ActionSheetController,
              public route: ActivatedRoute) {
    this.image$ = this.facade.response$;
    this.initForm();
  }

  ngOnDestroy(): void {
    this.imageSubs.unsubscribe();
  }

  createNewUserProfile(): void {
    let user = this.form.value;
    this.facade.createNewUser({
      username: user['userName'],
      email: user['email'],
      password: user['password'],
      role: user['role'],
      userDetails: {
        name: user['name'],
        gender: user['gender'],
        age: +user['age'],
        break: +user['break'],
        club: user['club'],
        startDate: user['startPeriod'],
        image: user['image']
      }
    });
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      userName: ['', Validators.required],
      gender: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      club: ['', Validators.required],
      age: ['', Validators.required],
      break: ['', Validators.required],
      email: ['', Validators.required],
      startPeriod: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  async openCameraOptions() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Избери',
      cssClass: 'stc-action-sheet',
      buttons: [
        {
          text: 'Албум',
          icon: 'image',
          handler: async () => await this.captureInventory(CameraSource.Photos),
        },
        {
          text: 'Камера',
          icon: 'camera',
          handler: async () => await this.captureInventory(CameraSource.Camera),
        },
        {
          text: 'Откажи',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  private async captureInventory(source: CameraSource): Promise<void> {
    if (!this.platform.is('cordova')) {
      return;
    }
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source,
      quality: 50,
    });

    const imageBlob = b64toBlob(
      capturedPhoto.base64String,
      `image/${capturedPhoto.format}`
    );

    this.inventoryImageUrl = `data:image/jpeg;base64, ${capturedPhoto.base64String}`;
    const imageName = `${new Date().getTime()}_avatar_image.${
      capturedPhoto.format
    }`;

    this.facade.uploadImage(imageBlob, imageName);

    this.imageSubs = this.image$.subscribe((data: any) => {
      console.log(data);
      if (data) {
        this.form.get('image').setValue(data['filename']);
      }
    });
  }
}

const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};
