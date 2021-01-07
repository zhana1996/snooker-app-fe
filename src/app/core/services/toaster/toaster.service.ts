import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ToasterService {

    constructor(public toastController: ToastController){}

    async showToaster(message: string, color: string): Promise<void> {
        const toast = await this.toastController.create({
            message,
            duration: 2000,
            color
        });
        toast.present();
    }

}