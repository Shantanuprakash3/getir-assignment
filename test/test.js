const express = require('express');
const chai = require('chai');
const request = require('supertest');

// app is supposed to point to the app.js file
const app = express();

describe('POST request to filter records', () => {
    it('should filter out records', () => {
        request(app)
        .post('api/filter')
        .send({
            "startDate": "2016-01-26", 
            "endDate": "2018-02-02", 
            "minCount": 100, 
            "maxCount": 150
            })
        .expect(200)
        .then((res) => {
         expect(res.body.message).toBe('success');
         expect(res.body.code).toBe(1); 
 });
});
});

describe('POST request with missing params', () => {
    it('should respond 400', () => {
        request(app)
        .post('api/filter')
        .send({
            "endDate": "2018-02-02", 
            "minCount": 100, 
            "maxCount": 150
            })
        .expect(400)
        .then((res) => {
         expect(res.body.message).toBe('startDate should be datetime');
         expect(res.body.code).toBe(0); 
 });
});
});

describe('POST request with invalid params', () => {
    it('should respond 400', () => {
        request(app)
        .post('api/filter')
        .send({
            "startDate": "2016-01-26",
            "endDate": "2018-02-02", 
            "minCount": -100, 
            "maxCount": 150
            })
        .expect(400)
        .then((res) => {
         expect(res.body.message).toBe('minCount should be positive integer');
         expect(res.body.code).toBe(0); 
 });
});
});