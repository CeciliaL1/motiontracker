export interface IWorkoutScheduele {
    [date:string]: IWorkout
}

export interface IWorkout {
 task: string;
 repetition: string | number;
 done: boolean
}

export interface IWeekWorkout {
    date: string;
    task: string;
    repetition: string | number; // Repetition kan vara ett nummer eller en sträng (t.ex. "5 min")
    done: boolean;
  }

  export interface ISaveWorkout {
    userId: string;
    workoutDetails: IWorkoutScheduele
  }