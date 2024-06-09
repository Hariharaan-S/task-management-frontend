import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { PopupBody, Button, ButtonWrapper, TaskDiv, TaskWrapper } from './tasks.styles'
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { useNavigate } from 'react-router';
import { useContext, useState } from 'react';
import { TaskContext } from '../../context/taskContext';
import { deleteTheTask } from '../../utilities/operation.utility';
import { UserContext } from '../../context/user.context';

const Task = ({ option, past }) => {
    const { _id, title, description, due_date } = option
    const { currentUser } = useContext(UserContext)
    var date = new Date(due_date)
    date = date.toDateString()
    const { tasks, setTasks } = useContext(TaskContext)
    const navigate = useNavigate()
    const NavigateHandler = () => navigate('/edit/' + currentUser.id)
    const [anchor, setAnchor] = useState(null);

    const handleClick = (event) => {
        setAnchor(anchor ? null : event.currentTarget);
    };

    const open = Boolean(anchor);
    const id = open ? 'simple-popper' : undefined;

    const deleteFunction = async () => {
        const updatedTasks = await deleteTheTask(_id, currentUser)
        setTasks(updatedTasks)

    }

    return (
        <TaskDiv key={_id}>
            <h2>{title}</h2>
            <p>{description}</p>
            <p>{date}</p>
            <div>
                {
                    !past && <ButtonWrapper>
                        <Button onClick={NavigateHandler} type="button"><EditNoteIcon /></Button>
                        <Button onClick={deleteFunction} type="button"><DeleteIcon /></Button>
                        <Button aria-describedby={id} type="button" onClick={handleClick}><VisibilityIcon /></Button>
                        <div>
                            <BasePopup id={id} open={open} anchor={anchor}>
                                <PopupBody>
                                    <h1>{title}</h1>
                                    <h3>{description}</h3>
                                    <p>{date}</p>
                                </PopupBody>
                            </BasePopup>
                        </div>
                    </ButtonWrapper>
                }
            </div>

        </TaskDiv>

    )
}

export default Task;