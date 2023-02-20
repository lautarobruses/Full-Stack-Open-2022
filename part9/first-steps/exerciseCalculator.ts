interface Result { 
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number 
}

interface ExerciseValues {
    dailyExerciseHours: number[],
    targetHours: number
}

const parseArgumentsExercise = (args: string[]): ExerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const aux: string[] = args.slice(3);
    const hours: number[] = [];
    const target = Number(args[2]);

    for (let i = 0; i < aux.length; i++) {
        const hour = Number(aux[i]) ;
        if (isNaN(hour)) {
            throw new Error('Provided values were not numbers!');
        }

        hours.push(hour);
    }

    return {
        dailyExerciseHours: hours,
        targetHours: target
    };
};

export const calculateExercises = (dailyExerciseHours: number[], targetHours: number): Result => {
    const totalExerciseHours: number = dailyExerciseHours.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const trainingDays: number = dailyExerciseHours.reduce((counter, currentValue) => currentValue == 0 ? counter : counter + 1, 0);
    let success = false;
    let rating = -1;
    let ratingDescription = '';
    let averageExerciseHours = -1;

    if (dailyExerciseHours.length > 0) {
        averageExerciseHours = totalExerciseHours / dailyExerciseHours.length;
        switch (true) {
            case averageExerciseHours < targetHours:
                rating = 1;
                ratingDescription = 'not bad but could be better. Come on!';
                break;
            case averageExerciseHours == targetHours:
                rating = 2;
                ratingDescription = 'its okay. Continue like this.';
                break;
            case averageExerciseHours > targetHours:
                rating = 3;
                ratingDescription = 'amazing! That is how it is done.';
                break;
        }
        success = averageExerciseHours >= targetHours;
    }

    return {
        periodLength: dailyExerciseHours.length,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: targetHours,
        average: averageExerciseHours
    };
};

try {
    const { dailyExerciseHours, targetHours } = parseArgumentsExercise(process.argv);
    console.log(calculateExercises(dailyExerciseHours, targetHours));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}