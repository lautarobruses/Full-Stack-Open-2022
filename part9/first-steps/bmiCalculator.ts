interface BmiValues {
    height: number;
    weight: number;
}

const parseArgumentsBmi = (args: string[]): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

export const calculateBmi = (h: number, w: number): string => {
    const meters: number = h / 100;
    let bmi: number = w / Math.pow(meters, 2);
    //to fix in 1 decimal:
    bmi = (bmi * 10) / 10;

    switch (true) {
        case bmi < 16.0:
            return 'Underweight (Severe thinness)';
        case 16.0 <= bmi && bmi <= 16.9:
            return 'Underweight (Moderate thinness)';
        case 17.0 <= bmi && bmi <= 18.4:
            return 'Underweight (Mild thinness)';
        case 18.5 <= bmi && bmi <= 24.9:
            return 'Normal range (healthy weight)';
        case 25.0 <= bmi && bmi <= 29.9:
            return 'Overweight (Pre-obese)';
        case 30.0 <= bmi && bmi <= 34.9:
            return 'Obese (Class I)';
        case 35.0 <= bmi && bmi <= 39.9:
            return 'Obese (Class II)';
        default: //case 40.0 <= bmi
            return 'Obese (Class III)';
    }
};

try {
    const { height, weight } = parseArgumentsBmi(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}

