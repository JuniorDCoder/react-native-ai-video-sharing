import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
import Loader from '../../components/Loader'

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext()
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [isSubmitting, setisSubmitting] = useState(false)

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }
    setisSubmitting(true)
    try {
      await signIn(form.email, form.password)

      // set it to global state
      const result = await getCurrentUser()
      setUser(result)
      setIsLogged(true)
      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setisSubmitting(false)
    }
  }

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="justify-center w-full px-4 my-6 min-h-[85vh]">
          <Image 
            source={images.logo}
            resizeMode='contain'
            className="h-[35px] w-[135px]"
          />
          <Text className="mt-10 text-2xl text-white font-psemibold">Log in to Aora</Text>
          <FormField 
            title='Email'
            value={form.email}
            handleChange={(value) => setForm({...form, email: value})}
            otherStyles='mt-7'
            keyboardType='email-address'
          />
          <FormField 
            title='Password'
            value={form.password}
            handleChange={(value) => setForm({...form, password: value})}
            otherStyles='mt-7'
          />

          <CustomButton 
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
          />
          <View className="flex-row justify-center gap-2 pt-5">
            <Text className="text-lg text-gray-100 font-pregular">Don't have an account? </Text>
            <Link href="/sign-up"><Text className="text-lg font-psemibold text-secondary">Sign Up</Text></Link>
          </View>
        </View>
      </ScrollView>

      {/* Use the custom loader */}
      <Loader isLoading={isSubmitting} />
    </SafeAreaView>
  )
}

export default SignIn
