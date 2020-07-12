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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
