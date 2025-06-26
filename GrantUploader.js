// GrantUploader.js
import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebaseConfig';

export default function GrantUploader() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true });
    if (result.type === 'success') {
      setFile(result);
    }
  };

  const uploadFile = async () => {
    if (!file) return;

    setUploading(true);

    const fileRef = ref(storage, `grants/${file.name}`);
    const fileBlob = await fetch(file.uri).then(res => res.blob());

    await uploadBytes(fileRef, fileBlob);
    const url = await getDownloadURL(fileRef);
    setDownloadUrl(url);

    setUploading(false);
  };

  return (
    <View style={{ marginBottom: 32 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Upload Grant File</Text>
      <Button title="Pick File" onPress={pickFile} />
      {file && <Text style={{ marginTop: 8 }}>Selected: {file.name}</Text>}
      <Button title="Upload File" onPress={uploadFile} disabled={!file || uploading} />
      {uploading && <ActivityIndicator style={{ marginTop: 8 }} />}
      {downloadUrl && (
        <Text style={{ marginTop: 8, color: 'green' }}>Uploaded: {downloadUrl}</Text>
      )}
    </View>
  );
}
