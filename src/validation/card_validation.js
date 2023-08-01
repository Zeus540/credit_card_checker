import axios from "axios";
import { BASE_URL,BASE_URL_DEV } from "../Constants";



export default async function credit_card_validation(card_number) {
    let card_number_arr = Array.from(String(card_number))
    let sum = []
    let check_sum = parseInt(card_number_arr.pop())

    for (let index = card_number_arr.length - 1; index >= 0; index -= 1) {
        let current = parseInt(card_number_arr[index]);

        if (index % 2 == 0) {

            let doubled = current * 2

            if (doubled > 9) {
                sum.push(doubled - 9)
            } else {
                sum.push(doubled)
            }
            
        } else {
            sum.push(current)
        }
    }


    let sum_reduced = sum.reduce((prev, current) => prev + current, check_sum) % 10 == 0

    if (sum_reduced) {
        try {
            const data = await getBin(card_number);
            return data;
        } catch (error) {
            return {
                card_number: card_number,
                error: "Error fetching data from the API.",
            };
        }
    } else {
        return {
            card_number: card_number,
            error: "Credit Card Invalid",
        };
    }

}

const getBin = async (card_number) => {

    let data = {
        card_number:card_number
    }

    try {
        const response = await axios.post(`${BASE_URL}`,data);
        return response.data;
    } catch (error) {
        console.log(error)
        return error;
    }
}