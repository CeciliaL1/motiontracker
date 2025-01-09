import { useEffect, useState } from "react";
import { PrewviewWorkout } from "../components/PrewievWorkout";
import { GenerateButton } from "../components/styled/styledButtons";
import { Wrapper } from "../components/styled/Wrappers";
import { IUserProfile } from "../models/IUserProfile";
import { getData, postData } from "../services/serviceBase";
import { getLocalStorage } from "../helperfuntions/getLocalStorage";
import { IUserLogin } from "../models/IUsers";
import { IOpenAiResponse } from "../models/IOpenAi";
import { parsedWorkoutContent } from "../helperfuntions/parseWorkoutContent";
import { IWorkoutScheduele } from "../models/IWorkout";

export const GenerateWorkout = () => {
  const loggedInUser = getLocalStorage<IUserLogin>("user");
  const token = getLocalStorage<string>("token");

  const [schedule, setSchedule] = useState<IWorkoutScheduele>({
    "": { task: "", repetition: 0, done: false },
  });

  const mockWorkoutSchedule = {
    "9/1": { task: "Chair Stands", repetition: 5, done: false },
    "9/2": { task: "Seated Arm Raises", repetition: 10, done: false },
    "9/3": { task: "Toe Taps (seated)", repetition: 10, done: false },
    "9/4": { task: "Wall Push-ups", repetition: 5, done: false },
    "9/5": { task: "Gentle Stretches", repetition: "5 min", done: false },
    "9/6": { task: "Seated Side Leg Lifts", repetition: 10, done: false },
    "9/7": { task: "Heel Raises", repetition: 10, done: false },
    "9/8": { task: "Seated Tricep Dips", repetition: 8, done: false },
    "9/9": { task: "Ankle Pumps", repetition: 10, done: false },
    "9/10": { task: "Seated Marching", repetition: "3 min", done: false },
    "9/11": { task: "Arm Circles (seated)", repetition: 10, done: false },
    "9/12": { task: "Wall Sit", repetition: "30 sec", done: false },
    "9/13": {
      task: "Cross-Body Arm Stretch",
      repetition: "5 min",
      done: false,
    },
    "9/14": { task: "Knee Lifts (seated)", repetition: 10, done: false },
    "9/15": { task: "Side Leg Extensions", repetition: 10, done: false },
    "9/16": { task: "Wrist Rotations", repetition: 10, done: false },
    "9/17": { task: "Chair Push-ups", repetition: 5, done: false },
    "9/18": { task: "Seated Leg Tucks", repetition: 10, done: false },
    "9/19": { task: "Cat-Cow Stretch (seated)", repetition: 5, done: false },
    "9/20": { task: "Seated Side Bends", repetition: 10, done: false },
    "9/21": { task: "Standing Calf Raises", repetition: 10, done: false },
    "9/22": { task: "Gentle Neck Rolls", repetition: "5 min", done: false },
    "9/23": { task: "Seated Bicycle Crunches", repetition: 10, done: false },
    "9/24": { task: "Seated Arm Twists", repetition: 10, done: false },
    "9/25": { task: "Seated Forward Bend", repetition: "5 min", done: false },
    "9/26": { task: "Standing Side Leg Raises", repetition: 10, done: false },
    "9/27": {
      task: "Forearm Plank (knees down)",
      repetition: "15 sec",
      done: false,
    },
    "9/28": { task: "Gentle Back Stretch", repetition: "5 min", done: false },
    "9/29": { task: "Seated Toe Touch", repetition: 10, done: false },
    "9/30": { task: "Standing Arm Raises", repetition: 10, done: false },
  };

  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [diagnos, setDiagnos] = useState("");
  const [physicsLevel, setPhysicsLevel] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const getUserData = async () => {
      const response = await getData<IUserProfile[]>(
        `http://localhost:3000/api/profile/${loggedInUser.userId}`,
        headers
      );

      response.map((user) => {
        setAge(user.age);
        setGender(user.gender);
        setWeight(user.weight);
        setHeight(user.height);
        setDiagnos(user.healthIssues);
        setPhysicsLevel(user.physicsLevel);
      });
    };
    getUserData();
  }, [loggedInUser, token]);

  const generateWorkout = async () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const today = `${day}/${month}`;

    setIsLoading(true);
    const headers = {
      "Content-Type": "application/json",
    };

    const data = JSON.stringify({
      messages: [
        {
          role: "system",
          content: `You are a personal trainer specialized in ataxia, Parkinson's disease, and multiple sclerosis. You will generate a 30-day workout schedule in the following format, and you must strictly follow it.

      Here’s the format for each workout:

        Date: (day/month)**
           Workout: { task: "(task name)", repetition: (number or "time in minutes"), done: false }

      Example format for Week 1:
      Date: 9/1**
        Workout: {task: "Chair Stands", repetition: 5, done: false}
      Date: 9/3**
       Workout: {task: "Seated Arm Raises", repetition: 10, done: false}
      Date: 9/5**
        Workout: {task: "Toe Taps (seated)", repetition: 10, done: false}
      Date: 9/7**
        Workout: {task: "Wall Push-ups", repetition: 5, done: false}
      Date: 9/9**
         Workout: {task: "Gentle Stretches", repetition: "5 min", done: false}

      
      Please generate the schedule for 30-days in this exact format, with the following changes each workout: 
      - Change tasks
      - Increment repetitions or time gradually.
      - Keep the format and structure consistent across all weeks.
      - Starting date is ${today}
      
      For each workout, the task name and repetitions should be clearly stated, and each workout should have a "done: false" flag. dont split it into weeks

      `,
        },
        {
          role: "user",
          content: `I´m a ${age} years old ${gender} and I´m diagnosed with ${diagnos}. My physical level is ${physicsLevel}, my height ${height} and weight are ${weight}`,
        },
      ],
    });
    const response = await postData<string, IOpenAiResponse>(
      "http://localhost:3000/api/workout/generate-workout",
      data,
      headers
    );

    const responseContent = response.choices[0].message.content;
    const parsedContent = parsedWorkoutContent(responseContent);
    setSchedule(parsedContent);
    setIsLoading(false);
  };
  return (
    <>
      <Wrapper direction="row" margintop={13}>
        <GenerateButton
          onClick={() => {
            generateWorkout();
          }}
        >
          Generate<i className="fa-solid fa-wand-magic-sparkles"></i>
        </GenerateButton>
      </Wrapper>

      <PrewviewWorkout
        schedule={schedule}
        isLoading={isLoading}
      ></PrewviewWorkout>
    </>
  );
};
