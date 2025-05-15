import { Injectable } from '@angular/core';
import { Firestore, collection } from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';

export interface URLUser {
  url: string;
  user: string;
}

@Injectable({
  providedIn: 'root'
})
export class URLUSERService {

  constructor(private firestore: Firestore) { }
  
  sendUrlUser(url: string, user: string) {
    const urlUserRef = collection(this.firestore, 'urlUser');
    const urlUser: URLUser = { url, user };
    return addDoc(urlUserRef, urlUser);
    }
}
