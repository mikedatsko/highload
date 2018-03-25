import React from 'react'

import Url from './Url'

const Participant = (props) => (
  <tr key={'participant_' + props.i} className={props.isSelected ? 'is-selected' : ''}>
    <th>{props.i + 1}</th>
    <td className="participant-title">
      {props.title} <Url href={props.url} target={'_blank'}>{props.url}</Url>
      <div className="participant-result" style={{width: `${props.width}%`}}/>
    </td>
    <td className="has-text-right">{props.time}ms</td>
  </tr>
)

export default Participant
