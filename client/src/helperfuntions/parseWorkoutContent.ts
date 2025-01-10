import { IWorkoutScheduele } from "../models/IWorkout";

export const parsedWorkoutContent = (content: string) => {
    const workoutSchedule: IWorkoutScheduele = {};

    const workoutLines = content.split('\n');
   

    let currentDate = '';

    workoutLines.forEach((line) => {
       

        
        const dateMatch = line.match(/Date:\s*(\d{1,2}\/\d{1,2})\*\*/);
        if (dateMatch) {
            currentDate = dateMatch[1];  
        }

        const workoutMatch = line.match(/Workout:\s*\{task:\s*"([^"]+)",\s*repetition:\s*([^,}]+),\s*done:\s*(false|true)\}/);
        if (workoutMatch && currentDate) {
            const task = workoutMatch[1];
            const repetition = workoutMatch[2].trim();
            const repetitionValue = isNaN(Number(repetition)) ? repetition : parseInt(repetition, 10);
            const done = workoutMatch[3] === 'true';

          
            workoutSchedule[currentDate] = { task, repetition: repetitionValue, done };
        }
    });


    return workoutSchedule;
};
