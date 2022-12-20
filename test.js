const request = require('supertest');
const app = require('./server');
//{username: "paperinik2004"}
    
describe('Unlogged user API test suite', () => {
    //signUP
    test("It should successfully register the user and return a status code 200", async () => {
        expect.assertions(1);
        const input = 
        {
            username: "paperinik2004",
            email: "paperinik@gmail.com",
            password: "paperino_il_più_bello",
            nation: "USA"
        };
        const response = await request(app).post("/signUp").set({"Content-Type": "application/json"}).send(input);
        expect((await response.body).statusCode).toEqual(200);
    });
    test("It should not allow the user to register because they already exist and return a status code of 403", async () => {
        expect.assertions(1);
        const input = 
        {
            username: "paperinik2004",
            email: "paperinik@gmail.com",
            password: "paperino_il_più_bello",
            nation: "USA"
        };
        const response = await request(app).post("/signUp").set({"Content-Type": "application/json"}).send(input);
        expect((await response.body).statusCode).toEqual(403);
    });

    //login
    test("It should allow the user with successfully authenticate and return a status code of 200", async () => {
        expect.assertions(1);
        const input = 
        {
            username: "paperinik2004",
            password: "paperino_il_più_bello"
        };
        const response = await request(app).post("/login").set({"Content-Type": "application/json"}).send(input);;
        expect((await response.body).statusCode).toEqual(200);
    });
    test("It should not allow the user to authenticate successfully and return a 403 status code", async () => {
        expect.assertions(1);
        const input = 
        {
            username: "paperinik2004",
            password: "paperino_il_più_brutto"
        };
        const response = await request(app).post("/login").set({"Content-Type": "application/json"}).send(input);;
        expect((await response.body).statusCode).toEqual(403);
    });

    //getClassifica
    test("It should return all the ranking data", async () => {
        const response = await request(app).get("/getClassifica");
        expect((await response.body).statusCode).toEqual(200);
    });
    
    //getGiocatoreClassifica/:username
    test("It should return a user's ranking data", async () => {
        const input = "paperinik2004";
        const response = await request(app).get("/getGiocatoreClassifica/" + input);
        expect((await response.body).statusCode).toEqual(200);
    });
    test("It should not return a user's ranking data, because this does not exist", async () => {
        const input = "paperinik20045";
        const response = await request(app).get("/getGiocatoreClassifica/" + input);
        expect((await response.body).statusCode).toEqual(404);
    });
});


