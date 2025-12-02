
import express from 'express';
import IndexRoute from "./router/index.route.js";
import { db } from './services/firebase.service.js';
import { sendMail } from './services/mail.service.js';

const app = express();

app.use(express.json());
app.use(IndexRoute);

app.get('/saveFirebase', async (req, res) => {
  try {
    const docRef = await db.collection('users').add({ 
      nombre: "Elizabeth",
      apellido: "Trigos",
      correo: "elizabeth@gmail.com"
    });

    res.status(200).send({
      success: true,
      docRef
    });
  } catch (ex) {
    console.log(ex);
    res.send("error");
  }
});

app.get("/usuarios", async (req, res) => {
  const snapshot =  await db.collection('users').get();
  console.log(snapshot.docs);

  const users = snapshot.docs.map(res => ({ id: res.id, ...res.data() }));
  res.json(users);
});

app.get('/sendMail', async (req, res) => {
  const to = 'trigoselizabeth56@gmail.com';
  const subject = '3I-atlas';
  const msg = '<h1>👽 hola eliza boku no kokoro el besto romcom si o que</h1>';

  try {
    const response = await sendMail(to, subject, msg);
    res.json({
      success: true,
      response
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.listen(3000, () => {
  console.log('Hola server . z Z');
});