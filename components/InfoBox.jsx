import { View, Text } from 'react-native'
import React from 'react'

const InfoBox = ({title, subtitle, containerStyles, titleStyles}) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center font-psemibold ${titleStyles}`}>{title}</Text>
      <Text className="text-sm text-center font-pregular text-secondary">{subtitle}</Text>
    </View>
  )
}

export default InfoBox