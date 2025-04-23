import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image';

const CacheImage = ({url, style}: {url: string | number, style: any}) => {
  const source = typeof url === 'string' && url.startsWith('http') 
    ? { uri: url, priority: FastImage.priority.high }
    : url as number;

  return (
    <View>
      <FastImage
        style={style}
        source={source}
        resizeMode={FastImage.resizeMode.cover}
      />
    </View>
  )
}

export default CacheImage

// const styles = StyleSheet.create({})