describe('Logged user API test suite', () => {
    //getDatiUtente
    test("It should return the data of a specific user", async () => {
        const input = "admin";
        const response = await request(app).get("/getDatiUtente/" + input);
        expect((await response.body).statusCode).toEqual(200);
    });
    test("It should not return the data of a specific user, because this does not exist", async () => {
        const input = "admin5";
        const response = await request(app).get("/getDatiUtente/" + input);
        expect((await response.body).statusCode).toEqual(404);
    });
    
    //getCredenziali
    test("It should return the credentials of a user", async () => {
        const input = "lorenzo.dambrosio@gmail.com";
        const response = await request(app).get("/getCredenziali/" + input);
        expect((await response.body).statusCode).toEqual(200);
    });
    test("It should not return a user's credentials, because the associated e-mail does not exist", async () => {
        const input = "lorenzoo.dambrosio@gmail.com";
        const response = await request(app).get("/getCredenziali/" + input);
        expect((await response.body).statusCode).toEqual(404);
    });
    
    //getStatisticheUtente
    test("It should return the data of a specific user", async () => {
        const input = "admin";
        const response = await request(app).get("/getStatisticheUtente/" + input);
        expect((await response.body).statusCode).toEqual(200);
    });
    test("It should not return the data of a specific user, because this does not exist", async () => {
        const input = "admin5";
        const response = await request(app).get("/getStatisticheUtente/" + input);
        expect((await response.body).statusCode).toEqual(404);
    });
    
    //sendEmail
    test("It should send an e-mail", async () => {
        const input = 
        {
            destinatario : "marcoetula0205@gmail.com",
            titolo : "JSardiniaGuesser",
            testo : "Ciao Marco è JGuesser che ti parla. Se stai ricevendo questa e-mail significa che la Sardegna è una bella isola."
        };
        const response = await request(app).post("/sendEmail").send(input);
        expect((await response.body).statusCode).toEqual(200);
    });
    
    //setNuovaEmail
    test("Should successfully set up a new e-mail", async () => {
        const username = "admin";
        const email = "lorenzo.dambrosio@gmail.com";
        const response = await request(app).patch("/setNuovaEmail/" + username + "/" + email);
        expect((await response.body).statusCode).toEqual(200);
    });
    
    //setNuovaPassword
    test("Should successfully set a new password", async () => {
        const username = "admin";
        const password = "12@Admin";
        const nuovaPassword = {vecchiaPassword: "12@Admin"};
        const response = await request(app).patch("/setNuovaPassword/" + username + "/" + password).send(nuovaPassword);
        expect((await response.body).statusCode).toEqual(200);
    });
    test("It should not set a new password, because the user does not exist", async () => {
        const username = "admin2";
        const password = "paperino_il_più_bello";
        const nuovaPassword = "12@Admin";
        const response = await request(app).patch("/setNuovaPassword/" + username + "/" + password).send(nuovaPassword);
        expect((await response.body).statusCode).toEqual(404);
    });
    test("It should not set a new password, because the old password is wrong", async () => {
        const username = "admin";
        const password = "paperino_il_più_bello";
        const nuovaPassword = "12@Admin";
        const response = await request(app).patch("/setNuovaPassword/" + username + "/" + password).send(nuovaPassword);
        expect((await response.body).statusCode).toEqual(403);
    });
    
    //upgradePremium
    test("It should update the privileges of the user", async () => {
        const input = "admin";
        const response = await request(app).patch("/upgradePremium/" + input);
        expect((await response.body).statusCode).toEqual(200);
    });
    
    //setDailyChallengePlayed
    test("It should not update the daily challenge status because it cannot find the user", async () => {
        const input = "admin1";
        const response = await request(app).patch("/setDailyChallengePlayed/" + input);
        expect((await response.body).statusCode).toEqual(404);
    });
    test("It should update the status of the daily challenge", async () => {
        const input = "admin";
        const response = await request(app).patch("/setDailyChallengePlayed/" + input);
        expect((await response.body).statusCode).toEqual(200);
        expect((await response.body).message).toEqual("User has played daily challenge");
    });
    test("It should not update the status of the daily challenge, because it has already been played", async () => {
        const input = "admin";
        const response = await request(app).patch("/setDailyChallengePlayed/" + input);
        expect((await response.body).statusCode).toEqual(200);
        expect((await response.body).message).toEqual("already_played");
    });
    
    //aggiornaPunteggioTraining
    test("It should not update the training score because it cannot find the user", async () => {
        const username = "admian";
        const punteggio = 5;
        const response = await request(app).patch("/aggiornaPunteggioTraining/" + username + "/" + punteggio);
        expect((await response.body).statusCode).toEqual(404);
    });
    test("It should update the training score", async () => {
        const username = "admin";
        const punteggio = 1000;
        const response = await request(app).patch("/aggiornaPunteggioTraining/" + username + "/" + punteggio);
        expect((await response.body).statusCode).toEqual(200);
        expect((await response.body).message).toEqual("Score updated");
    });
    test("It should not update the training score because points are too low", async () => {
        const username = "admin";
        const punteggio = 420;
        const response = await request(app).patch("/aggiornaPunteggioTraining/" + username + "/" + punteggio);
        expect((await response.body).statusCode).toEqual(200);
        expect((await response.body).message).toEqual("Score not updated");
    });
    
    //aggiornaStatsSfidaGiornaliera
    test("It should not update the daily challenge score because it cannot find the user", async () => {
        const username = "admian";
        const stato = "sfidaVinta";
        const response = await request(app).patch("/aggiornaStatsSfidaGiornaliera/" + username + "/" + stato);
        expect((await response.body).statusCode).toEqual(404);
    });
    test("It should update the daily challenge score with the challenge won", async () => {
        const username = "admin";
        const stato = "sfidaVinta";
        const response = await request(app).patch("/aggiornaStatsSfidaGiornaliera/" + username + "/" + stato);
        expect((await response.body).statusCode).toEqual(200);
    });
    test("It should update the daily challenge score with the challenge lost", async () => {
        const username = "admin";
        const stato = "sfidaPersa";
        const response = await request(app).patch("/aggiornaStatsSfidaGiornaliera/" + username + "/" + stato);
        expect((await response.body).statusCode).toEqual(200);
    });
});


describe('API to generate quiz', () => {
    //generaQuiz
    test("Should successfully generate a new quiz", async () => {
        expect.assertions(4);
        const treAlfa = await request(app).get("/generaQuiz?alfabeto=[\"Hiragana\",\"Katakana\",\"Kanji\"]");
        const hiraganaAlf = await request(app).get("/generaQuiz?alfabeto=[\"Hiragana\"]");
        const katakanaAlf = await request(app).get("/generaQuiz?alfabeto=[\"Katakana\"]");
        const kanjiAlf = await request(app).get("/generaQuiz?alfabeto=[\"Kanji\"]");
        
        expect((await treAlfa.body).statusCode).toEqual(200);
        expect((await hiraganaAlf.body).statusCode).toEqual(200);
        expect((await katakanaAlf.body).statusCode).toEqual(200);
        expect((await kanjiAlf.body).statusCode).toEqual(200);
    });
    test("It should not successfully generate a new quiz because of a bad request", async () => {
        expect.assertions(1);
        const response = await request(app).get("/generaQuiz?alfabeto=]");
        expect((await response.body).statusCode).toEqual(400);
    });
    test("It should not successfully generate a new quiz because of no alfabeth", async () => {
        expect.assertions(1);
        const response = await request(app).get("/generaQuiz?alfabeto=[]");
        expect((await response.body).statusCode).toEqual(500);
    });
});

// jest.config.js
module.exports = {
  // setupTestFrameworkScriptFile has been deprecated in
  // favor of setupFilesAfterEnv in jest 24
  setupFilesAfterEnv: ['./jest.setup.js']
}

// jest.setup.js
jest.setTimeout(30000)


describe('API to generate daily challenge', () => {
    //generaQuiz
    test("Should successfully generate a new daily challenge", async () => {
        const response = await request(app).get("/getSfidaGiornaliera");
        expect((await response.body).statusCode).toEqual(200);
        expect((await response.body).message).toEqual("New challenge created");
    });
    test("It should return the daily challenge already generated", async () => {
        const response = await request(app).get("/getSfidaGiornaliera");
        expect((await response.body).statusCode).toEqual(200);
        expect((await response.body).message).toEqual("Challenge current date returned");
    });
});

