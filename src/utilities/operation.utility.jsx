export const deleteTheTask = async (_id, currentUser) => {
    try {
        const response = await fetch(process.env.REACT_APP_BASE_URL + '/delete/task', {
            method: "DELETE",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: _id })
        });

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
                const data = await res.json();
                return data.message;
            } else {
                throw new Error('Failed to fetch tasks');
            }
        } else {
            throw new Error('Failed to delete task');
        }
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}
