// GrantViewer.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from './firebaseConfig';
const formBaseUrl = "https://docs.google.com/forms/d/e/1FAIpQLSc15CMpxo3Hn3M2zW0R2r6-WTq-H1J19Y_50L2q07bfziYGQ/viewform?usp=pp_url/&entry.1173199779=";
const openPreFilledForm = (fileUrl) => {
  const formUrl = '${formBaseUrl}${encodeURIComponent(fileUrl)}';
  Linking.openURL(formUrl);
};

export default function GrantViewer() {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUploads = async () => {
    try {
      const listRef = ref(storage, 'grants/');
      const res = await listAll(listRef);
      const files = await Promise.all(
        res.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return { name: item.name, url };
        })
      );
      setUploads(files);
    } catch (error) {
      console.error('Error loading files:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUploads();
  }, []);

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Uploaded Grants</Text>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={uploads}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 12 }}>
              <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                <Text style={{ color: 'blue' }}>{item.name}</Text>
              <TouchableOpacity 
              
             <TouchableOpacity
               OnPress={()=> openPreFilledForm(item.url)}
               style={{
                 marginTop:4,
                 backgroundColor: '#222',
                 padding: 6,
                 borderRadius: 5,
                 alignSelf: 'flex-start',
               }}
               <Text style={{ color: 'blue', marginBottom: 8 }}>{item.name}</Text>
                 {item.name}
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      );
    }
