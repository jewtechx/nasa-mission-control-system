const request = require('supertest')
const app = require('../../app')

describe('Test GET /launches', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app).get('/launches')
        .expect(200)
        .expect('Content-Type', /json/)
    })
})

describe('Test POST /launches',() => {

    const completeLaunchData = {
        mission:'Jew Tech Explorations',
        rocket:'BB3 - N/16',
        target:'The Sun',
        launchDate:'January 06, 2026'
    }

    const completeDataWithoutDate = {
        mission:'Jew Tech Explorations',
        rocket:'BB3 - N/16',
        target:'The Sun'
    }

    const completeDataWithInvalidDate = {
        mission:'Jew Tech Explorations',
        rocket:'BB3 - N/16',
        target:'The Sun',
        launchDate:'jewlarbi123'
    }

    test('It should respond with 201 created',async() => {
        const response = await request(app)
        .post('/launches')
        .send(completeLaunchData)
        .expect('Content-Type', /json/)
        .expect(201);

        const requestDate = new Date(completeLaunchData.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();

        expect(requestDate).toBe(responseDate)
        expect(response.body).toMatchObject(completeDataWithoutDate)
    })

    test('It should catch missing required properties', async() => {
        const response = await request(app)
        .post('/launches')
        .send(completeDataWithoutDate)
        .expect('Content-Type', /json/)
        .expect(400);

        expect(response.body).toStrictEqual({
            error:'Missing required launch property'
        })
    })
    
    test('It should catch invalid dates', async() => {
        const response = await request(app)
        .post('/launches')
        .send(completeDataWithInvalidDate)
        .expect('Content-Type', /json/)
        .expect(400);

        expect(response.body).toStrictEqual({
            error:'Invalid launch date'
        })
    })
})