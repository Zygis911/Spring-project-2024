import '../../../css/Modal.css';
import { BsFillTrashFill, BsFillPencilFill, BsFillEyeFill } from "react-icons/bs";
import { AuthContext } from '../../../../utils/AuthContext';
import { useCallback, useContext } from 'react';
import { useTasks } from '../hooks/useTasks';

export const Task = ({ task, isAdminOrOwner }) => {

    const { id, name, description, created_on, planned_end_date, status, worker_username } = task;

    const { user } = useContext(AuthContext);

    const { FetchTasks, OpenUpdateForm, OpenUpdateStatusForm, OpenViewForm, DeleteTask } = useTasks();

    let cssStatus = status.replace(/\s/g, '');
    // Make all status words first letter capital
    let displayStatus = status.split(' ').map((value) => value = value[0].toUpperCase() + value.substring(1)).join(" ");


    const RemoveTask = useCallback(async () => {
        //TODO Make a pop up with question: Are you sure you want to delete this task? Yes & No

        const [status] = await DeleteTask(id)
        if (status !== 200) {
            switch (status) {
                case 400: {
                    alert("Task no longer exists");
                    break;
                }
                case 401: {
                    alert("You dont have privileges to perform this action");
                    break;
                }
            }
            return;
        }
        FetchTasks();
    });

    return <tr>
        {/* ID */}
        <td>{id}</td>
        {/* Name */}
        <td>{name}</td>
        {/* Worker */}
        <td>{worker_username}</td>
        {/* Description */}
        <td className="expand">{description.substring(0, 10) + " ..."}</td>
        {/* Status */}
        <td>
            <span className={`label label-${cssStatus}`}>{displayStatus}</span>
        </td>
        {/* Task creation date */}
        <td>{created_on.split('T')[0]}</td>
        {/* Task deadline */}
        <td>{planned_end_date.split('T')[0]}</td>

        {/* Buttons */}

        <td>
            <span className="actions">
                <BsFillEyeFill onClick={() => OpenViewForm(task)} />
                {isAdminOrOwner ?

                    <>
                        <BsFillPencilFill onClick={() => OpenUpdateForm(task)} />
                        <BsFillTrashFill className="delete-btn" onClick={RemoveTask} />
                    </>
                    :
                    (user.username === worker_username ?

                        <BsFillPencilFill onClick={() => OpenUpdateStatusForm(task)} />
                        : <></>)
                }
            </span>
        </td>
    </tr>;
}