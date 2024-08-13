// Access the DOM elements and define variables
const form = document.querySelector('#form');
const checkboxes = document.querySelectorAll('input[name="workout"]');
const biefit = document.querySelector('#biefit');
const recomExercises = document.querySelector('#recomexercises');
const complete = document.querySelector('#complete');
const previousWorkouts = document.querySelector('#allpreviousworkouts');
const workoutParent = document.querySelector('#recomexercises');
const clearWorkouts = document.querySelector('#clearworkouts');
const currentDate = new Date().toLocaleDateString();
let newCompletedWorkout = [];
let newStoredDate = [];
let checkedWorkouts = [];
let submittedWorkouts;
let storedWorkouts;
let completedWorkouts;


// Make the workoutsArray that holds each workout along with its exercises
const workoutsArray = [
    {
        workoutCategory: "Chest",
        exercises: [
            '<a href="https://weighttraining.guide/exercises/bench-press/" target="_Blank" text>Bench Press</a>',
            '<a href="https://weighttraining.guide/exercises/standing-high-to-low-cable-fly/" target="_Blank">Chest Fly</a>',
            '<a href="https://weighttraining.guide/exercises/dumbbell-deficit-push-up/" target="_Blank">Push Ups</a>',
            '<a href="https://weighttraining.guide/exercises/smith-machine-incline-bench-press/" target="_Blank">Incline Bench Press</a>',
            '<a href="https://weighttraining.guide/exercises/machine-chest-press/" target="_Blank">Cable Chest Press</a>',
            '<a href="https://weighttraining.guide/exercises/decline-dumbbell-bench-press/" target="_Blank">Decline Bench Press</a>',
            '<a href="https://weighttraining.guide/exercises/dumbbell-pullover/" target="_Blank">Dumbbell Pullover</a>',
        ]
    },
    {
        workoutCategory: "Triceps",
        exercises: [
            '<a href="https://weighttraining.guide/exercises/machine-assisted-chest-dip/" target="_Blank">Tricep Dips</a>',
            '<a href="https://weighttraining.guide/exercises/barbell-skull-crusher/" target="_Blank">Skull Crushers</a>',
            '<a href="https://weighttraining.guide/exercises/standing-dumbbell-kickback/" target="_Blank">Tricep Kickbacks</a>',
            '<a href="https://weighttraining.guide/exercises/diamond-push-up/" target="_Blank">Diamond Push-ups</a>',
            '<a href="https://weighttraining.guide/exercises/lying-one-arm-cross-body-dumbbell-triceps-extension/" target="_Blank">Overhead Triceps Extension</a>',
            '<a href="https://weighttraining.guide/exercises/close-grip-barbell-bench-press/" target="_Blank">Close Grip Bench Press</a>',
        ]
    },
    {
        workoutCategory: "Back",
        exercises: [
            '<a href="https://weighttraining.guide/exercises/l-sit-pull-up/" target="_Blank">Pull Ups</a>',
            '<a href="https://weighttraining.guide/exercises/reverse-grip-lat-pull-down/" target="_Blank">Reverse Grip Lat Pulldown</a>',
            '<a href="https://weighttraining.guide/exercises/straight-back-seated-underhand-cable-row/" target="_Blank">Underhead Cable Rows</a>',
            '<a href="https://weighttraining.guide/exercises/medium-grip-lat-pull-down/" target="_Blank">Lat Pulldown</a>',
            '<a href="https://weighttraining.guide/exercises/bent-over-dumbbell-row/" target="_Blank">Single-Arm Dumbbell Row</a>',
            '<a href="https://weighttraining.guide/exercises/t-bar-row/" target="_Blank">T-Bar Row</a>',
            '<a href="https://weighttraining.guide/exercises/straight-back-seated-cable-row-with-straight-bar/" target="_Blank">Seated Cable Row</a>',
        ]
    },
    {
        workoutCategory: "Biceps",
        exercises: [
            '<a href="https://weighttraining.guide/exercises/close-grip-ez-bar-curl/" target="_Blank">EZ Bar Curls</a>',
            '<a href="https://weighttraining.guide/exercises/one-arm-dumbbell-preacher-curl/" target="_Blank">Hammer Curls</a>',
            '<a href="https://weighttraining.guide/exercises/standing-barbell-concentration-curl/" target="_Blank">Concentration Curls</a>',
        ]
    },
    {
        workoutCategory: "Legs",
        exercises: [
            '<a href="https://weighttraining.guide/exercises/smith-chair-squat/" target="_Blank">Squats</a>',
            '<a href="https://weighttraining.guide/exercises/barbell-lunge/" target="_Blank">Lunges</a>',
            '<a href="https://weighttraining.guide/exercises/incline-leg-press/" target="_Blank">Leg Press</a>',
            '<a href="https://weighttraining.guide/exercises/bulgarian-split-squat/" target="_Blank">Bulgarian Split Squats</a>',
            '<a href="https://weighttraining.guide/exercises/leg-extension/" target="_Blank">Leg Extension</a>',
            '<a href="https://weighttraining.guide/exercises/barbell-glute-bridge/" target="_Blank">Glute Bridges</a>',
            '<a href="https://weighttraining.guide/exercises/dumbbell-sumo-squat-2/" target="_Blank">Sumo Squats</a>',
        ]
    },
    {
        workoutCategory: "Core",
        exercises: [
            '<a href="https://weighttraining.guide/exercises/extra-decline-sit-up/" target="_Blank">Decline Sit-ups</a>',
            '<a href="https://weighttraining.guide/exercises/crunch/" target="_Blank">Crunches</a>',
            '<a href="https://weighttraining.guide/exercises/weighted-russian-twist/" target="_Blank">Russian Twist</a>',
            '<a href="https://weighttraining.guide/exercises/seated-cross-scissor-kick/" target="_Blank">Scissor Kicks</a>',
            '<a href="https://weighttraining.guide/exercises/dead-bug-with-no-arm-movement/" target="_Blank">Dead Bug</a>',
            '<a href="https://weighttraining.guide/exercises/high-side-plank/" target="_Blank">Side Planks</a>',
            '<a href="https://weighttraining.guide/exercises/bicycle-crunch/" target="_Blank">Bicycle Crunch</a>',
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
getCheckedWorkouts();

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
//Fisher-Yates shuffle function
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
    let submittedWorkoutsLimitedExercises;
    workoutParent.innerHTML = '';
    workoutList = document.createElement('ol');
    //shuffle submittedWorkoutsexercises
    submittedWorkouts.forEach ( submittedWorkout => shuffleArray(submittedWorkout.exercises) );
    console.log(submittedWorkouts);
    if(submittedWorkouts.length === 1) {
    submittedWorkoutsLimitedExercises = submittedWorkouts.map(workout => ({
        workout,
        exercises: workout.exercises.slice(0, 5)
    }));
    }
    if(submittedWorkouts.length === 2) {
        submittedWorkoutsLimitedExercises = submittedWorkouts.map(workout => ({
            workout,
            exercises: workout.exercises.slice(0, 3)
        }));
    }
    if(submittedWorkouts.length === 3) {
        submittedWorkoutsLimitedExercises = submittedWorkouts.map(workout => ({
            workout,
            exercises: workout.exercises.slice(0, 2)
        }));
    }
    if(submittedWorkouts.length === 4) {
        submittedWorkoutsLimitedExercises = submittedWorkouts.map(workout => ({
            workout,
            exercises: workout.exercises.slice(0, 2)
        }));
    }
    if(submittedWorkouts.length === 5) {
        submittedWorkoutsLimitedExercises = submittedWorkouts.map(workout => ({
            workout,
            exercises: workout.exercises.slice(0, 2)
        }));
    }
    if(submittedWorkouts.length === 6) {
        submittedWorkoutsLimitedExercises = submittedWorkouts.map(workout => ({
            workout,
            exercises: workout.exercises.slice(0, 1)
        }));
    }

    submittedWorkoutsLimitedExercises.forEach((submittedWorkout) => {
        submittedWorkout.exercises.forEach((exerciseText) => {
            const exercise = document.createElement('li');
            exercise.innerHTML = exerciseText;
            workoutList.appendChild(exercise);
        })
    workoutParent.appendChild(workoutList);

    });
};

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
        console.log(`Stored Dates are: ${allStoredDates}`)
        console.log(`completed workouts are: ${completedWorkouts}`);

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
    localStorage.removeItem('storeddates');
    //clear the displayed completed workouts from the DOM
    previousWorkouts.innerHTML = '';
}

//-------------------------------------------------------------------------------------------------------
//Create a function that resets the submittedWorkouts'exercises
function clearSubmittedWorkouts() {
    localStorage.removeItem('submittedworkouts');  
    workoutParent.innerHTML = ''; 
}   

