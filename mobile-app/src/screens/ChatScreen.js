import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessageBubble from '../components/MessageBubble';
import InputBox from '../components/InputBox';
import ChatService from '../services/ChatService';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const flatListRef = useRef(null);

  useEffect(() => {
    loadMessages();
    addBotMessage('Hello! I\'m your AI assistant. How can I help you today?');
  }, []);

  useEffect(() => {
    saveMessages();
  }, [messages]);

  const loadMessages = async () => {
    try {
      const saved = await AsyncStorage.getItem('chatMessages');
      if (saved) {
        setMessages(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const saveMessages = async () => {
    try {
      await AsyncStorage.setItem('chatMessages', JSON.stringify(messages));
    } catch (error) {
      console.error('Failed to save messages:', error);
    }
  };

  const addUserMessage = (text, fileInfo = null) => {
    const newMessage = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date().toISOString(),
      fileInfo,
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addBotMessage = (text) => {
    const newMessage = {
      id: Date.now().toString(),
      text,
      isBot: true,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSend = async (message) => {
    if (!message.trim() && !selectedFile) return;

    setLoading(true);

    try {
      if (selectedFile) {
        addUserMessage(message || 'Sent a file', {
          name: selectedFile.fileName || selectedFile.name,
          type: selectedFile.type,
          uri: selectedFile.uri,
        });

        const response = await ChatService.sendFileMessage(
          message,
          selectedFile.uri,
          selectedFile.fileName || selectedFile.name,
          selectedFile.type
        );

        addBotMessage(response.response);
        setSelectedFile(null);
      } else {
        addUserMessage(message);
        const response = await ChatService.sendMessage(message);
        addBotMessage(response.response);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
      addBotMessage('Sorry, I encountered an error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilePress = () => {
    Alert.alert(
      'Upload File',
      'Choose file type',
      [
        {
          text: 'Image',
          onPress: handleImagePick,
        },
        {
          text: 'Document',
          onPress: handleDocumentPick,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const handleImagePick = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.error) {
          Alert.alert('Error', 'Failed to pick image');
          return;
        }

        const asset = response.assets[0];
        setSelectedFile({
          uri: asset.uri,
          type: asset.type,
          fileName: asset.fileName,
        });
      }
    );
  };

  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      setSelectedFile({
        uri: result[0].uri,
        type: result[0].type,
        name: result[0].name,
      });
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        Alert.alert('Error', 'Failed to pick document');
      }
    }
  };

  const renderMessage = ({ item }) => (
    <View>
      <MessageBubble message={item.text} isBot={item.isBot} />
      {item.fileInfo && (
        <View style={styles.filePreview}>
          {item.fileInfo.type?.startsWith('image/') ? (
            <Image source={{ uri: item.fileInfo.uri }} style={styles.imagePreview} />
          ) : (
            <Text style={styles.fileName}>{item.fileInfo.name}</Text>
          )}
        </View>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        onLayout={() => flatListRef.current?.scrollToEnd()}
      />

      {selectedFile && (
        <View style={styles.selectedFileContainer}>
          <Text style={styles.selectedFileText}>
            📎 {selectedFile.fileName || selectedFile.name}
          </Text>
          <TouchableOpacity onPress={() => setSelectedFile(null)}>
            <Text style={styles.removeFileText}>✕</Text>
          </TouchableOpacity>
        </View>
      )}

      <InputBox
        onSend={handleSend}
        onFilePress={handleFilePress}
        disabled={loading}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  messageList: {
    paddingVertical: 16,
  },
  filePreview: {
    marginHorizontal: 16,
    marginBottom: 8,
    alignItems: 'flex-end',
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  fileName: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  selectedFileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#F3F4F6',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  selectedFileText: {
    fontSize: 14,
    color: '#1F2937',
    flex: 1,
  },
  removeFileText: {
    fontSize: 18,
    color: '#EF4444',
    paddingHorizontal: 12,
  },
});

export default ChatScreen;
