// Access the DOM elements
const form = document.querySelector('#form');
const checkboxes = document.querySelectorAll('input[name="workout"]');
const biefit = document.querySelector('#biefit');
const recomExercises = document.querySelector('#recomexercises');
const complete = document.querySelector('#complete');
const previousWorkouts = document.querySelector('.previousworkouts');
const workoutParent = document.querySelector('#recomexercises');

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
let checkedWorkouts = [];
let submittedWorkouts;
let storedWorkouts;
let completedWorkouts;


//-------------------------------------------------------------------------------------------------------
//Create a checkHandler function that will be the second argument for the checkboxes eventListener
function checkHandler (event) {
    if (event.target.checked) {
        console.log(event.target.value);
        checkedWorkouts.push(event.target.value);
        console.log(checkedWorkouts);
    } else {
        // Remove the unchecked workout from checkedWorkouts
        const index = checkedWorkouts.indexOf(event.target.value);
        if (index > -1) {
            checkedWorkouts.splice(index, 1);
        }
        console.log(checkedWorkouts);
    }
}
//-------------------------------------------------------------------------------------------------------
//Create a function that gets the checkedWorkout after being checked.
function getCheckedWorkouts() {
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', checkHandler);
    });
    return checkedWorkouts;

};

getCheckedWorkouts();

//-------------------------------------------------------------------------------------------------------
//Create a function that handles the button submission and stores the submittedWorkouts in localStorage
function workoutSubmitHandler(event) {
    event.preventDefault();
    submittedWorkouts = workoutsArray.filter((workout) => checkedWorkouts.includes(workout.workoutCategory))
    localStorage.setItem('submittedworkouts', JSON.stringify(submittedWorkouts));
    clearSubmittedWorkouts(); //clears previously submitted workouts' exercises if they exist
    displaySubmittedWorkouts(); // displays the new submitted workouts' exercises

}

form.addEventListener('submit', workoutSubmitHandler) 


//-------------------------------------------------------------------------------------------------------
//Create a function that would display the exercises from the submittedWorkouts
function displaySubmittedWorkouts() {
workoutParent.innerHTML = ''; // Clear previous workouts    
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

//Create a function that clears the submittedWorkouts'exercises
function clearSubmittedWorkouts() {
    workoutParent.innerHTML = '';    
}    

//-------------------------------------------------------------------------------------------------------
// Create a function to load submittedWorkouts from localStorage on page load
function loadSubmittedWorkouts() {
    storedWorkouts = localStorage.getItem('submittedworkouts');
    if (storedWorkouts) {
        submittedWorkouts = JSON.parse(storedWorkouts);
        displaySubmittedWorkouts();
    }
}

//-------------------------------------------------------------------------------------------------------
//Read localStorage


function displayCompletedWorkouts() {
    let existingCompletedWorkouts = JSON.parse(localStorage.getItem('completedworkouts')) || [];
    storedWorkouts = JSON.parse(localStorage.getItem('submittedworkouts'));
    console.log(storedWorkouts); //this is logging the stored workouts
    storedWorkouts.forEach((storedWorkout) => {
        const completedWorkoutList = document.createElement('ol');
        const completedWorkoutItem = document.createElement('li');
        completedWorkoutItem.textContent = `Congratualtions on completing ${storedWorkout.workoutCategory}`;
        completedWorkoutList.appendChild(completedWorkoutItem);
        previousWorkouts.appendChild(completedWorkoutList);
        existingCompletedWorkouts.push(storedWorkout);
    });
     // Store the entire storedWorkouts array in localStorage under the key 'completedworkouts'
     localStorage.setItem('completedworkouts', JSON.stringify(existingCompletedWorkouts));
};

complete.addEventListener('click', function(event){
    event.preventDefault();
    displayCompletedWorkouts();
    checkedWorkouts = [];
    clearSubmittedWorkouts();
    form.reset();
});

function loadCompletedWorkouts() {
    let completedWorkouts = localStorage.getItem('completedworkouts');
    if (completedWorkouts) {
        completedWorkouts = JSON.parse(completedWorkouts);
        completedWorkouts.forEach((completedWorkout) => {
        const completedWorkoutList = document.createElement('ol');
        const completedWorkoutItem = document.createElement('li');
        completedWorkoutItem.textContent = `Congratualtions on completing ${completedWorkout.workoutCategory}`;
        completedWorkoutList.appendChild(completedWorkoutItem);
        previousWorkouts.appendChild(completedWorkoutList);
        })
    }
}

function clearCompletedWorkouts() {
    localStorage.removeItem('completedworkouts');
    //clear the displayed completed workouts from the DOM
    previousWorkouts.innerHTML = '';
}


// Call loadSubmittedWorkouts and completedworkouts when the page loads

//window.addEventListener('load', loadSubmittedWorkouts);
window.addEventListener('load', loadCompletedWorkouts);

