import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

const FormField = ({title, value, placeholder, handleChange, otherStyles, ...props} ) => {
  const [showPassword, setShowPassword] = useState(false)
    return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
        <View className="flex-row items-center w-full h-16 px-4 border-2 border-black-200 bg-black-100 rounded-2xl focus:border-secondary">
            <TextInput 
                className="flex-1 text-base text-white font-psemibold"
                value={value}
                placeholder={placeholder}
                placeholderTextColor={'#7B7B8B'}
                onChangeText={handleChange}
                secureTextEntry={title === 'Password' && !showPassword}
            />

            {title === 'Password' && (
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Image 
                        source={!showPassword ? icons.eye : icons.eyehide }
                        className="w-8 h-8"
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            )}
        </View>
    </View>
  )
}

export default FormField