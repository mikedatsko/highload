import React from 'react'

const AddForm = (props) => (
  <div>
    <div className="control">
      <input
        className="input"
        type="text"
        placeholder="Code"
        defaultValue={'window.parent.postMessage(\'FRAME_LOADED\',(new URL(document.location.href)).searchParams.get(\'host_url\') || \'http://jsmeasure.surge.sh\');'}
        onFocus={e => e.target.select()}
      />
    </div>

    <div className="control">
      <input
        className="input"
        type="text"
        placeholder="Title"
        defaultValue={props.add_title}
        onChange={e => props.onChangeInput('add_title', e.target.value)}
      />
    </div>

    <div className="control">
      <input
        className="input"
        type="text"
        placeholder="Url"
        defaultValue={props.add_url}
        onChange={e => props.onChangeInput('add_url', e.target.value)}
      />
    </div>

    <div className="control">
      <a
        className={'button is-link' + (props.isStarted ? ' is-loading' : '')}
        onClick={() => props.addTest()}
      >
        Add
      </a>
    </div>
  </div>
)

export default AddForm
