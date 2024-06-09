export const deleteTheTask = async (_id, currentUser) => {
    try {
        const response = await fetch('http://localhost:5000/delete/task', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: _id })
        });

        if (response.status === 200) {
            const res = await fetch('http://localhost:5000/get/tasks', {
                method: 'POST',
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