import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ToasterService {

    constructor(public toastController: ToastController){}

    async showToaster(message: string, color: string, duration?: number): Promise<void> {
        const toast = await this.toastController.create({
            message,
            duration: duration || 2000,
            color
        });
        toast.present();
    }

}