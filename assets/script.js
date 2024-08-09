// Access the DOM elements
const form = document.querySelector('#form');
const checkboxes = document.querySelectorAll('input[name="workout"]');
const biefit = document.querySelector('#biefit');
const recomExercises = document.querySelector('#recomexercises');
const complete = document.querySelector('#complete');
const previousWorkouts = document.querySelector('#allpreviousworkouts');
const workoutParent = document.querySelector('#recomexercises');
const clearWorkouts = document.querySelector('#clearworkouts')

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

//EventListener for the checkboxes:
function getCheckedWorkouts() {   
    checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', checkHandler);
    });
    return checkedWorkouts;
};
getCheckedWorkouts(); //To let me see things working on the console

//EventListener for the form/bieFit button:
form.addEventListener('submit', workoutSubmitHandler);

//EventListener for the Complete button:
complete.addEventListener('click', function(event){
    event.preventDefault();
    displayCompletedWorkouts();
    checkedWorkouts = [];
    clearSubmittedWorkouts();
    form.reset();
});

//EventListener for ClearPreviousWorkouts button:
clearWorkouts.addEventListener('click', function(event){
    event.preventDefault();
    clearCompletedWorkouts();
})

//EventListener for when the page loads to keep the previously completed workouts and not wipe them out at every reload
window.addEventListener('load', loadCompletedWorkouts);

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
//Create a function that handles the bieFit button submission and stores the submittedWorkouts in localStorage with the key'submittedworkouts'
function workoutSubmitHandler(event) {
    event.preventDefault();
    submittedWorkouts = workoutsArray.filter((workout) => checkedWorkouts.includes(workout.workoutCategory))
    localStorage.setItem('submittedworkouts', JSON.stringify(submittedWorkouts));
    displaySubmittedWorkouts(); // displays the new submitted workouts' exercises

}

//-------------------------------------------------------------------------------------------------------
//Fisher-Yates shuffle function taken from the docs
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

//-------------------------------------------------------------------------------------------------------
//Create a function that would display the exercises from the submittedWorkouts
function displaySubmittedWorkouts() {
    workoutParent.innerHTML = '';
    workoutList = document.createElement('ol');
    //shuffle submittedWorkoutsexercises
    submittedWorkouts.forEach ( item => shuffleArray(item.exercises) );

    console.log(submittedWorkouts);
    submittedWorkouts.forEach((submittedWorkout) => {
        submittedWorkout.exercises.forEach((exerciseText) => {
            const exercise = document.createElement('li');
            exercise.textContent = exerciseText;
            workoutList.appendChild(exercise);
        })
    workoutParent.appendChild(workoutList);

    });
};
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
//Create a function that displays the completed workouts when it reads from the newly created localStorage with the key 'completedworkouts'
let newCompletedWorkout = [];

function displayCompletedWorkouts() {
    console.log(newCompletedWorkout)
    let existingCompletedWorkouts = JSON.parse(localStorage.getItem('completedworkouts')) || [];
    
    const completedWorkoutList = document.createElement('ul');
    storedWorkouts = JSON.parse(localStorage.getItem('submittedworkouts'));
    console.log(storedWorkouts); //this is logging the stored workouts
    const completedWorkoutItem = document.createElement('li');
   
    if(!storedWorkouts) {
        alert('select workouts first'); //this will be a modal later
    }
    else{
    let newWorkoutParts = [];
    storedWorkouts.forEach((storedWorkout, index) => { 
    
        const workoutCategories = storedWorkouts.map(workout => workout.workoutCategory).join(', '); //map creates the array of only workoutCategry elements, and join joins them toegether into a string seperated by comma. // ex: "Chest, Triceps"
        completedWorkoutItem.textContent = `Congratulations on completing the following workout(s): ${workoutCategories}.`;
        completedWorkoutList.appendChild(completedWorkoutItem);
        previousWorkouts.appendChild(completedWorkoutList);
        console.log(completedWorkoutList);
   
        newWorkoutParts.push(storedWorkout.workoutCategory);
        console.log(newWorkoutParts);
        if (index === (storedWorkouts.length-1)){
            console.log('once');
            newCompletedWorkout.push(newWorkoutParts);
            console.log(newCompletedWorkout);
            newCompletedWorkout.forEach((newWorkout) => {
                existingCompletedWorkouts.push(newWorkout);
            })
            newCompletedWorkout = [];
            console.log(existingCompletedWorkouts);
            localStorage.setItem('completedworkouts', JSON.stringify(existingCompletedWorkouts));

            
        }
    });
}
};

//-------------------------------------------------------------------------------------------------------
//Create a function that loads the completed workouts from localStorage of 'completedworkouts'
function loadCompletedWorkouts() {
    let completedWorkouts = localStorage.getItem('completedworkouts');
    if (completedWorkouts) {
        completedWorkouts = JSON.parse(completedWorkouts);
        console.log(completedWorkouts);
        const completedWorkoutList = document.createElement('ul');
        completedWorkouts.forEach((completedWorkout) => {
            const completedWorkoutItem = document.createElement('li');
            const workoutCategories = completedWorkout.join(', ');            
            completedWorkoutItem.textContent = `Congratulations on completing the following workout(s) ${workoutCategories}`;
            completedWorkoutList.appendChild(completedWorkoutItem);
            previousWorkouts.appendChild(completedWorkoutList);
        });
    }
}

//-------------------------------------------------------------------------------------------------------
//Create a function that clears the completed workouts when it reads from localStorage of 'completedworkouts'
function clearCompletedWorkouts() {
    localStorage.removeItem('completedworkouts');
    //clear the displayed completed workouts from the DOM
    previousWorkouts.innerHTML = '';
}

//-------------------------------------------------------------------------------------------------------
//Create a function that resets the submittedWorkouts'exercises
function clearSubmittedWorkouts() {
    localStorage.removeItem('submittedworkouts');  
    workoutParent.innerHTML = ''; 
}   

