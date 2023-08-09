import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { AccessTokenContext } from '../../context/AccessTokenContext';
import { IdFuncionarioContext } from '../../context/IdFuncionarioContext';
import { getSkillsFuncionario } from '../../services/GetSkillsFuncionario';
import { getUserData } from '../../services/getUserData';
import { GetAllSkills } from '../../services/GetAllSkills';
import { RequestAPI } from '../../services/api';
import axios from 'axios';

const Home = () => {
  const { accessToken } = useContext(AccessTokenContext);
  const { userId } = useContext(IdFuncionarioContext);

  const [skillsFuncionario, setSkillsFuncionario] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [funcionarioDados, setFuncionarioDados] = useState(null);
  const [selectedSkillLevel, setSelectedSkillLevel] = useState();

  const tokem = accessToken;
  console.log('tokem', tokem);

  const fetchAllSkills = async () => {
    try {
      console.log('fetchAllSkills !!!!!!!');
      const allSkillsData = await GetAllSkills(tokem);
      setAllSkills(allSkillsData);
    } catch (error) {
      console.error('Error fetching all skills:', error);
    }
  };

  const fetchSkillsFuncionario = async () => {
    try {
      console.log('Entrei fetchSkillsFuncionario()');
      const dataSkillsFuncionario = await getSkillsFuncionario(userId, tokem);
      setSkillsFuncionario(dataSkillsFuncionario);
    } catch (error) {
      console.log('Error fetching skills for Funcionário', error);
    }
  };

  const fetchUserData = async () => {
    try {
      console.log('bearerToken', tokem);
      const data = await getUserData(userId, tokem);
      setFuncionarioDados(data);
    } catch (error) {
      console.error('Error fetching Funcionário data:', error);
    }
  };

  useEffect(() => {
    fetchSkillsFuncionario();
    fetchUserData();
    fetchAllSkills();
  }, [userId]);

  const getSkillsNotInFuncionario = () => {
    return allSkills.filter(
      (skill) => !skillsFuncionario.some((funcSkill) => funcSkill.id === skill.id)
    );
  };

  const handleAddSkill = async (skillId) => {
    const dataPost = {
      funcionarioId: userId,
      skillIds: [skillId],
      level: selectedSkillLevel,
    };

    try {
      await axios.post(
        `http://localhost:8080/api/funcionarios/${userId}/skills/associar-skills`,
        dataPost,
        {
          headers: {
            Authorization: `Bearer ${tokem}`,
          },
        }
      );
      console.log('Skill adicionada com sucesso!');

      fetchSkillsFuncionario();
      setSkillsFuncionario((prevSkills) => [
        ...prevSkills,
        { id: skillId, level: selectedSkillLevel },
      ]);
      setAllSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== skillId));
    } catch (error) {
      console.error('Erro ao adicionar a skill:', error);
    }
  };

  const removeSkillFromFuncionario = async (skillId) => {
    const dataDelete = {
      skillId: skillId,
    };

    try {
      await axios.delete(
        `http://localhost:8080/api/funcionarios/${userId}/skills/excluir`,
        {
          data: dataDelete,
          headers: {
            Authorization: `Bearer ${tokem}`,
          },
        }
      );

      console.log('Skill removida com sucesso!');

      fetchAllSkills();
      setSkillsFuncionario((prevSkills) =>
        prevSkills.filter((skill) => skill.id !== skillId)
      );
    } catch (error) {
      console.error('Erro ao remover a skill:', error);
    }
  };

  const handleLogout = () => {
    // Aqui você deve implementar a lógica de logout do React Native
    // ...

    // Exemplo de navegação para a tela de login:
    // navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
      <Text style={styles.textboxLeftVC}>{funcionarioDados?.name}</Text>
      <Text style={styles.title}>Habilidades:</Text>
      <FlatList
        data={skillsFuncionario}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.skillItem}>
            <Image source={{ uri: item.urlImagem }} style={styles.skillImage} />
            <View style={styles.skillDetails}>
              <Text>Name: {item.name}</Text>
              <Text>Level: {item.level}</Text>
              <Text>Description: {item.description}</Text>
            </View>
            <TouchableOpacity
              style={styles.removeSkillButton}
              onPress={() => removeSkillFromFuncionario(item.id)}
            >
              <Text style={styles.removeSkillButtonText}>🗑️ Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Text style={styles.title}>Habilidades Que Não Possui:</Text>
      <FlatList
        data={getSkillsNotInFuncionario()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.skillItem}>
            <Image source={{ uri: item.urlImagem }} style={styles.skillImage} />
            <View style={styles.skillDetails}>
              <Text>Name: {item.name}</Text>
              <Text>Level: {item.level}</Text>
              <Text>Description: {item.description}</Text>
            </View>
            <TextInput
              style={styles.levelInput}
              keyboardType="numeric"
              onChangeText={(text) => setSelectedSkillLevel(text)}
            />
            <TouchableOpacity
              style={styles.addSkillButton}
              onPress={() => handleAddSkill(item.id)}
            >
              <Text style={styles.addSkillButtonText}>Add Skill</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF5733',
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  logoutText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 8,
  },
  textboxLeftVC: {
    fontSize: 18,
    marginBottom: 16,
  },
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  skillImage: {
    width: 50,
    height: 50,
    marginRight: 8,
  },
  skillDetails: {
    flex: 1,
  },
  removeSkillButton: {
    backgroundColor: '#FF5733',
    padding: 8,
    borderRadius: 8,
  },
  removeSkillButtonText: {
    color: 'white',
  },
  levelInput: {
    width: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginRight: 8,
    textAlign: 'center',
  },
  addSkillButton: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 8,
  },
  addSkillButtonText: {
    color: 'white',
  },
});

export default Home;
