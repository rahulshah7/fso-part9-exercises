interface BmiInputs {
    heightCM: number;
    weightKG: number;
}

const parseBmiArguments = (args: Array<string>): BmiInputs => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            heightCM: Number(args[2]),
            weightKG: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

const calculateBmi = (heightCM: number, weightKG: number): string => {
    const heightMSquared = (heightCM / 100) ** 2;
    const bmi = weightKG / heightMSquared;
    let bmiResult: string;

    if (bmi < 18.5) {
        bmiResult = "Underweight";
    } else if (bmi < 25) {
        bmiResult = "Normal (healthy weight)";
    } else if (bmi < 30) {
        bmiResult = "Overweight";
    } else {
        bmiResult = "Obese";
    }

    return bmiResult;
}


try {
    const { heightCM, weightKG } = parseBmiArguments(process.argv);
    console.log(calculateBmi(heightCM, weightKG));
} catch (error) {
    console.log("Error: ", error.message)
}

