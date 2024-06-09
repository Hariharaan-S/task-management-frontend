import Button from '@mui/material/Button';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router'
import { FormData, FormInput } from './edit.styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TaskContext } from '../../context/taskContext';
import { UserContext } from '../../context/user.context';

const Edit = () => {
    const params = useParams();
    const { currentUser } = useContext(UserContext)
    const { tasks, setTasks } = useContext(TaskContext)
    const navigate = useNavigate()

    const defaultField = {
        id: currentUser.id,
        title: "",
        description: "",
        due_date: ""
    }

    const [temp_task, setTemp] = useState(defaultField)
    useEffect(() => {
        const identifiedTask = tasks.filter(task => task.id === params.id)
        const task = identifiedTask[0]
        setTemp(task)
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target;
        let updatedValue = value;

        if (name === 'date') {
            updatedValue = new Date(value).getTime();
        }

        setTemp({ ...temp_task, [name]: updatedValue });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:5000/edit/task', {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(temp_task)
        })
        if (response.status === 200) {
            const res = await fetch('http://localhost:5000/get/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(currentUser)
            })
            if (res.status === 200) {
                setTasks(res.json().message)
                navigate('/')
            }
        }
    }

    return (
        <>
            <h1>Create your task</h1>
            <FormData onSubmit={handleSubmit}>
                <FormInput><label htmlFor="title">Title</label>
                    <input className='titleInput' type="text" name="title" id="title" value={temp_task.title} onChange={handleChange} />
                </FormInput>
                <FormInput><label htmlFor="description">Description</label>
                    <textarea className='descArea' name="description" id="description" cols="50" rows="10" value={temp_task.description} onChange={handleChange}></textarea>
                </FormInput>
                <FormInput><label htmlFor="date">Due Date</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker onChange={handleChange} />
                    </LocalizationProvider>
                </FormInput>

                <Button type="submit" variant="contained" className='editbutton'>Edit</Button>
            </FormData>
        </>
    )
}

export default Edit;