import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { TeacherProps } from '../../components/TeacherItem';

import styles from './styles';
import api from '../../services/api';

function TeacherList() {
	const [isFiltersVisible, setIsFiltersVisible] = useState(false);

	const [teachers, setTeachers] = useState([]);
	const [favorites, setFavorites] = useState<number[]>([]);
	
	const [subject, setSubject] = useState('');
	const [week_day, setWeek_day] = useState('');
	const [time, setTime] = useState('');

	function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
			if (response) {
				const favoritedTeachers = JSON.parse(response);
				const favoritedTeachersId = favoritedTeachers.map((teacher: TeacherProps) => {
					return teacher.id;
				});

				setFavorites(favoritedTeachersId);
			}
		});
    }

	function handleToggleFiltersVisible() {
		setIsFiltersVisible(!isFiltersVisible);
	}

	async function handleFiltersSubmit() {
		loadFavorites();

		const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });

		setIsFiltersVisible(false);
        setTeachers(response.data);
	}

	return (
		<View style={styles.container}>
			<PageHeader
				title='Proffys Disponíveis'
				headerRight={(
					<BorderlessButton onPress={handleToggleFiltersVisible}>
						<Feather name='filter' size={20} color='#FFF'/>
					</BorderlessButton>
				)}
			>
				{isFiltersVisible && (
					<View style={styles.searchForm}>
						<Text style={styles.label}>Matéria</Text>
						<TextInput
							style={styles.input}
							placeholder='Qual a matéria?'
							placeholderTextColor='#C1BCCC'
							value={subject}
							onChangeText={text => setSubject(text)}
						/>

						<View style={styles.inputGroup}>
							<View style={styles.inputBlock}>
								<Text style={styles.label}>Dia da semana</Text>
								<TextInput
									style={styles.input}
									placeholder='Qual o dia?'
									placeholderTextColor='#C1BCCC'
									value={week_day}
									onChangeText={text => setWeek_day(text)}
								/>
							</View>
							<View style={styles.inputBlock}>
								<Text style={styles.label}>Horário</Text>
								<TextInput
									style={styles.input}
									placeholder='Qual horário?'
									placeholderTextColor='#C1BCCC'
									value={time}
									onChangeText={text => setTime(text)}
								/>
							</View>
						</View>

						<RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
							<Text style={styles.submitButtonText}>Filtrar</Text>
						</RectButton>
					</View>
				)}
			</PageHeader>

			<ScrollView
				style={styles.teacherList}
				contentContainerStyle={{
					paddingHorizontal: 16,
					paddingBottom: 24,
				}}
			>
				{ teachers.map((teacher: TeacherProps) => (
					<TeacherItem 
						key={teacher.id} 
						teacher={teacher}
						favorited={favorites.includes(teacher.id)}
					/>
				)) }
			</ScrollView>
		</View>
	);
}

export default TeacherList;