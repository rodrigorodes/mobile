import React, { useState, useEffect } from 'react'

import socketio from 'socket.io-client'

import {
  SafeAreaView,
  Image,
  StyleSheet,
  AsyncStorage,
  ScrollView,
  Alert
} from 'react-native'

import SpotList from '../components/SpotList'

import logo from '../assets/logo.png'

import connectionUrl from '../services/connectionUrl'

export default function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio(`${connectionUrl}`, {
        query: { user_id }
      })

      socket.on('booking_response', booking => {
        Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`)
      })
    })
  }, [])

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => {

      let techsArray = [];

      if (storagedTechs) {
        techsArray = storagedTechs.split(',').map(tech => tech.trim())
      }

      setTechs(techsArray)
    })
  }, [])

  return (
    <SafeAreaView style={StyleSheet.container}>
      <Image style={styles.logo} source={logo} />
      <ScrollView>
        {techs.map(tech => <SpotList key={tech} tech={tech} />)}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 10
  }
})