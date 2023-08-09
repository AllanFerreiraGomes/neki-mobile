// src/pages/home/SkillItem.jsx

import React, { useState } from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, TextField } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const SkillItem = ({ skill, onEdit, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [editedLevel, setEditedLevel] = useState(skill.level);

  const handleEditToggle = () => {
    if (editing) {
      onEdit(skill, editedLevel);
    }
    setEditing(!editing);
  };

  const handleLevelChange = (e) => {
    setEditedLevel(e.target.value);
  };

  return (
    <ListItem>
      {editing ? (
        <TextField
          label="Level"
          value={editedLevel}
          onChange={handleLevelChange}
          inputProps={{ type: 'number', min: 1, max: 10 }}
        />
      ) : (
        <ListItemText primary={skill.name} secondary={`Level: ${skill.level}`} />
      )}
      <ListItemSecondaryAction>
        {editing ? (
          <IconButton onClick={handleEditToggle} edge="end">
            <Edit />
          </IconButton>
        ) : (
          <IconButton onClick={() => onDelete(skill)} edge="end">
            <Delete />
          </IconButton>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default SkillItem;
