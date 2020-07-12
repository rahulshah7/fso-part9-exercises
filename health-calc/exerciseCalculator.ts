interface ExerciseInputs {
    actualDailyHours: number[];
    targetDailyHours: number;
}

const parseExerciseArguments = (args: Array<string>): ExerciseInputs => {
    if (args.length < 4) throw new Error('Not enough arguments');
    args = args.slice(2);
    const numberArgs: number[] = args.map(arg => {
        const numberArg = Number(arg);
        if (isNaN(numberArg)) {
            throw new Error('Provided values were not numbers!');
        }
        return numberArg;
    });
    return { actualDailyHours: numberArgs.slice(1), targetDailyHours: numberArgs[0] }
}

type Rating = [number, string];

const calculateRating = (actualDailyHours: Array<number>, targetDailyHours: number) => {

    const daysTargetAchievedCount = actualDailyHours.filter(hours => hours >= targetDailyHours).length;
    const daysTargetAchievedRatio = daysTargetAchievedCount / actualDailyHours.length;

    let rating: Rating;
    if (daysTargetAchievedRatio > 0.7) {
        rating = [1, "good work!"];
    } else if (daysTargetAchievedRatio > 0.5) {
        rating = [2, "okay but work harder!"];
    } else {
        rating = [3, "not good enough!"];
    }
    return rating;
}

interface ExerciseResults {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (actualDailyHours: Array<number>, targetDailyHours: number) => {

    const averageDailyHours = actualDailyHours.reduce((a, b) => a + b) / actualDailyHours.length;
    const rating = calculateRating(actualDailyHours, targetDailyHours);

    return {
        periodLength: actualDailyHours.length,
        trainingDays: actualDailyHours.filter(hours => hours > 0).length,
        success: averageDailyHours >= targetDailyHours,
        rating: rating[0],
        ratingDescription: rating[1],
        target: targetDailyHours,
        average: averageDailyHours
    }
}

try {
    const { actualDailyHours, targetDailyHours } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(actualDailyHours, targetDailyHours));
} catch (error) {
    console.log("Error: ", error.message)
}