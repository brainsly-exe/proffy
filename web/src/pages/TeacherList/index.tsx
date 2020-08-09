import React, { useState, FormEvent } from 'react';

import { TeacherProps } from '../../components/TeacherItem';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';

import './styles.css';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherList() {
    const [teachers, setTeachers] = useState([])

    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent) {
        e.preventDefault();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });

        setTeachers(response.data)
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title='Estes são os Proffys disponíveis.'>
                <form id='search-teachers' onSubmit={searchTeachers}>
                    <Select
                        name="subject"
                        label="Matéria"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        options={[
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Biologia', label: 'Biologia' },
                            { value: 'Ciências', label: 'Ciências' },
                            { value: 'Educação Física', label: 'Educação Física' },
                            { value: 'Física', label: 'Física' },
                            { value: 'Geografia', label: 'Geografia' },
                            { value: 'História', label: 'História' },
                            { value: 'Matemática', label: 'Matemática' },
                            { value: 'Português', label: 'Português' },
                            { value: 'Química', label: 'Química' },
                            { value: 'Javascript', label: 'Javascript' },
                        ]}
                    />
                    <Select
                        name="week_day"
                        label="Dia da Semana"
                        value={week_day}
                        onChange={e => setWeek_day(e.target.value)}
                        options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda' },
                            { value: '2', label: 'Terça' },
                            { value: '3', label: 'Quarta' },
                            { value: '4', label: 'Quinta' },
                            { value: '5', label: 'Sexta' },
                            { value: '6', label: 'Sabádo' },
                        ]}
                    />
                   <Input 
                        type="time" 
                        name="time" 
                        label="Hora"
                        value={time}
                        onChange={e => setTime(e.target.value)}
                   />

                   <button type="submit">
                       Buscar
                   </button>
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: TeacherProps) => (
                    <TeacherItem key={teacher.id} teacher={teacher} />
                ))}
            </main>
        </div>
    );
}

export default TeacherList;