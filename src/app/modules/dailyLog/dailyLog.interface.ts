import { Types } from "mongoose";

export type TDailyLog = {
  userId: Types.ObjectId;
  date: Date;
  visualization?: {
    boxBreathing: boolean;
    boxBreathingTime: number;
    gameEnvironment: boolean;
    gameEnvironmentTime: number;
    gameExecution: boolean;
    gameExecutionTime: number;
    pregameRoutine: boolean;
    pregameRoutineTime: number;
  };
  dailyWellnessQuestionnaire?: {
    feeling: string;
    soreness: number; // Scale of 1 to 10
    sleepTime: Date;
    wakeUpTime: Date;
    hydrationLevel: number; // Scale of 1 to 10
    readinessToCompete: number; // Scale of 1 to 10
  };
  throwingJournal?: {
    drills: string[];
    toolsDescription: string;
    setsAndReps: string;
    longTossDistance: number; // in feet
    pitchCount: number;
    focus: string;
    environment: "Controlled" | "InGame";
  };
  nutrition: {
    nutritionScore: number;
    proteinInGram: number;
    caloricScore: number;
    consumedImpedingSubstances: boolean;
  };

  armCare?: {
    focus: ("Scapular" | "Shoulder" | "Forearms" | "Biceps/Triceps")[];
    exerciseType: "Isometric" | "Eccentric" | "Oscillating";
    recoveryModalities?: (
      | "Hot tub"
      | "Cold Tub"
      | "Ice pack"
      | "Stim"
      | "Foam roll"
      | "Grastens/scraping"
      | "Cupping"
      | "Dry needling"
      | "Gameready"
      | "Normatec"
      | "Marc Pro"
      | "BFR"
      | string
    )[];
    exercisesLog: string;
  };
  Lifting?: {
    type: (
      | "Upper Body"
      | "Total Body"
      | "Speed & Agility"
      | "Lower Body"
      | "Plyometrics"
    )[];
    focus: ("Speed" | "Eccentric" | "Isometric" | "Concentric")[];
    exercisesLog: string;
  };
  hittingJournal?: {
    pregameEngagement: number; // Scale of 1-10 for pregame routine focus
    primaryFocus: string;
    atBats: number;
    atBatResults: string;
    positiveOutcome: string;
    exercisesLog: string;
  };
  postPerformance?: {
    gameRating: number; // Scale of 1 to 10
    sessionType: "Bullpen/Live at-bats" | "In game";
    gameResults?: string; // Optional for in-game results
    primaryTakeaway: string; // Most important learning from the day
  };
};
