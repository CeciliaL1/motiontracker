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
import { ErrorMessage } from "../components/styled/styledError";

export const GenerateWorkout = () => {
  const loggedInUser = getLocalStorage<IUserLogin>("user");
  const token = getLocalStorage<string>("token");

  const [schedule, setSchedule] = useState<IWorkoutScheduele>({});
  const [message, setMessage] = useState("");
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
        `https://cecilial.hemsida.eu/api/profile/${loggedInUser.userId}`,
        headers
      );
      if (response.length === 0) {
        setMessage(
          "You´ll need to edit your profile and insert values to be able to generate a workout"
        );
      }
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
    if (message) {
      return;
    }
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    setIsLoading(true);

    const headers = {
      "Content-Type": "application/json",
    };

    const data = JSON.stringify({
      messages: [
        {
          role: "system",
          content: `You are a personal trainer specialized in ataxia, Parkinson's disease, and multiple sclerosis. You will generate a 30-day workout schedule in the following format, and you must strictly follow it. It should include 3-5 tasks per day and should be customized to the individual physicslevel

       Here’s the format for each workout:

        Date: (day/month)**
        Workout:
           Task 1: { task: "(task name)", repetition: (number or "time in seconds"), done: false }
           Task 2: { task: "(task name)", repetition: (number or "time in seconds"), done: false }
           Task 3: { task: "(task name)", repetition: (number or "time in seconds"), done: false }
           ...

      Starting from the day ${day} of the month ${month}, generate the complete workout schedule for 30 consecutive days:

      Example of the format for each day:
      Date: ${day}/${month}**
      Workout:
         Task 1: { task: "Chair Stands", repetition: 30s , done: false }
         Task 2: { task: "Wall Push-Ups", repetition: 8, done: false }
         Task 3: { task: "Arm Raises", repetition: 10, done: false }
        
      Please generate the schedule for 30-days in this exact format, with the following changes each workout: 
      - Change tasks per day
      - 3 tasks per day
      - Increment repetitions or time gradually.
      - Keep the format and structure consistent across all weeks.
      - Starting day is ${day} and month is ${month}
      
      For each workout, the task name and repetitions should be clearly stated, and each workout should have a "done: false" flag. dont split it into weeks

      The client is a ${age} years old ${gender} and diagnosed with ${diagnos}. Their physical level is ${physicsLevel}, their height ${height} and weight are ${weight}
      `,
        },
        {
          role: "user",
          content: `I´m a ${age} years old ${gender} and I´m diagnosed with ${diagnos}. My physical level is ${physicsLevel}, my height ${height} and weight are ${weight}`,
        },
      ],
    });
    try {
      const response = await postData<string, IOpenAiResponse>(
        "https://cecilial.hemsida.eu/api/workout/generate-workout",
        data,
        headers
      );

      const responseContent = response.choices[0].message.content;
      const parsedContent = parsedWorkoutContent(responseContent);

      setSchedule(parsedContent);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Wrapper direction="row" margintop={13}>
        <GenerateButton
          aria-label="Generate workout"
          onClick={() => {
            generateWorkout();
          }}
        >
          Generate<i className="fa-solid fa-wand-magic-sparkles"></i>
        </GenerateButton>
      </Wrapper>
      <Wrapper direction="row" margintop={1}>
        {message && (
          <ErrorMessage>
            <p>{message}</p>
          </ErrorMessage>
        )}
      </Wrapper>

      <PrewviewWorkout
        schedule={schedule}
        isLoading={isLoading}
      ></PrewviewWorkout>
    </>
  );
};
