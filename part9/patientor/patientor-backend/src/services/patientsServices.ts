import patientsData from '../../data/patients.json';
import { CensuredPatientEntry, PatientEntry, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const patients: PatientEntry[] = patientsData as PatientEntry[];

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getCensuredEntries = (): CensuredPatientEntry[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id, 
        name, 
        dateOfBirth, 
        gender,
        occupation
    }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const id:string = uuid();
    const newPatientEntry = {
        id: id,
        ...entry
    };

    console.log(newPatientEntry);
    
    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
  getEntries,
  getCensuredEntries,
  addPatient
};