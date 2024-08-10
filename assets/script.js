// Access the DOM elements
const form = document.querySelector('#form');
const checkboxes = document.querySelectorAll('input[name="workout"]');
const biefit = document.querySelector('#biefit');
const recomExercises = document.querySelector('#recomexercises');
const complete = document.querySelector('#complete');
const previousWorkouts = document.querySelector('#allpreviousworkouts');
const workoutParent = document.querySelector('#recomexercises');
const clearWorkouts = document.querySelector('#clearworkouts');
let newCompletedWorkout = [];
let newStoredDate = [];
let checkedWorkouts = [];
let submittedWorkouts;
let storedWorkouts;
let completedWorkouts;
const currentDate = new Date().toLocaleDateString();



// Make the workoutsArray that holds each workout along with its exercises
const workoutsArray = [
    {
        workoutCategory: "Chest",
        exercises: [
            "Bench Press",
            "Chest Fly",
            "Push Ups",
            "Incline Bench Press",
            "Cable Crossover",
            "Decline Bench Press",
            "Dumbbell Pullover",
        ]
    },
    {
        workoutCategory: "Triceps",
        exercises: [
            "Tricep Dips",
            "Skull Crushers",
            "Tricep Kickbacks",
            "Diamond Push-ups",
            "Kickbacks",
            "Overhead Triceps Extension",
            "Close Grip Bench Press",
        ]
    },
    {
        workoutCategory: "Back",
        exercises: [
            "Pull Ups",
            "Deadlift",
            "Bent Over Rows",
            "Lat Pulldown",
            "Single-Arm Dumbbell Row",
            "T-Bar Row",
            "Seated Cable Row",
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
            "Bulgarian Split Squats",
            "Leg Extension",
            "Glute Bridges",
            "Sumo Squats",
        ]
    },
    {
        workoutCategory: "Core",
        exercises: [
            "Flutter Kicks",
            "Crunches",
            "Russian Twist",
            "Mountain Climbers",
            "Dead Bug",
            "Side Planks",
            "Bicycle Crunch",
        ]
    },
];


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
    form.reset();
    if(submittedWorkouts && submittedWorkouts.length > 0){
        requestAnimationFrame(triggerConfetti);
    }
    complete.disabled = true;
    clearSubmittedWorkouts();

});


//EventListener for ClearPreviousWorkouts button:
clearWorkouts.addEventListener('click', function(event){
    event.preventDefault();
    clearCompletedWorkouts();
})

//EventListener for when the page loads to keep the previously completed workouts and not wipe them out at every reload
window.addEventListener('load', loadCompletedWorkouts);

