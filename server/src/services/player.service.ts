import AudioRecorderPlayer from 'react-native-audio-recorder-player'
import Player from 'react-native-audio-recorder-player'

// Flag to ensure Player is initialized only once
let playerInitialized = false
let playerInstance: AudioRecorderPlayer

function initializePlayer() {
  if (!playerInitialized) {
    playerInstance = new Player()
    playerInitialized = true
  }
}

// Function to get the Player instance
function getPlayerInstance() {
  if (!playerInitialized) {
    initializePlayer()
  }
  return playerInstance
}

export { initializePlayer, getPlayerInstance }
