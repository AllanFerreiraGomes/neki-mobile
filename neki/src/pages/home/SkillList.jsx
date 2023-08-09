// src/pages/home/SkillList.jsx

import React from 'react';
import { List } from '@mui/material';
import SkillItem from './SkillItem';

const SkillList = ({ skills, onEdit, onDelete }) => {
  return (
    <List>
      {skills.map((skill) => (
        <SkillItem key={skill.id} skill={skill} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </List>
  );
};

export default SkillList;
