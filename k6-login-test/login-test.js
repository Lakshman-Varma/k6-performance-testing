import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 5,
    duration: '10s',
};

export default function () {

    const url = 'http://localhost:3000/auth/login';

    const payload = JSON.stringify({
        username: 'Lakshman',
        password: 'password123'
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = http.post(url, payload, params);

    check(response, {
        'Login status is 200': (r) => r.status === 200,
        'Response time is below 500ms': (r) => r.timings.duration < 500,
    });
}