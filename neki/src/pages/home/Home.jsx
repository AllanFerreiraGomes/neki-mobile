import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, FlatList, Image, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IdFuncionarioContext } from '../../../context/IdFuncionarioContext';
import { AccessTokenContext } from '../../../context/AccessTokenContext';
import { getUserData } from '../../services/getUserData';
import { GetAllSkills } from '../../services/GetAllSkills';
import axios from 'axios';

const Home = () => {
    const navigation = useNavigation();

    const [skillsFuncionario, setSkillsFuncionario] = useState([]);
    const [allSkills, setAllSkills] = useState([]);
    const [funcionarioDados, setFuncionarioDados] = useState(null);
    const [selectedSkillLevel, setSelectedSkillLevel] = useState();
    const { userId } = useContext(IdFuncionarioContext);
    const { accessToken } = useContext(AccessTokenContext);

    const tokem = accessToken;

    const fetchAllSkills = async () => {
        try {
            const allSkillsData = await GetAllSkills(tokem);
            setAllSkills(allSkillsData);
        } catch (error) {
            console.error('Error fetching all skills:', error);
        }
    };

    const fetchSkillsFuncionario = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/funcionarios/${userId}/skills/listar`, {
                headers: {
                    Authorization: `Bearer ${tokem}`
                }
            });
            setSkillsFuncionario(response.data);
            console.log("Listar ", response.data);
        } catch (e) {
            console.log(e.response);
            return e.response;
        }
    };

    const fetchUserData = async () => {
        try {
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
            fetchAllSkills();

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

            fetchSkillsFuncionario();
            fetchUserData();
            fetchAllSkills();
        } catch (error) {
            console.error('Erro ao remover a skill:', error);
        }
    };

    const handleLogout = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Button
                title="Logout"
                onPress={handleLogout}
            />
            <Text style={styles.title}>Home</Text>
            <TextInput
                value={funcionarioDados?.name}
                style={styles.textboxLeftVC}
                editable={false}
            />
            <Text style={styles.subtitle}>Habilidades:</Text>
            <FlatList
                style={styles.listaHabilidadesPossui}
                data={skillsFuncionario}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.skillItem}>
                        <Image source={{ uri: item.urlImagem }} style={styles.skillImage} />
                        <View style={styles.skillDetails}>
                            <Text>Name: {item.name}</Text>
                            <Text>Level: {item.level}</Text>
                        </View>
                        <Button
                            title="Remove"
                            onPress={() => removeSkillFromFuncionario(item.id)}
                        />
                    </View>
                )}
            />
            <Text style={styles.subtitle}>Habilidades Que Não Possui:</Text>
            <FlatList
                style={styles.lista}
                data={getSkillsNotInFuncionario().map((skill) => ({
                    ...skill,
                    key: skill.id.toString(),
                }))}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                    <View style={styles.skillsItem}>
                        <Image source={{ uri: item.urlImagem }} style={styles.skillHabilidadesNaoPossui} />
                        <View style={styles.skillDetails}>
                            <Text>Name: {item.name}</Text>
                            <Text>Level: {item.level}</Text>
                            <Text>Description: {item.description}</Text>
                        </View>
                        <TextInput
                            style={styles.levelInput}
                            placeholder="Level"
                            keyboardType="numeric"
                            onChangeText={(text) => setSelectedSkillLevel(text)}
                        />
                        <Button
                            title="Add Skill"
                            onPress={() => handleAddSkill(item.id)}
                        />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        marginVertical: 10,
        textDecorationLine: 'underline',
    },
    textboxLeftVC: {
        width: '50%',
        borderWidth: 1,
        borderColor: 'black',
        paddingHorizontal: 10,
        marginBottom: 1,
        textAlign: 'center',
        fontSize: 14,
    },
    skillItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    skillImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    skillDetails: {
        flex: 1,
    },
    levelInput: {
        width: 50,
        height: 30,
        borderWidth: 1,
        borderColor: 'black',
        marginRight: 10,
        paddingHorizontal: 5,
    },
    lista: {
        flex: 1,
        height: '50%',
    },
    listaHabilidadesPossui: {
        width: '100%',
        flex: 1,
    },
    logout: {
        marginBottom: 20,
    },
    containerNaoPossui: {
        marginTop: 20,
    },
    skillsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    skillHabilidadesNaoPossui: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
});

export default Home;
