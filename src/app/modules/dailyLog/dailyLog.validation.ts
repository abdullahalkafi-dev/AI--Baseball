import { z } from "zod";

const createDailyLog = z.object({
  body: z
    .object({
      userId: z.string().nonempty("User ID is required"),
      date: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      }),
      visualization: z
        .object({
          boxBreathing: z.boolean().optional(),
          boxBreathingTime: z.number().min(0).optional(),
          gameEnvironment: z.boolean().optional(),
          gameEnvironmentTime: z.number().min(0).optional(),
          gameExecution: z.boolean().optional(),
          gameExecutionTime: z.number().min(0).optional(),
          pregameRoutine: z.boolean().optional(),
          pregameRoutineTime: z.number().min(0).optional(),
        })
        .optional(),
      dailyWellnessQuestionnaire: z
        .object({
          feeling: z.string(),
          soreness: z.number().min(1).max(10, "Scale must be between 1-10"),
          sleepTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid sleep time format",
          }),
          wakeUpTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid wake up time format",
          }),
          hydrationLevel: z
            .number()
            .min(1)
            .max(10, "Scale must be between 1-10"),
          readinessToCompete: z
            .number()
            .min(1)
            .max(10, "Scale must be between 1-10"),
        })
        .optional(),
      throwingJournal: z
        .object({
          drills: z.array(z.string()),
          toolsDescription: z.string(),
          setsAndReps: z.string(),
          longTossDistance: z.number().min(0),
          pitchCount: z.number().min(0),
          focus: z.string(),
          environment: z.enum(["Controlled", "InGame"]),
        })
        .optional(),
      armCare: z
        .object({
          focus: z.array(
            z.enum(["Scapular", "Shoulder", "Forearms", "Biceps/Triceps"])
          ),
          exerciseType: z.enum(["Isometric", "Eccentric", "Oscillating"]),
          recoveryModalities: z.array(z.string()),
          exercisesLog: z.string(),
        })
        .optional(),
      Lifting: z
        .object({
          liftingType: z.array(
            z.enum([
              "Upper Body",
              "Total Body",
              "Speed & Agility",
              "Lower Body",
              "Plyometrics",
            ])
          ),
          focus: z.array(
            z.enum(["Speed", "Eccentric", "Isometric", "Concentric"])
          ),
          exercisesLog: z.string().optional().nullable(),
        })
        .optional(),
      hittingJournal: z
        .object({
          pregameEngagement: z
            .number()
            .min(1)
            .max(10, "Scale must be between 1-10"),
          primaryFocus: z.string(),
          atBats: z.number().min(0),
          atBatResults: z.string(),
          positiveOutcome: z.string(),
          exercisesLog: z.string().optional().nullable(),
        })
        .optional(),

      postPerformance: z
        .object({
          gameRating: z.number().min(1).max(10, "Scale must be between 1-10"),
          sessionType: z.enum(["Bullpen/Live at-bats", "In game"]),
          gameResults: z.string(),
          primaryTakeaway: z.string(),
        })
        .optional(),
      nutrition: z
        .object({
          nutritionScore: z
            .number()
            .min(0)
            .max(10, "Scale must be between 0-10"),
          proteinInGram: z.number().min(0, "Protein must be a positive value"),
          caloricScore: z.number().min(0).max(10, "Scale must be between 0-10"),
          consumedImpedingSubstances: z.boolean(),
        })
        .optional(),
    })
    .strict(),
});

const updateDailyLog = z.object({
  body: z
    .object({
      visualization: z
        .object({
          boxBreathing: z.boolean().optional(),
          boxBreathingTime: z.number().min(0).optional(),
          gameEnvironment: z.boolean().optional(),
          gameEnvironmentTime: z.number().min(0).optional(),
          gameExecution: z.boolean().optional(),
          gameExecutionTime: z.number().min(0).optional(),
          pregameRoutine: z.boolean().optional(),
          pregameRoutineTime: z.number().min(0).optional(),
        })
        .optional(),
      dailyWellnessQuestionnaire: z
        .object({
          feeling: z.string().optional(),
          soreness: z
            .number()
            .min(1)
            .max(10, "Scale must be between 1-10")
            .optional(),
          sleepTime: z
            .string()
            .refine((val) => !isNaN(Date.parse(val)), {
              message: "Invalid sleep time format",
            })
            .optional(),
          wakeUpTime: z
            .string()
            .refine((val) => !isNaN(Date.parse(val)), {
              message: "Invalid wake up time format",
            })
            .optional(),
          hydrationLevel: z
            .number()
            .min(1)
            .max(10, "Scale must be between 1-10")
            .optional(),
          readinessToCompete: z
            .number()
            .min(1)
            .max(10, "Scale must be between 1-10")
            .optional(),
        })
        .optional(),
      throwingJournal: z
        .object({
          drills: z.array(z.string()).optional(),
          toolsDescription: z.string().optional(),
          setsAndReps: z.string().optional(),
          longTossDistance: z.number().min(0).optional(),
          pitchCount: z.number().min(0).optional(),
          focus: z.string().optional(),
          environment: z.enum(["Controlled", "InGame"]).optional(),
        })
        .optional(),
      armCare: z
        .object({
          focus: z
            .array(
              z.enum(["Scapular", "Shoulder", "Forearms", "Biceps/Triceps"])
            )
            .optional(),
          exerciseType: z
            .enum(["Isometric", "Eccentric", "Oscillating"])
            .optional(),
          recoveryModalities: z.array(z.string()).optional(),
          exercisesLog: z.string().optional(),
        })
        .optional(),
      Lifting: z
        .object({
          type: z
            .array(
              z.enum([
                "Upper Body",
                "Total Body",
                "Speed & Agility",
                "Lower Body",
                "Plyometrics",
              ])
            )
            .optional(),
          focus: z
            .array(z.enum(["Speed", "Eccentric", "Isometric", "Concentric"]))
            .optional(),
          exercisesLog: z.string().optional(),
        })
        .optional(),
      hittingJournal: z
        .object({
          pregameEngagement: z
            .number()
            .min(1)
            .max(10, "Scale must be between 1-10")
            .optional(),
          primaryFocus: z.string().optional(),
          atBats: z.number().min(0).optional(),
          atBatResults: z.string().optional(),
          positiveOutcome: z.string().optional(),
          exercisesLog: z.string().optional(),
        })
        .optional(),
      postPerformance: z
        .object({
          gameRating: z
            .number()
            .min(1)
            .max(10, "Scale must be between 1-10")
            .optional(),
          sessionType: z.enum(["Bullpen/Live at-bats", "In game"]).optional(),
          gameResults: z.string().optional(),
          primaryTakeaway: z.string().optional(),
        })
        .optional(),

      nutrition: z
        .object({
          nutritionScore: z
            .number()
            .min(0)
            .max(10, "Scale must be between 0-10")
            .optional(),
          proteinInGram: z
            .number()
            .min(0, "Protein must be a positive value")
            .optional(),
          caloricScore: z
            .number()
            .min(0)
            .max(10, "Scale must be between 0-10")
            .optional(),
          consumedImpedingSubstances: z.boolean().optional(),
        })
        .optional(),
    })
    .strict(),
});

export const DailyLogValidation = {
  createDailyLog,
  updateDailyLog,
};
