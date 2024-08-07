// Access the DOM elements
const form = document.querySelector('#form');
const checkboxes = document.querySelectorAll('input[name="workout"]');
const biefit = document.querySelector('#biefit');
const recomExercises = document.querySelector('#recomexercises');
const complete = document.querySelector('#complete');
const previousWorkouts = document.querySelector('#previousworkouts');
const workoutParent = document.querySelector('.exercises');

// Make the workoutsArray that holds each workout along with its exercises
const workoutsArray = [
    {
        workoutCategory: "Chest",
        exercises: [
            "Bench Press",
            "Chest Fly",
            "Push Ups",
        ]
    },
    {
        workoutCategory: "Triceps",
        exercises: [
            "Tricep Dips",
            "Skull Crushers",
            "Tricep Kickbacks",
        ]
    },
    {
        workoutCategory: "Back",
        exercises: [
            "Pull Ups",
            "Deadlift",
            "Bent Over Rows",
        ]
    },
    {
        workoutCategory: "Biceps",
        exercises: [
            "Bicep Curls",
            "Hammer Curls",
            "Concentration Curls",
        ]
    },
    {
        workoutCategory: "Legs",
        exercises: [
            "Squats",
            "Lunges",
            "Leg Press",
        ]
    },
    {
        workoutCategory: "Core",
        exercises: [
            "Flutter Kicks",
            "Crunches",
            "Leg Raises",
        ]
    },
];
const checkedWorkouts = [];
let submittedWorkouts;

//Create a checkHandler function that will be the second argument for the checkboxes eventListener
function checkHandler (event) {
    if (event.target.checked) {
        console.log(event.target.value);
        checkedWorkouts.push(event.target.value);
        // Store checked workouts in local storage
        console.log(checkedWorkouts);
        
    }
}
//Create a function that gets the checkedWorkout after being checked.
function getCheckedWorkouts() {
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', checkHandler);
    });
    return checkedWorkouts;

};

getCheckedWorkouts();

//Create a function that handles the button submission and stores the submittedWorkouts in localStorage
function workoutSubmitHandler(event) {
    event.preventDefault();
    submittedWorkouts = workoutsArray.filter((workout) => checkedWorkouts.includes(workout.workoutCategory))
    localStorage.setItem('submittedworkouts', JSON.stringify(submittedWorkouts));
    displaySubmittedWorkouts();
}

form.addEventListener('submit', workoutSubmitHandler) 

//Create a function that would display the exercises from the submittedWorkouts
function displaySubmittedWorkouts() {
    submittedWorkouts.forEach((submittedWorkout) => {
        const workoutList = document.createElement('ol');
        for(let i = 0; i < submittedWorkout.exercises.length; i++){
            const exercise = document.createElement('li');
            exercise.textContent = submittedWorkout.exercises[i];
            workoutList.appendChild(exercise);
        }
        workoutParent.appendChild(workoutList);
    });
}
