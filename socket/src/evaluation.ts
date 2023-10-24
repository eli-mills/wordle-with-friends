import { promises as fsPromises } from 'fs';
import path from 'path';
import { 
    EvaluationResponseData, 
    Result
} from '../../common/dist/index.js';

interface WordValidator {
    validateWord : (guess : string) => Promise<boolean>
}

class FileWordValidator implements WordValidator {
    constructor (private readonly filePath : string) { }
    validateWord = async (guess : string) => {
        const file = await fsPromises.open(this.filePath);
        try {
            for await (const word of file.readLines()) {
                if (word.toUpperCase() === guess) return true;
            }
            return false;

        } finally {
            file.close();
        }
    };
}

async function getSolution () : Promise<string> {
    return "BAGEL";
}

function mutateIfHits(
    guess: string,
    solution: string[], 
    byPosition: Result[], 
    byLetter: Record<string, Result>
) : void {

    for (let i = 0; i < 5; ++i) {
        byLetter[guess[i]] = "miss";
        if (guess[i] === solution[i]) {
            byPosition[i] = "hit";
            byLetter[guess[i]] = "hit";
            solution[i] = "";
        }
    }
}

function mutateIfHas(
    guess: string,
    solution: string[], 
    byPosition: Result[], 
    byLetter: Record<string, Result>
) : void {

    for (let i = 0; i < 5; ++i) {
        if (solution.includes(guess[i])) {
            byPosition[i] = "has";
            byLetter[guess[i]] = byLetter[guess[i]] !== "hit" ? "has" : "hit";
            solution[solution.indexOf(guess[i])] = "";
        }
    }

}

export async function evaluateGuess (guess: string) : Promise<EvaluationResponseData> {

    const filePath = path.join(process.cwd(),"data/allowed.txt");
    const validator = new FileWordValidator(filePath);
    const accepted = await validator.validateWord(guess);

    if (!accepted) return {accepted};
    
    const solution = (await getSolution()).split("");

    const resultByPosition = Array<Result>(5).fill("miss");
    const resultByLetter : Record<string, Result> = {};

    mutateIfHits(guess, solution, resultByPosition, resultByLetter);
    mutateIfHas(guess, solution, resultByPosition, resultByLetter);

    return { resultByPosition, resultByLetter, accepted };
}