//-------------------------------------------------------------------------------------------------------
// function to trigger the confetti effect
function triggerConfetti(){
    confetti({
        particleCount: 1000,
        spread: 800,
        origin: { x: 1, y: 0.9 },
      });

      confetti({
        particleCount: 1000,
        spread: 800,
        origin: { x: 0, y: 0.9 },
      });
};

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
    submittedWorkouts = workoutsArray.filter((workout) => checkedWorkouts.includes(workout.workoutCategory));
    localStorage.setItem('submittedworkouts', JSON.stringify(submittedWorkouts));
    displaySubmittedWorkouts(); // displays the new submitted workouts' exercises
    complete.disabled = false;
};

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
    submittedWorkouts.forEach ( submittedWorkout => shuffleArray(submittedWorkout.exercises) );
    console.log(submittedWorkouts);
    const submittedWorkoutsLimitedExercises = submittedWorkouts.map(workout => ({
        workout,
        exercises: workout.exercises.slice(0, 2)
    }));
    console.log(submittedWorkoutsLimitedExercises);

    submittedWorkoutsLimitedExercises.forEach((submittedWorkout) => {
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
// function limitedExercises(submittedWorkouts, limit) {
//     return submittedWorkouts.map(submittedWorkout => {
//         return{
//             ...submittedWorkout,
//             exercises: submittedWorkout.slice(0, limit)
//         };
//         }
//     );
// }
// limitedExercises(submittedWorkouts, 2);

//-------------------------------------------------------------------------------------------------------
//Create a function that displays the completed workouts when it reads from the newly created localStorage with the key 'completedworkouts'


function displayCompletedWorkouts() {
    console.log(newCompletedWorkout);
    let existingCompletedWorkouts = JSON.parse(localStorage.getItem('completedworkouts')) || [];
    let existingStoredDates = JSON.parse(localStorage.getItem('storeddates')) || [];
    const completedWorkoutList = document.createElement('ul');
    storedWorkouts = JSON.parse(localStorage.getItem('submittedworkouts'));
    console.log(storedWorkouts); //this is logging the stored workouts
    const completedWorkoutItem = document.createElement('li');

        let newWorkoutParts = [];
        let storedDates = [];
        storedWorkouts.forEach((storedWorkout, index) => {
            const workoutCategories = storedWorkouts.map(workout => workout.workoutCategory).join(', '); //map creates the array of only workoutCategry elements, and join joins them toegether into a string seperated by comma. // ex: "Chest, Triceps"
            completedWorkoutItem.textContent = `On ${currentDate}, you completed the following workout(s): ${workoutCategories}`;
            completedWorkoutList.appendChild(completedWorkoutItem);
            previousWorkouts.appendChild(completedWorkoutList);
            console.log(completedWorkoutList);
            
            storedDates.push(currentDate);
            console.log(storedDates)
            newWorkoutParts.push(storedWorkout.workoutCategory);
            console.log(newWorkoutParts);
            if (index === (storedWorkouts.length - 1)) {
                newCompletedWorkout.push(newWorkoutParts);
                newStoredDate.push(currentDate); //Im pushing the current date for each workout
                console.log(newCompletedWorkout);
                console.log(newStoredDate);
                newCompletedWorkout.forEach((newWorkout) => {
                    existingCompletedWorkouts.push(newWorkout);
                    existingStoredDates.push(...newStoredDate);
                });
                newCompletedWorkout = [];
                newStoredDate = [];
                console.log(existingCompletedWorkouts);
                console.log(existingStoredDates);
                localStorage.setItem('completedworkouts', JSON.stringify(existingCompletedWorkouts));
                localStorage.setItem('storeddates', JSON.stringify(existingStoredDates));
            }
        });
    
};

//-------------------------------------------------------------------------------------------------------
//Create a function that loads the completed workouts from localStorage of 'completedworkouts'
function loadCompletedWorkouts() {
    let completedWorkouts = localStorage.getItem('completedworkouts');
    let allStoredDates = localStorage.getItem('storeddates');
    if (completedWorkouts) {
        completedWorkouts = JSON.parse(completedWorkouts);
        allStoredDates = JSON.parse(allStoredDates);
        console.log(completedWorkouts);
        console.log(allStoredDates);
        const completedWorkoutList = document.createElement('ul');
        completedWorkouts.forEach((completedWorkout, index) => {
            const completedWorkoutItem = document.createElement('li');
            const workoutCategories = completedWorkout.join(', ');
            const workoutDate = allStoredDates[index];
            completedWorkoutItem.textContent = `On ${workoutDate}, you completed the following workout(s): ${workoutCategories}`;
            completedWorkoutList.appendChild(completedWorkoutItem);
            previousWorkouts.appendChild(completedWorkoutList);
        });
    }
}

//-------------------------------------------------------------------------------------------------------
//Create a function that clears the completed workouts when it reads from localStorage of 'completedworkouts'
function clearCompletedWorkouts() {
    localStorage.removeItem('completedworkouts');
    localStorage.removeItem('storedworkouts');
    //clear the displayed completed workouts from the DOM
    previousWorkouts.innerHTML = '';
}

//-------------------------------------------------------------------------------------------------------
//Create a function that resets the submittedWorkouts'exercises
function clearSubmittedWorkouts() {
    localStorage.removeItem('submittedworkouts');  
    workoutParent.innerHTML = ''; 
}   

