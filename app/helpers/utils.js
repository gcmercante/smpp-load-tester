import axios from 'axios';

const DDD = [11,12,13,14,15,16,17,18,19,21,22,24,27,28,31,32,33,34,35,37,38,41,42,43,44,45,46,47,48,49,51,53,54,55,61,62,63,64,65,66,67,68,69,71,73,74,75,77,79,81,82,83,84,85,86,87,88,89,91,92,93,94,95,96,97,98,99];

export function requestToSmpp(body) {
    console.log('REQUEST TO SMPP');
    return axios.post(process.env.SMPP_URL, body);
}

export async function generateRandomPhoneNumber(totalNumbers) {
    const min = 0;
    const max = 9;
    const minDDD = 0;
    const maxDDD = 67;
    const numbers = [];
    const numberMaxLength = 8;

    for(let i = 0; i <= totalNumbers; i += 1) {
        const number = [];
        for(let i = 0; i <= numberMaxLength; i += 1) {
            if(i === 0) {
                const dddIndex = generateRandomNumber(minDDD, maxDDD);
                number.push(DDD[dddIndex], 9);
                continue;
            }
            number.push(generateRandomNumber(min, max));
        }
        if(!number.length) {
            continue;
        }
        numbers.push(number.join(''));
    }

    return numbers;
}

function generateRandomNumber(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}