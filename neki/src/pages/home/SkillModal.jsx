import React, { useState } from "react";

const SkillModal = ({ open, onClose, onAddSkill }) => {
  const [skillData, setSkillData] = useState({
    name: "",
    level: "",
    description: "",
  });

  // Função para atualizar o estado com os dados da Skill
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSkillData({ ...skillData, [name]: value });
  };

  // Função para adicionar a nova Skill à lista
  const handleAdd = () => {
    const newSkill = { ...skillData };
    onAddSkill(newSkill);
    setSkillData({ name: "", level: "", description: "" }); // Limpar os campos após adicionar a Skill
    onClose(); // Fecha a modal após adicionar a Skill
  };

  return (
    <>
      {open && (
        <div>
          <h2>Adicionar Skill</h2>
          <form>
            <div>
              <label>Name:</label>
              <input type="text" name="name" value={skillData.name} onChange={handleInputChange} />
            </div>
            <div>
              <label>Level:</label>
              <input type="text" name="level" value={skillData.level} onChange={handleInputChange} />
            </div>
            <div>
              <label>Description:</label>
              <input type="text" name="description" value={skillData.description} onChange={handleInputChange} />
            </div>
          </form>
          <button onClick={handleAdd}>Salvar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      )}
    </>
  );
};

export default SkillModal;
