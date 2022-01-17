import { generateRandomPhoneNumber, requestToSmpp } from '../helpers/utils.js';

const {
    MAX_META_NUMBERS,
    MAX_NUMBERS_GEN,
    INTERVAL
} = process.env;

class Worker {
    constructor() {
        this.numbers = [];
    }

    async createObjectsToSend() {
        const objectsToSend = [];
        this.numbers = await generateRandomPhoneNumber(MAX_NUMBERS_GEN);

        if(this.numbers.length) {
            this.numbers.forEach(number => {
                const json = {
                    to: number,
                    message: "Test SMPP with Meta",
                    origin: "ApiMessage",
                    origin_id: Buffer.from(`ApiMessage:${Math.random() * (1000 - 1) + 1}`).toString('base64'),
                    queue_id: "p0o9i8",
                    la: "2468",
                    type: "superfast",
                    meta:1,
                    concat: {
                        type_message:0,
                        reference_concat:456,
                        total_parts:2,
                        part_number:1,
                        esm_class:64
                    }
                };

                if(objectsToSend.length >= MAX_META_NUMBERS) {
                    delete json.meta;
                    delete json.concat;
                }
    
                objectsToSend.push(json);
            });
        }

        return objectsToSend;
    }

    async send() {
        const allJson = await this.createObjectsToSend();
        const requestPromises = [];

        allJson.forEach(json => {
            requestPromises.push(requestToSmpp(json));
        });

        await Promise.all(requestPromises);
    }

    start() {
        setInterval(() => {
            this.send();
        }, INTERVAL * 1000);
    }
}

export default new Worker();