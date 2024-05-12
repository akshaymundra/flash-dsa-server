import question from './models/question';
import xlsx from 'xlsx';


import mongoose from 'mongoose';
mongoose.set('strictQuery', false);

const mongoDB = "mongodb://localhost:27017/dsa-revision-db-v2"

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");

    // populate database by creating document from the excel sheet 
    await createQuestions();

    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

async function questionCreate(data: any) {

    const newQuestion = new question({
        question: data.question,
        name: data.name,
        topic: data.topic.toLowerCase(),
        url: data.link,
        level: data.level.toLowerCase(),
        approach: data.my_approach,
        pseudo_code: data.pseudo_code,
    });

    await newQuestion.save();

    console.log(`Added question: ${newQuestion.topic}`);
}

async function createQuestions() {
    const data = getDataFromSheet();
    console.log(data.length);
    await Promise.all(data.map((data) => questionCreate(data)));
}

function getDataFromSheet() {
    // const wb = xlsx.readFile('./src/data/DSA-revision-sheet.xlsx');
    const wb = xlsx.readFile('./src/data/flash-dsa-data.xlsx');
    const ws = wb.Sheets['striver DSA'];

    const jsondata = xlsx.utils.sheet_to_json(ws, { raw: true });
    // console.log(jsondata);
    const dataWithLinks = jsondata.filter((row: any) => row && row?.question && row?.question !== "question");

    // console.log(dataWithLinks)

    return dataWithLinks;
}