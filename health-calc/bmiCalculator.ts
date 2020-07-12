const calculateBmi = (heightCM: number, weightKG: number): string => {
    const heightMSquared = (heightCM / 100) ** 2;
    const bmi = weightKG / heightMSquared;
    let bmiResult: string;

    if (bmi < 18.5) {
        bmiResult = "Underweight"
    } else if (bmi < 25) {
        bmiResult = "Normal (healthy weight)"
    } else if (bmi < 30) {
        bmiResult = "Overweight"
    } else {
        bmiResult = "Obese"
    }

    return bmiResult;
}

console.log(calculateBmi(180, 74));
