import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { AdminFacade } from 'src/app/admin/store/facade/admin.facade';
import { INews } from 'src/app/folder/store/models/news';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';

const { Camera } = Plugins;

@Component({
  selector: 'add-news',
  templateUrl: 'add-news.component.html',
  styleUrls: ['add-news.component.scss']
})
export class AddNewsComponent implements OnDestroy{
  newsImageUrl: string;
  private _news: INews;
  @Input() edit: boolean;
  public form: FormGroup;

  @Input()
  get news(): INews {
    return this._news;
  }
  set news(value: INews) {
    if (value) {
      this.form.patchValue(value);
      this._news = value;
    }
  }

  private image$: Observable<any>;
  private imageSubs: Subscription;

  constructor(private formBuilder: FormBuilder,
              private popoverController: PopoverController,
              private platform: Platform,
              private actionSheetController: ActionSheetController,
              private facade: AdminFacade) {
    this.image$ = this.facade.response$;
    this.initForm();
  }

  ngOnDestroy(): void {
    this.imageSubs.unsubscribe();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      image: ['', Validators.required],
      url: ['', Validators.required]
    });
  }

  createNews(): void {
    const news = this.form.value;
    if (this.edit) {
      this.facade.updateNews({
        id: this._news.id,
        title: news['title'],
        url: news['url'],
        image: news['image']
      });
    } else {
      this.facade.createNews({
        title: news['title'],
        url: news['url'],
        image: news['image']
      });
    }
    this.popoverController.dismiss();
    setTimeout(() => {
      this.facade.getAllNews();
    }, 1500);
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

    this.newsImageUrl = `data:image/jpeg;base64, ${capturedPhoto.base64String}`;
    const imageName = `${new Date().getTime()}_avatar_image.${
      capturedPhoto.format
    }`;

    this.facade.uploadImage(imageBlob, imageName);

    this.imageSubs = this.image$.subscribe((data: any) => {
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
