"use client"
import React, { useContext } from 'react'
import { RealtimeContext } from './context/realtime-provider'
import { v4 as uuid } from 'uuid'

const LeaderBoard = (game_state) => {

  const playerEntries = Object.entries(game_state?.game_state?.gamestate || {});

  return (
    <div>
      <div>LEADERBOARD</div>
      <ul>
        {playerEntries.map(([playerName, playerData], index) => (
          <li key={uuid()}>
            {playerName} - Balance: {playerData.bal}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LeaderBoard