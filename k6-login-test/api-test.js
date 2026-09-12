import http from 'k6/http';
import { check, group } from 'k6';

export const options = {
    vus: 20,
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(95)<500'],
        checks: ['rate>=0.95']
    }
};

const BASE_URL = 'http://localhost:3000';

export default function () {

    group('Health Check', () => {

        const response = http.get(`${BASE_URL}/health`);

        check(response, {
            'Health status is 200': (r) => r.status === 200,
            'Health API is UP': (r) =>
                r.json('status') === 'UP'
        });

    });


    group('Login', () => {

        const payload = JSON.stringify({
            username: 'standard_user',
            password: 'secret_sauce'
        });

        const response = http.post(
            `${BASE_URL}/auth/login`,
            payload,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        check(response, {
            'Login status is 200': (r) => r.status === 200,
            'Token received': (r) =>
                r.json('token') !== undefined
        });

    });


    group('Get Users', () => {

        const response = http.get(
            `${BASE_URL}/users`
        );

        check(response, {
            'Users status is 200': (r) => r.status === 200,
            'Users response is array': (r) =>
                Array.isArray(r.json())
        });

    });


    group('Get Products', () => {

        const response = http.get(
            `${BASE_URL}/products`
        );

        check(response, {
            'Products status is 200': (r) => r.status === 200,
            'Products response is array': (r) =>
                Array.isArray(r.json())
        });

    });

}