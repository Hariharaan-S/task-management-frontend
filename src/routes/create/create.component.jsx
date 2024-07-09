import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import { TaskContext } from '../../context/taskContext';
import { useNavigate } from 'react-router';
import { FormData, FormInput } from './create.styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { UserContext } from '../../context/user.context';
import indianLocale from 'dayjs/locale/en-in';

const Create = () => {
    const { currentUser } = useContext(UserContext)
    const defaultFields = {
        task_id: "",
        u_id: currentUser.id,
        title: "",
        description: "",
        date: ""
    };
    const [fields, setFields] = useState(defaultFields);
    const { title, description } = fields;
    const { setTasks } = useContext(TaskContext)
    const navigate = useNavigate()

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFields({ ...fields, [name]: value });
    };

    const resetFormFields = () => {
        setFields(defaultFields);
    };

    const handleDateChange = (newDate) => {
        const date = new Date(newDate);
        const difference = date.getTimezoneOffset();
        const adjustedTimestamp = date.getTime() - (difference * 60 * 1000);
        const changedDate = new Date(adjustedTimestamp);
        if (newDate) {
            setFields({ ...fields, date: changedDate });
        }

    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(process.env.REACT_APP_BASE_URL + '/create-task', {
                method: "POST",
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fields)
            })
            if (response.status === 200) {
                const res = await fetch(process.env.REACT_APP_BASE_URL + '/get/tasks', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {

                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                })
                if (res.status === 200) {
                    const updated = await res.json()
                    setTasks(updated.message)
                    navigate('/')
                }
            }
            resetFormFields();
        } catch (err) {
            console.error('Fetch error:', err);
        }
    };

    return (
        <>
            {
                currentUser ? (<>
                    <h1>Create your task</h1>
                    <FormData onSubmit={onSubmitHandler}>
                        <FormInput><label htmlFor="title">Title</label>
                            <input className='titleInput' type="text" name="title" id="title" value={title} onChange={handleChange} />
                        </FormInput>
                        <FormInput><label htmlFor="description">Description</label>
                            <textarea className='descArea' name="description" id="description" cols="50" rows="10" value={description} onChange={handleChange}></textarea>
                        </FormInput>
                        <FormInput><label htmlFor="date">Due Date</label>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={indianLocale}>
                                <DatePicker onChange={handleDateChange} />
                            </LocalizationProvider>
                        </FormInput>

                        <Button type="submit" variant="contained" className='createbutton'>Create</Button>
                    </FormData>
                </>) : (navigate('/auth'))
            }
        </>
    );
};

export default Create;
