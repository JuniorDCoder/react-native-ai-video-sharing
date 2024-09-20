import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'
import CustomButton from './CustomButton'
import { router } from 'expo-router'
const EmptyState = ({title, subtitle}) => {
  return (
    <View className="items-center justify-center px-4">
      <Image 
        source={images.empty} className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="mt-2 text-xl text-center text-white font-psemibold">{title}</Text>
      <Text className="text-sm text-gray-100 font-pmedium">{subtitle}</Text>
      <CustomButton 
        title="Upload Video"
        handlePress={() => router.push('/create')}
        containerStyles="my-5 w-full"
      />
    </View>
  )
}

export default EmptyState