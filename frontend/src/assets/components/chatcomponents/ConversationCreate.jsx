import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { getCharacterImageUrl } from "../api";
import {FiSave, FiPlus} from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";

const ConversationCreate = ({ characters, CreateConvo }) => {
    const [conversationName, setConversationName] = useState('');
    const [selectedParticipants, setSelectedParticipants] = useState([]);
    const [showCreateConversation, setShowCreateConversation] = useState(false);
    const handleConversationNameChange = (event) => {
    setConversationName(event.target.value);
    };

    const handleParticipantsChange = (selectedOptions) => {
    setSelectedParticipants(selectedOptions);
    };

    const handleCreateConversation = () => {
    setShowCreateConversation(true);
    };

    const handleCancelCreateConversation = () => {
    setShowCreateConversation(false);
    };

    const handleCreateConversationSubmit = () => {
    const NewConvo = {
    conversationName: conversationName,
    participants: selectedParticipants,
    messages: [],
    }
    CreateConvo(NewConvo)
    setShowCreateConversation(false);
    };

    // Map characters to the format required by react-select
    const characterOptions = characters.map((character) => ({
    value: character.char_id,
    label: character.name,
    avatar: character.avatar,
    }));

    const formatOptionLabel = ({ label, avatar }) => (
    <div style={{marginLeft : 'auto', marginRight : 'auto'}}>
    <div className='incoming-avatar'>
        <img src={getCharacterImageUrl(avatar)} title={label}/>
    </div>
    <div className='sender-name'>
    {label}
    </div>
    </div>
    );

    const customStyles = {
        menu: (provided) => ({
            ...provided,
            width: 'fit-content',
            backgroundColor: 'rgba(11, 11, 11, 0.636)',
            backdropFilter: 'blur(10px)',
            color: 'white'
        }),
        singleValue: (provided) => ({
            ...provided,
            backgroundColor: 'rgba(11, 11, 11, 0.636)',
            backdropFilter: 'blur(10px)',
            color: 'white'
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: 'white'
        }),
        container: (provided) => ({
            ...provided,
            color: 'white'
        }),
        control: (provided) => ({
            ...provided,
            width: '50%',
            backgroundColor: 'rgba(18, 18, 18, 0.737)',
            boxShadow: '0px 0px 10px 0px rgba(57, 57, 57, 0.737)',
            backdropFilter: 'blur(11px)',
            color: 'white',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: 'transparent',
            border: 'none',
            boxShadow: 'none',
            scrollbehavior: 'smooth',
            padding: 'none',
            color: 'white',
        }),
      };

return (
<>
    <div className='form-bottom-buttons'>
        <button className="icon-button-small" onClick={handleCreateConversation}><FiPlus className='react-icon'/></button>
    </div>
    {showCreateConversation ? (
        <div className='create-conversation-menu'>
            <h2 className="centered">Create Conversation</h2>
            <form>
                <label>Conversation Name:</label>
                <input className='character-input' type="text" value={conversationName} onChange={handleConversationNameChange} />
                <label>Participants:</label>
                <Select
                isMulti
                options={characterOptions}
                formatOptionLabel={formatOptionLabel}
                onChange={handleParticipantsChange}
                value={selectedParticipants}
                styles={customStyles}
                />
                <div className="form-bottom-buttons">
                    <button className='icon-button-small' id='cancel' onClick={handleCancelCreateConversation}>
                        <ImCancelCircle className='react-icon'/>
                    </button>
                    <button className='icon-button-small' id='submit' onClick={handleCreateConversationSubmit}>
                        <FiSave className='react-icon'/>
                    </button>
                </div>
            </form>
        </div>
    ) : null}
</>
);
};
export default ConversationCreate;
