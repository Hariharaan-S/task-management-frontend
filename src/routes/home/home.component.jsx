import Task from '../../components/task/task.component';
import { useContext, useEffect, useState } from 'react';
import { TaskContext } from '../../context/taskContext';
import { TaskCount, PastTask } from './home.styles';
import { putTasks } from '../../utilities/pastTask.utility';
import { UserContext } from '../../context/user.context';
import { TaskWrapper } from '../../components/task/tasks.styles';

const Home = () => {
    const { currentUser } = useContext(UserContext)
    const { tasks } = useContext(TaskContext)
    const [pastTasks, setPastTasks] = useState([])
    const [total, setTotal] = useState(0)
    const [doneTasks, setDoneTasks] = useState(0)
    const [dueTasks, setDueTasks] = useState(0)

    useEffect(() => {
        if (currentUser != null && tasks != null && tasks.length > 0) {
            const temp_tasks = tasks.filter(task => Date.now() > task.due_date)
            temp_tasks.forEach(task => {
                putTasks(task);
            })
        }
    }, [currentUser, tasks])

    useEffect(() => {
        const getPastTasks = async () => {
            const response = await fetch(process.env.REACT_APP_BASE_URL + '/get/pasttasks', {
                method: "POST",
                headers: {
                    'mode': 'no-cors',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(currentUser)
            })
            if (response.status === 200) {
                const res = await response.json()
                setPastTasks(res.message)
            }
        }
        if (currentUser) {
            getPastTasks();
        }
    }, [currentUser])

    useEffect(() => {
        if (tasks != null) {
            setDueTasks(tasks.length);
        }
    }, [tasks]);

    useEffect(() => {
        if (pastTasks != null) {
            setDoneTasks(pastTasks.length);
        }
    }, [pastTasks]);

    useEffect(() => {
        setTotal(dueTasks + doneTasks);
    }, [dueTasks, doneTasks]);


    return (
        <div>
            <TaskCount>
                <PastTask colorindex={0}>
                    <h2>{total}</h2>
                    <p>Total Tasks created</p>

                </PastTask>
                <PastTask colorindex={1}>
                    <h2>{doneTasks}</h2>
                    <p>Tasks Done</p>

                </PastTask>
                <PastTask colorindex={2}>
                    <h2>{dueTasks}</h2>
                    <p>Tasks due past</p>

                </PastTask>
            </TaskCount>
            <h2>Past Tasks</h2>
            <TaskWrapper>


                {pastTasks && pastTasks.length > 0 ? (
                    pastTasks.map(task => (
                        <Task past={true} option={task} />
                    ))
                ) : (
                    <p>No past tasks available.</p>
                )}
            </TaskWrapper>
            <h2>Upcoming Tasks</h2>
            <TaskWrapper>

                {tasks && tasks.length > 0 ? (tasks.map(task => (
                    <Task option={task} />
                ))) : (
                    <p>No Upcoming Tasks</p>
                )}
            </TaskWrapper>

        </div>
    )
}

export default Home;