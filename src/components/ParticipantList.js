import React from 'react'
import Participant from './Participant'

const ParticipantList = (props) => {
  const participantList = props.participantList

  if (!participantList || !participantList.length) {
    return (<tbody>
      <tr>
        <th colSpan={3}>No records found</th>
      </tr>
    </tbody>)
  }

  const maxTime = Math.max.apply(Math, participantList.map(participant => participant.time))

  return <tbody>
      {participantList.map((participant, i) => {
        const width = Math.round(participant.time / maxTime * 100)

        return <Participant
          key={'participant' + i}
          i={i}
          width={width}
          {...participant}
        />
      })}
    </tbody>
}

export default ParticipantList
