import React from 'react';
import {
  Modal,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Dimensions,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Image } from '../atoms/Image';

interface FullscreenImageModalProps {
  visible: boolean;
  onClose: () => void;
  imageUrl: string | null;
}

const { width, height } = Dimensions.get('window');

const FullscreenImageModal: React.FC<FullscreenImageModalProps> = ({
  visible,
  onClose,
  imageUrl,
}) => {
  if (!imageUrl) {
    return null;
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <BlurView intensity={100} style={styles.blurView}>
        <Pressable style={styles.container} onPress={onClose}>
          <SafeAreaView>
            <Pressable onPress={(e) => e.stopPropagation()}>
              <Image
                source={{ uri: imageUrl }}
                style={styles.image}
                resizeMode="contain"
              />
            </Pressable>
          </SafeAreaView>
        </Pressable>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  blurView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.8,
    aspectRatio: 1,
  },
});

export default FullscreenImageModal; 