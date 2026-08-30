import http from 'k6/http';
import { check } from 'k6';

const users = JSON.parse(open('./users.json'));

export const options = {
    vus: 1,
    duration: '5s',
};

export default function () {

    // Select one user for each VU
    const user = users[(__VU - 1) % users.length];

    const url = 'https://www.saucedemo.com/';

    const payload = {
        userName: user.username,
        password: user.password,
    };

    const params = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirects: 10,
    };

    const response = http.post(url, payload, params);

    check(response, {
        'Login request completed': (r) => r.status === 200,
        'Response time below 500ms': (r) => r.timings.duration < 500,
    });

    console.log(`${user.username} → Status: ${response.status}`);
}