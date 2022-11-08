import React, { useState, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Training } from './Components/Training'
import { Settings } from './Components/Settings'
import { Info } from './Components/Info'
import { Practice } from './Components/Practice'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import * as Sentry from 'sentry-expo'

const Tab = createBottomTabNavigator()

export default function App() {
  // Sentry.init({
  //   dsn: 'https://f8a007ec62f84c2685b5a71e817fa704@o4504085906653184.ingest.sentry.io/4504085922971648',
  //   enableInExpoDevelopment: true,
  //   debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  // })

  const [storageProgress, setStorageProgress] = useState({ pad: 1, type: 'singular' })
  const [maxScoreToWin, setMaxScoreToWin] = useState(15)
  const [shouldReadStorage, setShouldReadStorage] = useState(false)

  const readStoragePad = async () => {
    try {
      await AsyncStorage.getItem('pad').then((res) => {
        res && setStorageProgress({ type: storageProgress.type, pad: res })
      })
    } catch (err) {
      alert(err)
    }
  }
  const readStorageType = async () => {
    try {
      await AsyncStorage.getItem('type').then((res) => {
        res && setStorageProgress({ type: res, pad: storageProgress.pad })
      })
    } catch (err) {
      alert(err)
    }
  }

  useEffect(() => {
    console.log('==== The App is started ======')
    // readStoragePad()
    // readStorageType()
  }, [])

  useEffect(() => {
    if (shouldReadStorage) {
      readStoragePad()
      readStorageType()
      setShouldReadStorage(false)
    }
  }, [shouldReadStorage])

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            if (route.name === 'Trénink') {
              iconName = 'school-outline'
            } else if (route.name === 'Nastavení') {
              iconName = 'cog-outline'
            } else if (route.name === 'Info') {
              iconName = 'information-circle-outline'
            } else if (route.name === 'Сvičení') {
              iconName = 'barbell-outline'
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: '#ec9706',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen
          name="Trénink"
          options={{ headerShown: false }}
          children={() => (
            <Training
              maxScoreToWin={maxScoreToWin}
              test={'test'}
              storageProgress={storageProgress}
              setStorageProgress={setStorageProgress}
            />
          )}
        />
        <Tab.Screen options={{ headerShown: false }} name="Сvičení" component={Practice} />
        <Tab.Screen name="Info" component={Info} />
        <Tab.Screen
          name="Nastavení"
          children={() => (
            <Settings
              storageProgress={storageProgress}
              maxScoreToWin={maxScoreToWin}
              setMaxScoreToWin={setMaxScoreToWin}
              shouldReadStorage={shouldReadStorage}
              setShouldReadStorage={setShouldReadStorage}
            />
          )}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
