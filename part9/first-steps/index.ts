import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight) || height == 0 || weight == 0) {
        res.status(400).send({ error: 'malformatted parameters'});
    }

    const bmi = calculateBmi(height, weight);

    res.json({ height, weight, bmi });
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
        res.status(400).send({ error: 'parameters missing'});
    }

    if (isNaN(Number(target))) {
        res.status(400).send({ error: 'malformatted parameters'});
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    for (let i = 0; i < daily_exercises.length; i++) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (isNaN(Number(daily_exercises[i]))) {
            res.status(400).send({ error: 'malformatted parameters'});
        }
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const results = calculateExercises(daily_exercises, target);

    res.json(results);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});