import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Participant } from '../../components/Participant';

import { styles } from './styles';
import { useState } from 'react';

export function Home(){
    const [participants, setParticipants] = useState<string[]>([]);
    const [participantName, setParticipantName] = useState('');
    
    function handleParticipantAdd(){
        if(participants.includes(participantName)){
            Alert.alert('Não foi possivel adicionar!', 'Esse particpante já foi adicionado!');
        }else{
            setParticipants(old => [...old, participantName]);
            setParticipantName('');
        }
    }

    function handleParticipantRemove(name: string){
        Alert.alert('Podemos excluir?', `Deseja realmente excluir o participant ${name}?`, [
            {
                text: 'Sim',
                onPress: () => {
                    setParticipants(old => old.filter(participant => participant !== name));
                    Alert.alert('Excluído com sucesso!')
                }
            },
            {
                text: 'Cancelar',
                style: 'cancel'
            }
        ]);
    }

    return(
        <View style={styles.container}>
            <Text style={styles.eventName}>Nome do Evento</Text>
            <Text style={styles.eventDate}>Domingo, 03 de Dezembro de 2023</Text>
            <View style={styles.form}>
                <TextInput 
                    style={styles.input}
                    placeholder="Nome do Participante"
                    placeholderTextColor="#6B6B6B"
                    onChangeText={setParticipantName}
                    value={participantName}
                />
                <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
                    <Text style={styles.buttonText}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={participants}
                keyExtractor={item => item}
                renderItem={({item}) => 
                    <Participant 
                        key={item} 
                        name={item} 
                        onRemove={() => handleParticipantRemove(item)}
                    />
                }
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => 
                    <Text style={styles.listEmptyText}>
                        Ninguém por aqui ainda!
                    </Text>
                }
            />
        </View>
    );
}