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
    repetition: string | number; 
    done: boolean;
  }

  export interface ISaveWorkout {
    userId: string;
    workoutDetails: IWorkoutScheduele
  }


  export interface IWorkoutDetailsResponse {
    userId: string;
    workoutDetails: IWorkoutScheduele
}