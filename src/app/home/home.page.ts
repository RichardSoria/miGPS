import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCardContent } from '@ionic/angular/standalone';
import { Geolocation } from '@capacitor/geolocation';
import { URLUSERService, URLUser } from '../services/url-user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCardContent],
})
export class HomePage {
  latitude: number | null = null;
  longitude: number | null = null;
  googleMapsUrl: string | null = null;

  newUrlUser: string = '';
  newUrl: string = '';
  newUser: string = 'Richard Mauricio Soria Asanza';


  constructor(private urluserservvice: URLUSERService) {
    this.getCurrentLocation();
  }

  async getCurrentLocation() {
    try {

      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;

      this.googleMapsUrl = `https://www.google.com/maps/@${this.latitude},${this.longitude},15z`;

      this.newUrl = this.googleMapsUrl;

      this.sendUrlUser();

    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
  }

  openGoogleMaps() {
    if (this.googleMapsUrl) {
      window.open(this.googleMapsUrl, '_blank');
    } else {
      console.warn('URL no está lista aún');
    }
  }

  async sendUrlUser() {
    if (this.newUrl && this.newUser) {
      try {
        await this.urluserservvice.sendUrlUser(this.newUrl, this.newUser);
        console.log('URL y usuario enviados correctamente');
        this.newUrl = '';
        // No limpiar this.newUser si es valor fijo
      } catch (error) {
        console.error('Error al enviar la URL y el usuario:', error);
      }
    } else {
      console.warn('Por favor, completa ambos campos');
    }
  }

}
