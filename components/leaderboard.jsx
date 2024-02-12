"use client"
import React, { useContext } from 'react'
import { RealtimeContext } from './context/realtime-provider'
import { v4 as uuid } from 'uuid'

const LeaderBoard = (game_state) => {

  const playerEntries = Object.entries(game_state?.game_state?.gamestate || {});

  return (
    <div>
      <div>LeaderBoard</div>
      <ul>
        {playerEntries.map(([playerName, playerData], index) => (
          <li key={playerName}>
            {playerName} - Balance: {playerData.bal}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LeaderBoard