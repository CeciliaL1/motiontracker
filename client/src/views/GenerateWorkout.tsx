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

  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [diagnos, setDiagnos] = useState("");
  const [physicsLevel, setPhysicsLevel] = useState(0);

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
    console.log(responseContent);
    const parsedContent = parsedWorkoutContent(responseContent);
    console.log(parsedContent);
    setSchedule(parsedContent);
  };
  return (
    <>
      <Wrapper direction="row" margintop={13} marginleft={0}>
        <GenerateButton
          onClick={() => {
            generateWorkout();
          }}
        >
          Generate<i className="fa-solid fa-wand-magic-sparkles"></i>
        </GenerateButton>
      </Wrapper>

      <PrewviewWorkout schedule={schedule}></PrewviewWorkout>
    </>
  );
};
