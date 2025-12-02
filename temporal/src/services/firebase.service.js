import admin from 'firebase-admin';
import { readFileSync, existsSync } from 'fs';
import 'dotenv/config';

// Busca el archivo de credenciales en la carpeta config
const configPath = './config';
let serviceAccount = null;

if (existsSync(configPath)) {
    const files = require('fs').readdirSync(configPath);
    const firebaseFile = files.find(f => f.includes('firebase') && f.endsWith('.json'));
    if (firebaseFile) {
        serviceAccount = JSON.parse(readFileSync(`${configPath}/${firebaseFile}`, 'utf8'));
    }
}

if (serviceAccount) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL
    });
} else {
    console.warn('⚠️ Firebase credentials not found. Firebase features will not work.');
}

export const db = admin.firestore();
