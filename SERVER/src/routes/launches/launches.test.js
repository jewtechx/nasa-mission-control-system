const request = require('supertest')
const app = require('../../app')
const {mongoConnect,mongoDisconnect} = require('../../services/mongoose')

describe("Testing launches api", () => {

    beforeAll(async() => {
        await mongoConnect()
    },20000)
    afterAll(async() => {
        await mongoDisconnect()
    },20000)

    describe('Test GET /v1/launches', () => {
        test('It should respond with 200 success', async () => {
            const response = await request(app).get('/v1/launches')
            .expect(200)
            .expect('Content-Type', /json/)
        },20000)
    })
    
    describe('Test POST /v1/launches',() => {
    
        const completeLaunchData = {
            mission:'Jew Tech Explorations',
            rocket:'BB3 - N/16',
            target:'Kepler-62 f',
            launchDate:'January 06, 2026'
        }
    
        const completeDataWithoutDate = {
            mission:'Jew Tech Explorations',
            rocket:'BB3 - N/16',
            target:'Kepler-62 f'
        }
    
        const completeDataWithInvalidDate = {
            mission:'Jew Tech Explorations',
            rocket:'BB3 - N/16',
            target:'Kepler-62 f',
            launchDate:'jewlarbi123'
        }
    
        test('It should respond with 201 created',async() => {
            const response = await request(app)
            .post('/v1/launches')
            .send(completeLaunchData)
            .expect('Content-Type', /json/)
            .expect(201);
    
            const requestDate = new Date(completeLaunchData.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();
    
            expect(requestDate).toBe(responseDate)
            expect(response.body).toMatchObject(completeDataWithoutDate)
        },20000)
    
        test('It should catch missing required properties', async() => {
            const response = await request(app)
            .post('/v1/launches')
            .send(completeDataWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400);
    
            expect(response.body).toStrictEqual({
                error:'Missing required launch property'
            })
        },20000)
        
        test('It should catch invalid dates', async() => {
            const response = await request(app)
            .post('/v1/launches')
            .send(completeDataWithInvalidDate)
            .expect('Content-Type', /json/)
            .expect(400);
    
            expect(response.body).toStrictEqual({
                error:'Invalid launch date'
            })
        },20000)
    })
})