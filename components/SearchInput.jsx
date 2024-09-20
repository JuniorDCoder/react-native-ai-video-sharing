import { View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import { router, usePathname } from 'expo-router'

const SearchInput = ({ initialQuery } ) => {
  const pathname = usePathname()

  const [query, setQuery] = useState(initialQuery || '')
    return (
        <View className="flex-row items-center w-full h-16 px-4 space-x-4 border-2 border-black-200 bg-black-100 rounded-2xl focus:border-secondary">
            <TextInput 
                className="flex-1 mt-0.5 text-base text-white font-pregular"
                value={query}
                placeholder="Search for a video topic"
                placeholderTextColor='#CDCDE0'
                onChangeText={(text) => setQuery(text)}
            />

            <TouchableOpacity
                onPress={() => {
                    if(!query) return Alert.alert('Missing query', 'Please enter a search query')
                    if(pathname.startsWith('/search')) {
                        router.setParams({query})
                    } else{
                        router.push(`/search/${query}`)
                    }
                }}
            >
                <Image 
                    source={icons.search}
                    className="w-6 h-6"
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View>

  )
}

export default SearchInput