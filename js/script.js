document.addEventListener('DOMContentLoaded', () => {
    const habitForm = document.getElementById('habitForm');
    const habitInput = document.getElementById('habitInput');
    const habitList = document.getElementById('habitList');

    // Load habits from data.json
    fetch('data/data.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(habit => addHabit(habit));
        })
        .catch(error => console.error('Error loading habits:', error));

    habitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const habitText = habitInput.value.trim();

        if (habitText !== '') {
            const newHabit = {
                id: Date.now(),
                name: habitText,
                completed: false
            };
            addHabit(newHabit);
            habitInput.value = '';
        }
    });

    function addHabit(habit) {
        const li = document.createElement('li');
        li.textContent = habit.name;

        if (habit.completed) {
            li.classList.add('completed');
        }

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');
        removeBtn.addEventListener('click', () => {
            habitList.removeChild(li);
        });

        li.appendChild(removeBtn);
        habitList.appendChild(li);
    }
});
