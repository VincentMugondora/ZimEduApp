import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();

export const addResource = functions.https.onRequest(async (req, res) => {
  const { title, type, url } = req.body;

  try {
    const resourceRef = await admin.firestore().collection('resources').add({
      title,
      type,
      url,
    });
    res.status(201).send(`Resource added with ID: ${resourceRef.id}`);
  } catch (error) {
    res.status(400).send('Error adding resource: ' + error.message);
  }
});