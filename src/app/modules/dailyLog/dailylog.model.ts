import { model, Schema, Types } from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

// Model interface
import { Model } from "mongoose";
import { TDailyLog } from "./dailyLog.interface";
export interface DailyLogModel extends Model<TDailyLog> {
  isExistLogByUserId(userId: Types.ObjectId): Promise<TDailyLog | null>;
  isExistLogByDate(date: Date): Promise<TDailyLog | null>;
  isExistLogByUserAndDate(
    userId: Types.ObjectId,
    date: Date
  ): Promise<TDailyLog | null>;
}

const dailyLogSchema = new Schema<TDailyLog, DailyLogModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    visualization: {
      boxBreathing: {
        type: Boolean,
        default: false,
      },
      boxBreathingTime: {
        type: Number,
        default: 0,
      },
      gameEnvironment: {
        type: Boolean,
        default: false,
      },
      gameEnvironmentTime: {
        type: Number,
        default: 0,
      },
      gameExecution: {
        type: Boolean,
        default: false,
      },
      gameExecutionTime: {
        type: Number,
        default: 0,
      },
      pregameRoutine: {
        type: Boolean,
        default: false,
      },
      pregameRoutineTime: {
        type: Number,
        default: 0,
      },
    },
    dailyWellnessQuestionnaire: {
      feeling: String,
      soreness: {
        type: Number,
        min: 1,
        max: 10,
      },
      sleepTime: Date,
      wakeUpTime: Date,
      hydrationLevel: {
        type: Number,
        min: 1,
        max: 10,
      },
      readinessToCompete: {
        type: Number,
        min: 1,
        max: 10,
      },
    },
    throwingJournal: {
      drills: [String],
      toolsDescription: String,
      setsAndReps: String,
      longTossDistance: Number,
      pitchCount: Number,
      focus: String,
      environment: {
        type: String,
        enum: ["Controlled", "InGame"],
      },
    },
    nutrition: {
      nutritionScore: {
        type: Number,
        required: true,
        min: 0,
        max: 10,
      },
      proteinInGram: {
        type: Number,
        required: true,
        min: 0,
      },
      caloricScore: {
        type: Number,
        required: true,
        min: 0,
        max: 10,
      },
      consumedImpedingSubstances: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    armCare: {
      focus: [
        {
          type: String,
          enum: ["Scapular", "Shoulder", "Forearms", "Biceps/Triceps"],
        },
      ],
      exerciseType: {
        type: String,
        enum: ["Isometric", "Eccentric", "Oscillating"],
      },
      recoveryModalities: [String],
      exercisesLog: String,
    },
    Lifting: {
      liftingType: [
        {
          type: String,
          enum: [
            "Upper Body",
            "Total Body",
            "Speed & Agility",
            "Lower Body",
            "Plyometrics",
          ],
        },
      ],
      focus: [
        {
          type: String,
          enum: ["Speed", "Eccentric", "Isometric", "Concentric"],
        },
      ],
      exercisesLog: {
        type: String,
        default: "",
      },
    },
    hittingJournal: {
      pregameEngagement: {
        type: Number,
        min: 1,
        max: 10,
      },
      primaryFocus: String,
      atBats: Number,
      atBatResults: String,
      positiveOutcome: String,
      exercisesLog: String,
    },
    postPerformance: {
      gameRating: {
        type: Number,
        min: 1,
        max: 10,
      },
      sessionType: {
        type: String,
        enum: ["Bullpen/Live at-bats", "In game"],
      },
      gameResults: String,
      primaryTakeaway: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.id;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
    },
    versionKey: false,
  }
);

// Indexes for better query performance
dailyLogSchema.index({ userId: 1, date: 1 }, { unique: true });
dailyLogSchema.index({ date: -1 });
dailyLogSchema.index({ userId: 1 });

// Static methods
dailyLogSchema.statics.isExistLogByUserId = async function (
  userId: Types.ObjectId
) {
  return await this.findOne({ userId });
};

dailyLogSchema.statics.isExistLogByDate = async function (date: Date) {
  return await this.findOne({ date });
};

dailyLogSchema.statics.isExistLogByUserAndDate = async function (
  userId: Types.ObjectId,
  date: Date
) {
  return await this.findOne({ userId, date });
};

// Plugin to include virtuals in lean queries
dailyLogSchema.plugin(mongooseLeanVirtuals);

export const DailyLog = model<TDailyLog, DailyLogModel>(
  "DailyLog",
  dailyLogSchema
);
